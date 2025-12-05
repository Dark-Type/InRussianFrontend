import React, {useMemo, useState} from "react";
import styles from "./ContentEditor.module.css";
import type {
    TaskType,
    TaskBody,
    GapWithVariantModel,
    TextInputWithVariantModel,
    ListenAndSelectModel,
    ImageAndSelectModel,
    ConstructSentenceModel,
    SelectWordsModel,
    CreateTaskModelRequest,
    UpdateTaskModelRequest,
    TaskModel,
    ContentItem,
} from "./TaskModels";
import {axiosInstance} from "../../../instances/axiosInstance";
import {UntranslatableField} from "./UntranslatableField";
import {TaskTypesPicker} from "./components/TaskTypesPicker";
import {PairsEditor} from "./components/PairsEditor";
import {SentencesEditor} from "./components/SentencesEditor";
import {AudioPairsEditor, ImagePairsEditor} from "./components/mediaPairEditors";
import {TextWithVariantGapsEditor} from "./components/TextWithVariantGapsEditor";
import {ListenAndSelectEditor} from "./components/ListenAndSelectEditor";
import {ImageAndSelectEditor} from "./components/ImageAndSelectEditor";
import {ConstructSentenceEditor} from "./components/ConstructSentenceEditor";
import {SelectWordsEditor} from "./components/SelectWordsEditor";
import {ContentBlocksEditor} from "./components/ContentBlocksEditor";
import {
    uploadTaskBodyMediaIfNeeded,
    toInternalTaskBody,
    toWireTaskBody,
    type WireTaskBody,
} from "./taskBodyUtils";

