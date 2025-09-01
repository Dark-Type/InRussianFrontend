import React, { useMemo, useState } from "react";
import styles from "./ContentEditor.module.css";
import type {
  TaskType,
  TaskBody,
  Pair,
  Sentence,
  Gap,
  CreateTaskModelRequest,
  UpdateTaskModelRequest,
  TaskModel,
} from "./TaskModels";
import { axiosInstance } from "../../../instances/axiosInstance";
import { mediaService } from "../../../services/MediaService";

// Представление Pair на проводе (бэкенд): { first, second }
type PairObj<A, B> = { first: A; second: B };
type WireTaskBody =
  | { type: "TextTask"; variant: PairObj<string, string>[] }
  | { type: "AudioTask"; variant: PairObj<string, string>[] }
  | { type: "TextInputTask"; sentence: Sentence[] }
  | { type: "TextInputWithVariantTask"; variant: PairObj<string, string[]>[] }
  | { type: "ImageTask"; variant: PairObj<string, string>[] };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (task: TaskModel) => void;
  onUpdated?: (task: TaskModel) => void;
  themeId: string;
  initialTask?: TaskModel | null;
  readOnly?: boolean;
};

async function createTaskApi(req: CreateTaskModelRequest): Promise<TaskModel> {
  console.log(req)
  const resp = await axiosInstance.post("/task", req);
  return resp.data as TaskModel;
}

// заглушка для обновления задания
async function updateTaskApi(id: string, req: UpdateTaskModelRequest): Promise<TaskModel> {
  const resp = await axiosInstance.put(`/task/${id}`, req);
  return resp.data as TaskModel;
}

const getUrl = async (id: string) => {
  try {
    const blob = await mediaService.getMediaById(id);
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Ошибка загрузки медиа по id:', err);
    return null;
  }
}

function isDataUrl(s: string): boolean {
  return typeof s === "string" && s.startsWith("data:");
}

function isBareBase64(s: string): boolean {
  return typeof s === "string" && /^[A-Za-z0-9+/=]+$/.test(s) && s.length > 100;
}

function parseDataUrl(dataUrl: string): { mime: string; b64: string } | null {
  try {
    const [header, b64] = dataUrl.split(",", 2);
    const m = header.match(/^data:([^;]+);base64$/i);
    if (!m || !b64) return null;
    return { mime: m[1], b64 };
  } catch {
    return null;
  }
}

