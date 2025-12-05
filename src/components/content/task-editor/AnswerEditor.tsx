import { useEffect, useState } from "react";
import type {
  TaskAnswer,
  AnswerType,
  AnswerOption,
  MatchPair,
} from "../../../context/content/ContentProvider.tsx";
import contentService from "../../../services/ContentService";
import { UntranslatableField } from "./UntranslatableField";

interface AnswerEditorProps {
  taskId: string;
  answer: TaskAnswer;
  onAnswerChange: (answer: TaskAnswer) => void;
}

export const AnswerEditor = ({
  taskId,
  answer,
  onAnswerChange,
}: AnswerEditorProps) => {
  const [localAnswer, setLocalAnswer] = useState<TaskAnswer>(answer);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  useEffect(() => setLocalAnswer(answer), [answer]);

  const emit = (a: TaskAnswer) => {
    setLocalAnswer(a);
    onAnswerChange(a);
  };

  const handleAnswerTypeChange = (answerType: AnswerType) => {
    const newAnswer: TaskAnswer = {
      answerType,
      correctAnswer: {optionId: ""},
      options:
        answerType.includes("CHOICE") ||
        answerType === "ORDER_WORDS" ||
        answerType === "SELECT_WORDS"
          ? []
          : undefined,
      matchPairs: answerType === "MATCH_PAIRS" ? [] : undefined,
    };
    emit(newAnswer);
  };

  const addOption = async () => {
    if (!localAnswer.options) return;
    if (taskId) {
      setIsSaving("create");
      try {
        const created = await contentService.createAnswerOption(taskId, {
          optionText: "",
          isCorrect: false,
          orderNum: localAnswer.options.length,
        });
        const task = await contentService.getTaskWithDetails(taskId);
        const backendOptions = task.answerOptions || task.answer?.options || [];
        emit({
          ...localAnswer,
          options: backendOptions.map((o: any) => ({
            id: o.id,
            text: o.optionText ?? "",
            isCorrect: !!o.isCorrect,
            orderNum: o.orderNum ?? 0,
          })),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(null);
      }
    } else {
      const newOpt: AnswerOption = {
        id: `tmp_${Date.now()}`,
        text: "",
        isCorrect: false,
        orderNum: localAnswer.options.length,
      };
      emit({
        ...localAnswer,
        options: [...(localAnswer.options || []), newOpt],
      });
    }
  };

  const updateOptionLocalOrRemote = async (
    id: string,
    updates: Partial<AnswerOption>
  ) => {
    if (!localAnswer.options) return;
    const existing = localAnswer.options.find((o) => o.id === id);
    if (!existing) return;

    if (taskId && !id.startsWith("tmp_")) {
      setIsSaving(id);
      try {
        await contentService.updateAnswerOption(taskId, id, {
          optionText: updates.text ?? existing.text,
          isCorrect: updates.isCorrect ?? existing.isCorrect,
          orderNum: updates.orderNum ?? existing.orderNum,
        });
        const task = await contentService.getTaskWithDetails(taskId);
        const backendOptions = task.answerOptions || task.answer?.options || [];
        emit({
          ...localAnswer,
          options: backendOptions.map((o: any) => ({
            id: o.id,
            text: o.optionText ?? "",
            isCorrect: !!o.isCorrect,
            orderNum: o.orderNum ?? 0,
          })),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(null);
      }
    } else {
      emit({
        ...localAnswer,
        options: localAnswer.options.map((opt) =>
          opt.id === id ? { ...opt, ...updates } : opt
        ),
      });
    }
  };

  const removeOption = async (id: string) => {
    if (!localAnswer.options) return;
    if (taskId && !id.startsWith("tmp_")) {
      setIsSaving(id);
      try {
        await contentService.deleteAnswerOption(taskId, id);
        const task = await contentService.getTaskWithDetails(taskId);
        const backendOptions = task.answerOptions || task.answer?.options || [];
        emit({
          ...localAnswer,
          options: backendOptions.map((o: any) => ({
            id: o.id,
            text: o.optionText ?? "",
            isCorrect: !!o.isCorrect,
            orderNum: o.orderNum ?? 0,
          })),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(null);
      }
    } else {
      emit({
        ...localAnswer,
        options: localAnswer.options.filter((opt) => opt.id !== id),
      });
    }
  };

  const handleCorrectToggle = (optionId: string, checked: boolean) => {
    if (localAnswer.answerType === "SINGLE_CHOICE") {
      const updatedOpts = (localAnswer.options || []).map((o) => ({
        ...o,
        isCorrect: o.id === optionId,
      }));
      emit({
        ...localAnswer,
        options: updatedOpts,
        correctAnswer: { optionId } as any,
      });
      if (taskId) {
        updateOptionLocalOrRemote(optionId, { isCorrect: true });
        (localAnswer.options || []).forEach((o) => {
          if (o.id !== optionId && o.isCorrect) {
            updateOptionLocalOrRemote(o.id, { isCorrect: false });
          }
        });
      }
    } else {
      updateOptionLocalOrRemote(optionId, { isCorrect: checked });
      emit({
        ...localAnswer,
        options: (localAnswer.options || []).map((o) =>
          o.id === optionId ? { ...o, isCorrect: checked } : o
        ),
      });
    }
  };

  const addMatchPair = () => {
    const newPair: MatchPair = {
      id: `pair_${Date.now()}`,
      leftItem: { type: "TEXT", content: "" },
      rightItem: { type: "TEXT", content: "" },
    };
    emit({
      ...localAnswer,
      matchPairs: [...(localAnswer.matchPairs || []), newPair],
    });
  };

  const updateMatchPair = (
    id: string,
    side: "left" | "right",
    content: string
  ) => {
    emit({
      ...localAnswer,
      matchPairs: (localAnswer.matchPairs || []).map((pair) => {
        if (pair.id === id) {
          return {
            ...pair,
            leftItem:
              side === "left" ? { ...pair.leftItem, content } : pair.leftItem,
            rightItem:
              side === "right"
                ? { ...pair.rightItem, content }
                : pair.rightItem,
          };
        }
        return pair;
      }),
    });
  };

  const removeMatchPair = (id: string) => {
    emit({
      ...localAnswer,
      matchPairs: (localAnswer.matchPairs || []).filter(
        (pair) => pair.id !== id
      ),
    });
  };

  const updateOrderWords = (words: string[]) => {
    emit({
      ...localAnswer,
      options: words.map((word, index) => ({
        id: `word_${index}`,
        text: word,
        isCorrect: true,
        orderNum: index,
      })),
    });
  };

  // console.log("[ANSWER]", localAnswer);
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <h3 style={{ margin: "0 0 16px 0", fontWeight: 600 }}>
        Варианты ответов
      </h3>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
        >
          Тип ответа
        </label>
        <select
          value={localAnswer.answerType}
          onChange={(e) => handleAnswerTypeChange(e.target.value as AnswerType)}
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "8px 10px",
            border: "1px solid var(--color-border)",
            borderRadius: "4px",
            fontSize: "0.95rem",
            background: "var(--color-bg)",
            color: "var(--color-text)",
          }}
        >
          <option value="SINGLE_CHOICE">Один выбор из вариантов</option>
          <option value="MULTIPLE_CHOICE">Множественный выбор</option>
          <option value="ORDER_WORDS">Упорядочить слова</option>
          <option value="SELECT_WORDS">Выбрать правильные слова</option>
          <option value="MATCH_PAIRS">Сопоставить пары</option>
          <option value="TEXT_INPUT">Текстовый ответ</option>
        </select>
      </div>

      {/* Блок для типов с выбором (SINGLE_CHOICE, MULTI_CHOICE) */}
      {(localAnswer.answerType.startsWith("SINGLE_CHOICE") ||
        localAnswer.answerType.startsWith("MULTIPLE_CHOICE")) && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontWeight: 500 }}>Варианты ответов</span>
            <button
              type="button"
              onClick={addOption}
              style={{
                padding: "6px 12px",
                background: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              + Добавить вариант
            </button>
          </div>

          {(localAnswer.options || []).map((option) => (
            <div
              key={option.id}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: "8px",
                padding: "8px",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
              }}
            >
              <input
                type={
                  localAnswer.answerType.startsWith("SINGLE_CHOICE")
                    ? "radio"
                    : "checkbox"
                }
                name="correct-answer"
                checked={!!option.isCorrect}
                onChange={(e) =>
                  handleCorrectToggle(option.id, e.target.checked)
                }
              />
              <UntranslatableField
                value={option.text}
                onChange={(v) => {
                  emit({
                    ...localAnswer,
                    options: (localAnswer.options || []).map((o) =>
                      o.id === option.id ? { ...o, text: v } : o
                    ),
                  });
                }}
                placeholder="Текст варианта"
                style={{
                  flex: 1,
                  padding: "6px 8px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  background: "var(--color-bg)",
                  color: "var(--color-text)",
                }}
              />
              <button
                type="button"
                onClick={() =>
                  updateOptionLocalOrRemote(option.id, { text: option.text })
                }
                disabled={isSaving === option.id}
                style={{ padding: "6px 8px" }}
              >
                {isSaving === option.id ? "Сохранение..." : "Сохранить"}
              </button>
              <button
                type="button"
                onClick={() => removeOption(option.id)}
                disabled={isSaving === option.id}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Добавлено: Блок для текстового ответа (TEXT_INPUT) */}
      {localAnswer.answerType === "TEXT_INPUT" && (
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
          >
            Правильный ответ
          </label>
          <UntranslatableField
            value={localAnswer.correctAnswer?.text || ""}
            onChange={(v) =>
              emit({
                ...localAnswer,
                correctAnswer: { text: v } as any,
              })
            }
            style={{
              width: "100%",
              padding: "8px 10px",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              background: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          />
        </div>
      )}

      {/* Добавлено: Блок для упорядочивания слов (ORDER_WORDS) */}
      {localAnswer.answerType === "ORDER_WORDS" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontWeight: 500 }}>Слова для упорядочивания</span>
            <button
              type="button"
              onClick={addOption}
              style={{
                padding: "6px 12px",
                background: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              + Добавить слово
            </button>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
            >
              Слова через запятую
            </label>
            <UntranslatableField
              value={(localAnswer.options || []).map((o) => o.text).join(", ")}
              onChange={(v) =>
                updateOrderWords(v.split(",").map((w) => w.trim()))
              }
              placeholder="Введите слова через запятую"
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
                background: "var(--color-bg)",
                color: "var(--color-text)",
              }}
            />
          </div>

          <div>
            <p style={{ margin: "8px 0", fontWeight: 500 }}>
              Правильный порядок:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {(localAnswer.options || []).map((option, index) => (
                <div
                  key={option.id}
                  style={{
                    padding: "6px 10px",
                    background: "var(--color-primary)",
                    color: "white",
                    borderRadius: "4px",
                  }}
                >
                  {index + 1}. {option.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Добавлено: Блок для выбора правильных слов (SELECT_WORDS) */}
      {localAnswer.answerType === "SELECT_WORDS" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontWeight: 500 }}>Варианты слов</span>
            <button
              type="button"
              onClick={addOption}
              style={{
                padding: "6px 12px",
                background: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              + Добавить слово
            </button>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}
            >
              Слова через запятую
            </label>
            <UntranslatableField
              value={(localAnswer.options || []).map((o) => o.text).join(", ")}
              onChange={(v) => {
                const words = v.split(",").map((w) => w.trim());
                emit({
                  ...localAnswer,
                  options: words.map((word, index) => ({
                    id: `word_${index}`,
                    text: word,
                    isCorrect:
                      (localAnswer.options || [])[index]?.isCorrect || false,
                    orderNum: index,
                  })),
                });
              }}
              placeholder="Введите слова через запятую"
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
                background: "var(--color-bg)",
                color: "var(--color-text)",
              }}
            />
          </div>

          <div>
            <p style={{ margin: "8px 0", fontWeight: 500 }}>
              Выберите правильные слова:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {(localAnswer.options || []).map((option) => (
                <div
                  key={option.id}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <input
                    type="checkbox"
                    checked={!!option.isCorrect}
                    onChange={(e) =>
                      updateOptionLocalOrRemote(option.id, {
                        isCorrect: e.target.checked,
                      })
                    }
                  />
                  <span>{option.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Добавлено: Блок для сопоставления пар (MATCH_PAIRS) */}
      {localAnswer.answerType === "MATCH_PAIRS" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontWeight: 500 }}>Пары для сопоставления</span>
            <button
              type="button"
              onClick={addMatchPair}
              style={{
                padding: "6px 12px",
                background: "var(--color-primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              + Добавить пару
            </button>
          </div>

          {(localAnswer.matchPairs || []).map((pair) => (
            <div
              key={pair.id}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: "12px",
                padding: "12px",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
              }}
            >
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  Левая часть
                </label>
                <UntranslatableField
                  value={pair.leftItem.content}
                  onChange={(v) =>
                    updateMatchPair(pair.id, "left", v)
                  }
                  placeholder="Левая часть пары"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  Правая часть
                </label>
                <UntranslatableField
                  value={pair.rightItem.content}
                  onChange={(v) =>
                    updateMatchPair(pair.id, "right", v)
                  }
                  placeholder="Правая часть пары"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeMatchPair(pair.id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerEditor;