const BODY_TYPE_OPTIONS: { value: TaskBody["type"]; label: string }[] = [
    {value: "TextConnectTask", label: "Текстовые варианты"},
    {value: "AudioTask", label: "Аудио варианты"},
    {value: "ImageTask", label: "Изображения и подписи"},
    {value: "TextInputTask", label: "Ввод текста (Пропуски)"},
    {value: "TextInputWithVariantTask", label: "Пропуски с вариантами"},
    {value: "ListenAndSelect", label: "Слушать и выбирать"},
    {value: "ImageAndSelect", label: "Смотреть и выбирать"},
    {value: "ConstructSentenceTask", label: "Собери предложение"},
    {value: "SelectWordsTask", label: "Выбор слов"},
    {value: "ContentBlocks", label: "Теория"},
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

async function createTaskApi(req: CreateTaskModelRequest): Promise<TaskModel> {
    const resp = await axiosInstance.post("/task", req);
    return resp.data as TaskModel;
}

async function updateTaskApi(id: string, req: UpdateTaskModelRequest): Promise<TaskModel> {
    const resp = await axiosInstance.put(`/task/${id}`, req);
    return resp.data as TaskModel;
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: (task: TaskModel) => void;
    onUpdated?: (task: TaskModel) => void;
    themeId: string;
    initialTask?: TaskModel | null;
    readOnly?: boolean;
};

export default function TaskEditorModal({
    isOpen,
    onClose,
    onCreated,
    onUpdated,
    themeId,
    initialTask,
    readOnly = false,
}: Props) {
    const [question, setQuestion] = useState<string | null>("");
    const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [body, setBody] = useState<TaskBody>({type: "TextConnectTask", variant: [["", ""]]});

    const bodyType = body.type;

    React.useEffect(() => {
        if (!isOpen) return;
        if (!initialTask) {
            setQuestion("");
            setTaskTypes([]);
            setBody({type: "TextConnectTask", variant: [["", ""]]});
            return;
        }
        setQuestion(initialTask.question ?? "");
        setTaskTypes(initialTask.taskType ?? []);
        setBody(toInternalTaskBody(initialTask.taskBody as unknown as WireTaskBody));
    }, [isOpen, initialTask?.id]);

    const handleToggleTaskType = (taskType: TaskType) => {
        if (readOnly) return;
        setTaskTypes((prev) =>
            prev.includes(taskType) ? prev.filter((value) => value !== taskType) : [...prev, taskType],
        );
    };

    const handleChangeBodyType = (type: TaskBody["type"]) => {
        if (readOnly) return;
        switch (type) {
            case "TextConnectTask":
                setBody({type: "TextConnectTask", variant: [["", ""]]});
                break;
            case "TextInputTask":
                setBody({type: "TextInputTask", task: [{label: "", text: "", gaps: []}]});
                break;
            case "AudioTask":
                setBody({type: "AudioTask", variant: [["", ""]]});
                break;
            case "ImageTask":
                setBody({type: "ImageTask", variant: [["", ""]]});
                break;
            case "TextInputWithVariantTask":
                setBody({type: "TextInputWithVariantTask", task: {label: "", text: "", gaps: []}} as TaskBody);
                break;
            case "ListenAndSelect":
                setBody({
                    type: "ListenAndSelect",
                    task: {audioBlocks: [], variants: [["", false], ["", false]]},
                } as TaskBody);
                break;
            case "ImageAndSelect":
                setBody({
                    type: "ImageAndSelect",
                    task: {imageBlocks: [], variants: [["", false], ["", false]]},
                } as TaskBody);
                break;
            case "ConstructSentenceTask":
                setBody({type: "ConstructSentenceTask", task: {audio: null, variants: ["", ""]}} as TaskBody);
                break;
            case "SelectWordsTask":
                setBody({
                    type: "SelectWordsTask",
                    task: {audio: "", variants: [["", false], ["", false]]},
                } as TaskBody);
                break;
            case "ContentBlocks":
                setBody({type: "ContentBlocks", items: [{kind: "TEXT", text: ""}]});
                break;
        }
    };

    const submitDisabled = useMemo(() => {
        const isCreate = !initialTask;
        if (taskTypes.length === 0) return true;
        if (isCreate && (!question || question.trim() === "")) return true;
        switch (body.type) {
            case "TextConnectTask":
                return body.variant.length === 0 || body.variant.some(([a, b]) => !a || !b);
            case "AudioTask":
                return body.variant.length === 0 || body.variant.some(([audio, text]) => !audio || !text || !text.trim());
            case "ImageTask":
                return body.variant.length === 0 || body.variant.some(([image, caption]) => !image || !caption || !caption.trim());
            case "TextInputTask":
                return (
                    body.task.length === 0 ||
                    body.task.some((sentence) => !sentence.text || !sentence.text.trim()) ||
                    body.task.some((sentence) => sentence.gaps.some((gap) => !gap.correctWord || gap.index < 0)) ||
                    body.task.some((sentence) => {
                        const idxs = sentence.gaps.map((gap) => gap.index);
                        return new Set(idxs).size !== idxs.length;
                    })
                );
            case "TextInputWithVariantTask":
                return (
                    !body.task ||
                    !body.task.text ||
                    !body.task.text.trim() ||
                    !body.task.gaps ||
                    body.task.gaps.some(
                        (gap: GapWithVariantModel) =>
                            (gap as any).indexWord < 0 ||
                            !gap.correctVariant ||
                            !gap.correctVariant.trim() ||
                            !gap.variants ||
                            gap.variants.length === 0 ||
                            gap.variants.some((variant) => !variant || !variant.trim()) ||
                            !gap.variants.includes(gap.correctVariant),
                    ) ||
                    (() => {
                        const idxs = body.task.gaps.map((gap: any) => gap.indexWord);
                        return new Set(idxs).size !== idxs.length;
                    })()
                );
            case "ListenAndSelect":
                return (
                    !(body.task as ListenAndSelectModel).audioBlocks?.length ||
                    (body.task as ListenAndSelectModel).audioBlocks.some((block) => !block.name || !block.audio) ||
                    !(body.task as ListenAndSelectModel).variants ||
                    (body.task as ListenAndSelectModel).variants.length < 2 ||
                    (body.task as ListenAndSelectModel).variants.some(([text]) => !text || !text.trim()) ||
                    !(body.task as ListenAndSelectModel).variants.some(([, correct]) => correct)
                );
            case "ImageAndSelect":
                return (
                    !(body.task as ImageAndSelectModel).imageBlocks?.length ||
                    (body.task as ImageAndSelectModel).imageBlocks.some((block) => !block.name || !block.image) ||
                    !(body.task as ImageAndSelectModel).variants ||
                    (body.task as ImageAndSelectModel).variants.length < 2 ||
                    (body.task as ImageAndSelectModel).variants.some(([text]) => !text || !text.trim()) ||
                    !(body.task as ImageAndSelectModel).variants.some(([, correct]) => correct)
                );
            case "ConstructSentenceTask":
                return (
                    !(body.task as ConstructSentenceModel).variants ||
                    (body.task as ConstructSentenceModel).variants.length < 2 ||
                    (body.task as ConstructSentenceModel).variants.some((word) => !word || !word.trim())
                );
            case "SelectWordsTask":
                return (
                    !(body.task as SelectWordsModel).audio ||
                    !(body.task as SelectWordsModel).audio.trim() ||
                    (body.task as SelectWordsModel).variants.length < 2 ||
                    (body.task as SelectWordsModel).variants.some(([text]) => !text || !text.trim()) ||
                    !(body.task as SelectWordsModel).variants.some(([, correct]) => correct)
                );
            case "ContentBlocks": {
                const items = (body as any).items as ContentItem[];
                if (!items || items.length === 0) return true;
                return items.some((item) => {
                    if (item.kind === "TEXT") return !item.text || !item.text.trim();
                    if (item.kind === "IMAGE") return !item.imageUrl || !item.imageUrl.trim();
                    if (item.kind === "AUDIO") return !item.audioUrl || !item.audioUrl.trim();
                    return true;
                });
            }
            default:
                return true;
        }
    }, [taskTypes, body, initialTask, question]);

    const onSubmit = async () => {
        setError(null);
        setSaving(true);
        try {
            const bodyWithMediaIds = await uploadTaskBodyMediaIfNeeded(body);
            const wireBody = toWireTaskBody(bodyWithMediaIds);
            if (initialTask) {
                const req: UpdateTaskModelRequest = {
                    themeId,
                    taskBody: wireBody as unknown as TaskBody,
                    taskTypes,
                };
                const updated = await updateTaskApi(initialTask.id, req);
                onUpdated?.(updated);
                onClose();
            } else {
                const req: CreateTaskModelRequest = {
                    themeId,
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
                    <h3 className={styles.title}>
                        {readOnly ? "Просмотр задания" : initialTask ? "Редактировать задание" : "Создать задание"}
                    </h3>
                </div>

                {error && (
                    <div className={styles.card} style={{borderColor: "#dc3545", color: "#dc3545"}}>
                        {error}
                    </div>
                )}

                <div className={styles.card}>
                    <div className={styles.fieldsGrid}>
                        <label className={styles.label}>
                            Вопрос
                            <UntranslatableField
                                className={styles.input}
                                value={question ?? ""}
                                onChange={(v) => setQuestion(v)}
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
                                {BODY_TYPE_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                <TaskTypesPicker selected={taskTypes} onToggle={handleToggleTaskType} disabled={readOnly} />

                <div className={styles.card}>
                    {body.type === "TextConnectTask" && (
                        <PairsEditor
                            title="Текстовые варианты"
                            pairs={body.variant}
                            onChange={(pairs) => setBody({...body, variant: pairs})}
                            leftPlaceholder="Текст"
                            rightPlaceholder="Перевод"
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "AudioTask" && (
                        <AudioPairsEditor
                            pairs={body.variant}
                            onChange={(pairs) => setBody({...body, variant: pairs})}
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "ImageTask" && (
                        <ImagePairsEditor
                            pairs={body.variant}
                            onChange={(pairs) => setBody({...body, variant: pairs})}
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "TextInputWithVariantTask" && (
                        <TextWithVariantGapsEditor
                            value={body.task as TextInputWithVariantModel}
                            onChange={(value: TextInputWithVariantModel) => setBody({...body, task: value} as TaskBody)}
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "ListenAndSelect" && (
                        <ListenAndSelectEditor
                            value={body.task as ListenAndSelectModel}
                            onChange={(value: ListenAndSelectModel) => setBody({...body, task: value} as TaskBody)}
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "ImageAndSelect" && (
                        <ImageAndSelectEditor
                            value={body.task as ImageAndSelectModel}
                            onChange={(value: ImageAndSelectModel) => setBody({...body, task: value} as TaskBody)}
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "TextInputTask" && (
                        <SentencesEditor
                            sentences={body.task}
                            onChange={(sentences) => setBody({...body, task: sentences})}
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "ConstructSentenceTask" && (
                        <ConstructSentenceEditor
                            value={body.task as ConstructSentenceModel}
                            onChange={(value: ConstructSentenceModel) => setBody({...body, task: value} as TaskBody)}
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "SelectWordsTask" && (
                        <SelectWordsEditor
                            value={body.task as SelectWordsModel}
                            onChange={(value: SelectWordsModel) => setBody({...body, task: value} as TaskBody)}
                            disabled={readOnly}
                        />
                    )}

                    {body.type === "ContentBlocks" && (
                        <ContentBlocksEditor
                            value={{items: (body as any).items || []}}
                            onChange={(value) => setBody({type: "ContentBlocks", items: value.items} as TaskBody)}
                            disabled={readOnly}
                        />
                    )}
                </div>

                <div className={styles.modalFooter}>
                    <div style={{flex: 1}} />
                    <button className={styles.actionButton} onClick={onClose} disabled={saving}>
                        Закрыть
                    </button>
                    {!readOnly && (
                        <button
                            className={styles.actionButton}
                            onClick={onSubmit}
                            disabled={saving || submitDisabled}
                        >
                            {saving ? (initialTask ? "Сохранение..." : "Создание...") : initialTask ? "Сохранить" : "Создать"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