function base64ToBlob(b64: string, mime = "application/octet-stream"): Blob {
  const byteChars = atob(b64);
  const len = byteChars.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = byteChars.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

async function uploadMediaString(input: string, kind: "audio" | "image"): Promise<string> {
  if (!isDataUrl(input) && !isBareBase64(input)) return input;

  let b64 = input;
  let mime = kind === "audio" ? "audio/mpeg" : "image/jpeg";

  if (isDataUrl(input)) {
    const p = parseDataUrl(input);
    if (p) {
      b64 = p.b64;
      mime = p.mime || mime;
    }
  }

  const blob = base64ToBlob(b64, mime);
  const filename = `${kind}-${Date.now()}.${mimeExt(mime) || "bin"}`;
  const file = new File([blob], filename, { type: mime });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("mimeType", file.type);
  formData.append("fileSize", String(file.size));
  formData.append("fileType", kind === "audio" ? "AUDIO" : "IMAGE");

  const resp = await mediaService.uploadMediaWithMeta(formData);
  const mediaId = (resp as any).mediaId;
  if (!mediaId) {
    throw new Error("Не удалось загрузить медиа: отсутствует mediaId в ответе");
  }
  return mediaId;
}

function mimeExt(mime: string): string {
  const map: Record<string, string> = {
    "audio/mpeg": "mp3",
    "audio/ogg": "ogg",
    "audio/wav": "wav",
    "audio/webm": "webm",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mime] || "";
}

async function uploadTaskBodyMediaIfNeeded(body: TaskBody): Promise<TaskBody> {
  if (body.type === "AudioTask") {
    const variant = await Promise.all(
      body.variant.map(async ([left, right]) => {
        const mediaId = await uploadMediaString(left, "audio");
        return [mediaId, right] as [string, string];
      })
    );
    return { ...body, variant };
  }
  if (body.type === "ImageTask") {
    const variant = await Promise.all(
      body.variant.map(async ([left, right]) => {
        const mediaId = await uploadMediaString(left, "image");
        return [mediaId, right] as [string, string];
      })
    );
    return { ...body, variant };
  }
  return body;
}

const ALL_TASK_TYPES: TaskType[] = [
  "LISTEN_AND_CHOOSE",
  "READ_AND_CHOOSE",
  "LOOK_AND_CHOOSE",
  "MATCH_AUDIO_TEXT",
  "MATCH_TEXT_TEXT",
  "WRITE",
  "LISTEN",
  "READ",
  "SPEAK",
  "REMIND",
  "MARK",
  "FILL",
  "CONNECT_AUDIO",
  "CONNECT_IMAGE",
  "CONNECT_TRANSLATE",
  "SELECT",
];

const TASK_TYPE_LABELS: Record<TaskType, string> = {
  LISTEN_AND_CHOOSE: "Слушать и выбирать",
  READ_AND_CHOOSE: "Читать и выбирать",
  LOOK_AND_CHOOSE: "Смотреть и выбирать",
  MATCH_AUDIO_TEXT: "Соответствие: Аудио — Текст",
  MATCH_TEXT_TEXT: "Соответствие: Текст — Текст",
  WRITE: "Писать",
  LISTEN: "Слушать",
  READ: "Читать",
  SPEAK: "Говорить",
  REMIND: "Повторить",
  MARK: "Отметить",
  FILL: "Заполнить",
  CONNECT_AUDIO: "Соединить (аудио)",
  CONNECT_IMAGE: "Соединить (изображение)",
  CONNECT_TRANSLATE: "Соединить (перевод)",
  SELECT: "Выбрать",
};

const BODY_TYPE_OPTIONS: { value: TaskBody["type"]; label: string }[] = [
  { value: "TextTask", label: "Текстовые варианты" },
  { value: "AudioTask", label: "Аудио + Текст" },
  { value: "TextInputTask", label: "Ввод текста (Пропуски)" },
  { value: "TextInputWithVariantTask", label: "Текст с вариантами" },
  { value: "ImageTask", label: "Изображение + Текст" },
];

const OVERLAY_STYLE: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const MODAL_STYLE: React.CSSProperties = {
  background: "var(--color-bg)",
  borderRadius: 10,
  width: "min(960px, 94vw)",
  maxHeight: "90vh",
  overflow: "auto",
  padding: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

export default function TaskEditorModal({ isOpen, onClose, onCreated, onUpdated, themeId, initialTask, readOnly = false }: Props) {
  const [question, setQuestion] = useState<string | null>("");
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // тип и данные тела задания
  const [body, setBody] = useState<TaskBody>({
    type: "TextTask",
    variant: [["", ""]],
  });

  const bodyType = body.type;

  // при открытии в режиме редактирования заполняем поля
  React.useEffect(() => {
    if (!isOpen) return;
    if (!initialTask) {
      setQuestion("");
      setTaskTypes([]);
      setBody({ type: "TextTask", variant: [["", ""]] });
      return;
    }
    setQuestion(initialTask.question ?? "");
    setTaskTypes(initialTask.taskType ?? []);
  setBody(toInternalTaskBody(initialTask.taskBody as unknown as WireTaskBody));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialTask?.id]);

  const handleToggleTaskType = (t: TaskType) => {
    if (readOnly) return;
    setTaskTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleChangeBodyType = (t: TaskBody["type"]) => {
    if (readOnly) return;
    switch (t) {
      case "TextTask":
        setBody({ type: "TextTask", variant: [["", ""]] });
        break;
      case "AudioTask":
        setBody({ type: "AudioTask", variant: [["", ""]] });
        break;
      case "TextInputTask":
        setBody({
          type: "TextInputTask",
          sentence: [{ text: "", gaps: [] }],
        });
        break;
      case "TextInputWithVariantTask":
        setBody({
          type: "TextInputWithVariantTask",
          variant: [["", [""]]],
        });
        break;
      case "ImageTask":
        setBody({ type: "ImageTask", variant: [["", ""]] });
        break;
    }
  };

  const submitDisabled = useMemo(() => {
    if (taskTypes.length === 0) return true;
    switch (body.type) {
      case "TextTask":
      case "ImageTask":
        return body.variant.length === 0 || body.variant.some(([a, b]) => !a || !b);
      case "AudioTask":
        return body.variant.length === 0 || body.variant.some(([a, b]) => !a || !b);
      case "TextInputTask":
        return (
          body.sentence.length === 0 ||
          body.sentence.some((s) => !s.text) ||
          body.sentence.some((s) =>
            s.gaps.some((g) => !g.enter || !g.correctWord || g.index < 0)
          )
        );
      case "TextInputWithVariantTask":
        return (
          body.variant.length === 0 ||
          body.variant.some(([q, opts]) => !q || opts.length === 0 || opts.some((o) => !o))
        );
    }
  }, [taskTypes, body]);

  const onSubmit = async () => {
    setError(null);
    setSaving(true);
    try {
      const bodyWithMediaIds = await uploadTaskBodyMediaIfNeeded(body);
    const wireBody = toWireTaskBody(bodyWithMediaIds);
    if (initialTask) {
        const req: UpdateTaskModelRequest = {
          themeId,
      // отправляем в формате бэкенда
      taskBody: wireBody as unknown as TaskBody,
          taskTypes,
        };
        const updated = await updateTaskApi(initialTask.id, req);
        onUpdated?.(updated);
        onClose();
      } else {
        const req: CreateTaskModelRequest = {
          themeId,
      // отправляем в формате бэкенда
      taskBody: wireBody as unknown as TaskBody,
          question: question === "" ? null : question,
          taskTypes,
        };
        const created = await createTaskApi(req);
        onCreated?.(created);
        onClose();
      }
    } catch (e: any) {
      setError(e?.message ?? "Не удалось создать задание");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={OVERLAY_STYLE} onClick={onClose}>
      <div style={MODAL_STYLE} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.header} ${styles.modalHeader}`}>
      <h3 className={styles.title}>{readOnly ? "Просмотр задания" : initialTask ? "Редактировать задание" : "Создать задание"}</h3>
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={onClose} disabled={saving}>
              {readOnly ? "Закрыть" : "Отмена"}
            </button>
            {!readOnly && (
              <button
                className={styles.actionButton}
                onClick={onSubmit}
                disabled={saving || submitDisabled}
        title={submitDisabled ? "Заполните обязательные поля" : initialTask ? "Сохранить" : "Создать"}
              >
        {saving ? (initialTask ? "Сохранение..." : "Создание...") : (initialTask ? "Сохранить" : "Создать")}
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className={styles.card} style={{ borderColor: "#dc3545", color: "#dc3545" }}>
            {error}
          </div>
        )}

        <div className={styles.card}>
          <div className={styles.fieldsGrid}>
            <label className={styles.label}>
              Вопрос
              <input
                className={styles.input}
                value={question ?? ""}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Вопрос..."
    disabled={readOnly}
              />
            </label>

            <label className={styles.label}>
              Тип задания
              <select
                className={styles.input}
                value={bodyType}
                onChange={(e) => handleChangeBodyType(e.target.value as TaskBody["type"])}
    disabled={readOnly}
              >
                {BODY_TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

  <TaskTypesPicker selected={taskTypes} onToggle={handleToggleTaskType} disabled={readOnly} />

        <div className={styles.card}>
          {body.type === "TextTask" && (
            <PairsEditor
              title="Текстовые варианты"
              pairs={body.variant}
              onChange={(pairs) => setBody({ ...body, variant: pairs })}
              leftPlaceholder="Текст"
              rightPlaceholder="Перевод"
              disabled={readOnly}
            />
          )}

          {body.type === "AudioTask" && (
            <AudioPairsEditor
              pairs={body.variant}
              onChange={(pairs) => setBody({ ...body, variant: pairs })}
              disabled={readOnly}
            />
          )}

          {body.type === "ImageTask" && (
            <ImagePairsEditor
              pairs={body.variant}
              onChange={(pairs) => setBody({ ...body, variant: pairs })}
              disabled={readOnly}
            />
          )}

          {body.type === "TextInputWithVariantTask" && (
            <TextWithOptionsEditor
              pairs={body.variant}
              onChange={(pairs) => setBody({ ...body, variant: pairs })}
              disabled={readOnly}
            />
          )}

          {body.type === "TextInputTask" && (
            <SentencesEditor
              sentences={body.sentence}
              onChange={(sentences) => setBody({ ...body, sentence: sentences })}
              disabled={readOnly}
            />
          )}
        </div>

        <div className={styles.modalFooter}>
          <div style={{ flex: 1 }} />
          <button className={styles.actionButton} onClick={onClose} disabled={saving}>
            Закрыть
          </button>
          {!readOnly && (
            <button
              className={styles.actionButton}
              onClick={onSubmit}
              disabled={saving || submitDisabled}
            >
              {saving ? (initialTask ? "Сохранение..." : "Создание...") : (initialTask ? "Сохранить" : "Создать")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskTypesPicker({
  selected,
  onToggle,
  disabled,
}: {
  selected: TaskType[];
  onToggle: (t: TaskType) => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.label} style={{ marginBottom: 8 }}>
        Типы задания
      </div>
      <div className={styles.fieldsGrid}>
        {ALL_TASK_TYPES.map((t) => (
          <label key={t} className={styles.label} style={{ fontWeight: 400 }}>
            <input
              type="checkbox"
              checked={selected.includes(t)}
              onChange={() => onToggle(t)}
              style={{ marginRight: 6 }}
              disabled={disabled}
            />
            {TASK_TYPE_LABELS[t]}
          </label>
        ))}
      </div>
    </div>
  );
}

function PairsEditor({
  title,
  pairs,
  onChange,
  leftPlaceholder,
  rightPlaceholder,
  mediaPreview,
  disabled,
}: {
  title: string;
  pairs: Pair<string, string>[];
  onChange: (pairs: Pair<string, string>[]) => void;
  leftPlaceholder?: string;
  rightPlaceholder?: string;
  mediaPreview?: "image";
  disabled?: boolean;
}) {
  const update = (idx: number, side: 0 | 1, value: string) => {
    const next = pairs.map((p, i) => (i === idx ? (side === 0 ? [value, p[1]] : [p[0], value]) : p));
    onChange(next as Pair<string, string>[]);
  };
  const add = () => onChange([...pairs, ["", ""]]);
  const remove = (idx: number) => onChange(pairs.filter((_, i) => i !== idx));

  return (
    <>
      <div className={styles.header} style={{ marginTop: 4 }}>
        <h4 className={styles.title} style={{ fontSize: "1rem" }}>
          {title}
        </h4>
        {!disabled && (
          <button className={styles.actionButton} onClick={add}>
            Добавить
          </button>
        )}
      </div>
      <div className={styles.list}>
        {pairs.map(([a, b], i) => (
          <div key={i} className={styles.card}>
            {!disabled && (
              <button className={styles.removeButton} onClick={() => remove(i)}>✕ удалить</button>
            )}
            {mediaPreview === "image" && a && (
              <div className={styles.mediaPreview}>
                <img className={styles.image} src={a} alt="" />
              </div>
            )}
            <div className={styles.fieldsColumn}>
              <label className={styles.label}>
                Левое поле
                <input
                  className={styles.input}
                  value={a}
                  onChange={(e) => update(i, 0, e.target.value)}
                  placeholder={leftPlaceholder}
                  disabled={disabled}
                />
              </label>
              <label className={styles.label}>
                Правое поле
                <input
                  className={styles.input}
                  value={b}
                  onChange={(e) => update(i, 1, e.target.value)}
                  placeholder={rightPlaceholder}
                  disabled={disabled}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AudioPairsEditor({
  pairs,
  onChange,
  disabled,
}: {
  pairs: Pair<string, string>[];
  onChange: (pairs: Pair<string, string>[]) => void;
  disabled?: boolean;
}) {
  const [objectUrls, setObjectUrls] = React.useState<(string | null)[]>([]);

  // при наличии mediaId подставляем object URL для предпросмотра
  React.useEffect(() => {
    let active = true;
    const urlsToRevoke: string[] = [];
    (async () => {
      const res = await Promise.all(
        pairs.map(async ([val]) => {
          if (isDataUrl(val)) return val;
          if (isBareBase64(val)) return asDataUrl(val, "audio/*");
          if (typeof val === "string" && /^https?:\/\//i.test(val)) return val;
          const url = await getUrl(val);
          if (url) urlsToRevoke.push(url);
          return url;
        })
      );
      if (active) setObjectUrls(res);
    })();
    return () => {
      active = false;
      urlsToRevoke.forEach((u) => u && URL.revokeObjectURL(u));
    };
  }, [pairs]);

  const updateText = (idx: number, value: string) => {
    const next = pairs.map((p, i) => (i === idx ? [p[0], value] : p));
    onChange(next as Pair<string, string>[]);
  };

  const setAudio = async (idx: number, file: File | null) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    const next = pairs.map((p, i) => (i === idx ? [base64, p[1]] : p));
    onChange(next as Pair<string, string>[]);
  };

  const add = () => onChange([...pairs, ["", ""]]);
  const remove = (idx: number) => onChange(pairs.filter((_, i) => i !== idx));

  return (
    <>
      <div className={styles.header} style={{ marginTop: 4 }}>
        <h4 className={styles.title} style={{ fontSize: "1rem" }}>
          Аудио + Текст
        </h4>
        {!disabled && (
          <button className={styles.actionButton} onClick={add}>
            Добавить
          </button>
        )}
      </div>
      <div className={styles.list}>
        {pairs.map(([audioVal, text], i) => {
          const src = isDataUrl(audioVal)
            ? audioVal
            : isBareBase64(audioVal)
            ? asDataUrl(audioVal, "audio/*")
            : /^https?:\/\//i.test(audioVal)
            ? audioVal
            : objectUrls[i] ?? null;
          return (
            <div key={i} className={styles.card}>
              {!disabled && (
                <button className={styles.removeButton} onClick={() => remove(i)}>✕ удалить</button>
              )}
              <div className={styles.mediaBlock}>
                {src ? (
                  <audio className={styles.audio} controls src={src} />
                ) : (
                  <div className={styles.label}>
                    {audioVal ? `аудио загружено (id: ${audioVal})` : "аудио не выбрано"}
                  </div>
                )}
              </div>
              <div className={styles.fieldsGrid}>
                <label className={styles.label}>
                  Аудио
                  <input
                    className={styles.input}
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudio(i, e.target.files?.[0] ?? null)}
                    disabled={disabled}
                  />
                </label>
                <label className={styles.label}>
                  Ответ
                  <input
                    className={styles.input}
                    value={text}
                    onChange={(e) => updateText(i, e.target.value)}
                    placeholder="Текст"
                    disabled={disabled}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ImagePairsEditor({
  pairs,
  onChange,
  disabled,
}: {
  pairs: Pair<string, string>[];
  onChange: (pairs: Pair<string, string>[]) => void;
  disabled?: boolean;
}) {
  const [objectUrls, setObjectUrls] = React.useState<(string | null)[]>([]);

  React.useEffect(() => {
    let active = true;
    const urlsToRevoke: string[] = [];
    (async () => {
      const res = await Promise.all(
        pairs.map(async ([val]) => {
          if (isDataUrl(val)) return val;
          if (isBareBase64(val)) return asDataUrl(val, "image/*");
          if (typeof val === "string" && /^https?:\/\//i.test(val)) return val;
          const url = await getUrl(val);
          if (url) urlsToRevoke.push(url);
          return url;
        })
      );
      if (active) setObjectUrls(res);
    })();
    return () => {
      active = false;
      urlsToRevoke.forEach((u) => u && URL.revokeObjectURL(u));
    };
  }, [pairs]);

  const updateCaption = (idx: number, value: string) => {
    const next = pairs.map((p, i) => (i === idx ? [p[0], value] : p));
    onChange(next as Pair<string, string>[]);
  };

  const setImage = async (idx: number, file: File | null) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    const next = pairs.map((p, i) => (i === idx ? [base64, p[1]] : p));
    onChange(next as Pair<string, string>[]);
  };

  const add = () => onChange([...pairs, ["", ""]]);
  const remove = (idx: number) => onChange(pairs.filter((_, i) => i !== idx));

  return (
    <>
      <div className={styles.header} style={{ marginTop: 4 }}>
        <h4 className={styles.title} style={{ fontSize: "1rem" }}>
          Изображение + Текст
        </h4>
        {!disabled && (
          <button className={styles.actionButton} onClick={add}>
            Добавить
          </button>
        )}
      </div>
      <div className={styles.list}>
        {pairs.map(([imgVal, caption], i) => {
          const src = isDataUrl(imgVal)
            ? imgVal
            : isBareBase64(imgVal)
            ? asDataUrl(imgVal, "image/*")
            : /^https?:\/\//i.test(imgVal)
            ? imgVal
            : objectUrls[i] ?? null;
          return (
            <div key={i} className={styles.card}>
              {!disabled && (
                <button className={styles.removeButton} onClick={() => remove(i)}>✕ удалить</button>
              )}
              <div className={styles.mediaBlock}>
                {src ? (
                  <img className={styles.image} src={src} alt="" />
                ) : (
                  <div className={styles.label}>
                    {imgVal ? `изображение загружено (id: ${imgVal})` : "изображение не выбрано"}
                  </div>
                )}
              </div>
              <div className={styles.fieldsGrid}>
                <label className={styles.label}>
                  Изображение
                  <input
                    className={styles.input}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(i, e.target.files?.[0] ?? null)}
                    disabled={disabled}
                  />
                </label>
                <label className={styles.label}>
                  Ответ
                  <input
                    className={styles.input}
                    value={caption}
                    onChange={(e) => updateCaption(i, e.target.value)}
                    placeholder="Подпись"
                    disabled={disabled}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function TextWithOptionsEditor({
  pairs,
  onChange,
  disabled,
}: {
  pairs: Pair<string, string[]>[];
  onChange: (pairs: Pair<string, string[]>[]) => void;
  disabled?: boolean;
}) {
  const addPair = () => onChange([...pairs, ["", [""]]]);
  const removePair = (idx: number) => onChange(pairs.filter((_, i) => i !== idx));
  const setQuestion = (idx: number, q: string) => {
    const next = pairs.map((p, i) => (i === idx ? [q, p[1]] : p));
    onChange(next as Pair<string, string[]>[]);
  };
  const addOption = (idx: number) => {
    const next = pairs.map((p, i) => (i === idx ? [p[0], [...p[1], ""]] : p));
    onChange(next as Pair<string, string[]>[]);
  };
  const setOption = (pairIdx: number, optIdx: number, val: string) => {
    const next = pairs.map((p, i) =>
      i === pairIdx ? [p[0], p[1].map((o, j) => (j === optIdx ? val : o))] : p
    );
    onChange(next as Pair<string, string[]>[]);
  };
  const removeOption = (pairIdx: number, optIdx: number) => {
    const next = pairs.map((p, i) =>
      i === pairIdx ? [p[0], p[1].filter((_, j) => j !== optIdx)] : p
    );
    onChange(next as Pair<string, string[]>[]);
  };

  return (
    <>
      <div className={styles.header} style={{ marginTop: 4 }}>
        <h4 className={styles.title} style={{ fontSize: "1rem" }}>
          Текст с вариантами
        </h4>
        {!disabled && (
          <button className={styles.actionButton} onClick={addPair}>
            Добавить
          </button>
        )}
      </div>
      <div className={styles.list}>
        {pairs.map(([q, opts], i) => (
          <div key={i} className={styles.card}>
            {!disabled && (
              <button className={styles.removeButton} onClick={() => removePair(i)}>✕ удалить</button>
            )}
            <label className={styles.label}>
              Текст
              <input
                className={styles.input}
                value={q}
                onChange={(e) => setQuestion(i, e.target.value)}
                placeholder="Текст"
                disabled={disabled}
              />
            </label>
            <div className={styles.fieldsGrid} style={{ marginTop: 8 }}>
              {opts.map((o, j) => (
                <div key={j}>
                  <label className={styles.label}>
                    Вариант {j + 1}
                    <input
                      className={styles.input}
                      value={o}
                      onChange={(e) => setOption(i, j, e.target.value)}
                      placeholder="Вариант"
                      disabled={disabled}
                    />
                  </label>
                  {!disabled && (
                  <button
                    className={styles.removeButton}
                    style={{ position: "static", marginTop: 6 }}
                    onClick={() => removeOption(i, j)}
                  >
                    Удалить вариант
                  </button>
                  )}
                </div>
              ))}
            </div>
            {!disabled && (
              <button className={styles.actionButton} onClick={() => addOption(i)} style={{ marginTop: 8 }}>
                добавить вариант
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function SentencesEditor({
  sentences,
  onChange,
  disabled,
}: {
  sentences: Sentence[];
  onChange: (s: Sentence[]) => void;
  disabled?: boolean;
}) {
  const addSentence = () => onChange([...sentences, { text: "", gaps: [] }]);
  const removeSentence = (idx: number) => onChange(sentences.filter((_, i) => i !== idx));
  const setSentenceText = (idx: number, text: string) => {
    onChange(sentences.map((s, i) => (i === idx ? { ...s, text } : s)));
  };

  return (
    <>
      <div className={styles.header} style={{ marginTop: 4 }}>
        <h4 className={styles.title} style={{ fontSize: "1rem" }}>
          Предложения
        </h4>
        {!disabled && (
          <button className={styles.actionButton} onClick={addSentence}>
            Добавить предложение
          </button>
        )}
      </div>
      <div className={styles.list}>
        {sentences.map((s, i) => (
          <div key={i} className={styles.card}>
            {!disabled && (
              <button className={styles.removeButton} onClick={() => removeSentence(i)}>✕ удалить</button>
            )}
            <label className={styles.label}>
              Текст
              <textarea
                className={styles.textarea}
                value={s.text}
                onChange={(e) => setSentenceText(i, e.target.value)}
                placeholder="Текст предложения..."
                disabled={disabled}
              />
            </label>
            <GapsEditor
              gaps={s.gaps}
              onChange={(g) =>
                onChange(sentences.map((it, j) => (j === i ? { ...it, gaps: g } : it)))
              }
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function GapsEditor({
  gaps,
  onChange,
  disabled,
}: {
  gaps: Gap[];
  onChange: (g: Gap[]) => void;
  disabled?: boolean;
}) {
  const addGap = () => onChange([...gaps, { enter: "", correctWord: "", index: gaps.length }]);
  const removeGap = (idx: number) => onChange(gaps.filter((_, i) => i !== idx));
  const updateGap = (idx: number, patch: Partial<Gap>) =>
    onChange(
      gaps.map((g, i) => {
        if (i !== idx) return g;
        const next = { ...g, ...patch };
        if (typeof next.index === "number" && next.index < 0) next.index = 0;
        return next;
      })
    );

  return (
    <div>
      <div className={styles.header} style={{ marginTop: 4 }}>
        <h4 className={styles.title} style={{ fontSize: "0.95rem" }}>
          Пропуски
        </h4>
        {!disabled && (
          <button className={styles.actionButton} onClick={addGap}>
            Добавить пропуск
          </button>
        )}
      </div>
      <div className={styles.list}>
        {gaps.map((g, i) => (
          <div key={i} className={styles.card}>
            {!disabled && (
              <button className={styles.removeButton} onClick={() => removeGap(i)}>✕ удалить</button>
            )}
            <div className={styles.fieldsColumn}>
              <label className={styles.label}>
                Маркер пропуска
                <input
                  className={styles.input}
                  value={g.enter}
                  onChange={(e) => updateGap(i, { enter: e.target.value })}
                  placeholder="например: __"
                  disabled={disabled}
                />
              </label>
              <label className={styles.label}>
                Правильное слово
                <input
                  className={styles.input}
                  value={g.correctWord}
                  onChange={(e) => updateGap(i, { correctWord: e.target.value })}
                  placeholder="Правильный ответ"
                  disabled={disabled}
                />
              </label>
              <label className={styles.label}>
                Индекс
                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  value={g.index}
                  onChange={(e) =>
                    updateGap(i, {
                      index: Math.max(0, Number.isFinite(+e.target.value) ? Number(e.target.value) : 0),
                    })
                  }
                  placeholder="индекс"
                  disabled={disabled}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function asDataUrl(base64: string, fallbackMime: string): string {
  return base64.startsWith("data:") ? base64 : `data:${fallbackMime};base64,${base64}`;
}

// Конвертация: Wire -> Internal
function toInternalTaskBody(wire: WireTaskBody): TaskBody {
  switch (wire.type) {
    case "TextTask":
      return { type: "TextTask", variant: wire.variant.map(p => [p.first, p.second]) };
    case "AudioTask":
      // first = mediaId/база64, second = текст
      return { type: "AudioTask", variant: wire.variant.map(p => [p.first, p.second]) };
    case "ImageTask":
      // Бэкенд: first = подпись, second = media/url. Внутри: [image, caption]
      return { type: "ImageTask", variant: wire.variant.map(p => [p.second, p.first]) };
    case "TextInputWithVariantTask":
      return { type: "TextInputWithVariantTask", variant: wire.variant.map(p => [p.first, p.second]) };
    case "TextInputTask":
      return { type: "TextInputTask", sentence: wire.sentence };
  }
}

// Конвертация: Internal -> Wire
function toWireTaskBody(internal: TaskBody): WireTaskBody {
  switch (internal.type) {
    case "TextTask":
      return {
        type: "TextTask",
        variant: internal.variant.map(([a, b]) => ({ first: a, second: b })),
      };
    case "AudioTask":
      return {
        type: "AudioTask",
        variant: internal.variant.map(([a, b]) => ({ first: a, second: b })),
      };
    case "ImageTask":
      // Внутри: [image, caption] -> Wire: { first: caption, second: image }
      return {
        type: "ImageTask",
        variant: internal.variant.map(([image, caption]) => ({ first: caption, second: image })),
      };
    case "TextInputWithVariantTask":
      return {
        type: "TextInputWithVariantTask",
        variant: internal.variant.map(([q, opts]) => ({ first: q, second: opts })),
      };
    case "TextInputTask":
      return { type: "TextInputTask", sentence: internal.sentence };
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const res = reader.result as string;
      const b64 = res.split(",")[1] ?? res;
      resolve(b64);
    };
    reader.readAsDataURL(file);
  });
}