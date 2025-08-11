import React, { useEffect, useState } from "react";
import type { TaskAnswer, AnswerType, AnswerOption, MatchPair } from "../../../context/content/ContentProvider.tsx";
import contentService from "../../../services/ContentService"; // путь поправьте под проект

interface AnswerEditorProps {
  taskId: string; // если пустая строка -> локальный режим
  answer: TaskAnswer;
  onAnswerChange: (answer: TaskAnswer) => void;
}

export const AnswerEditor = ({ taskId, answer, onAnswerChange }: AnswerEditorProps) => {
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
      correctAnswer: null,
      options: answerType.includes("CHOICE") || answerType === "ORDER_WORDS" || answerType === "SELECT_WORDS" ? [] : undefined,
      matchPairs: answerType === "MATCH_PAIRS" ? [] : undefined,
    };
    emit(newAnswer);
  };

  // локальное добавление (все опции имеют id временного вида, если taskId пуст)
  const addOption = async () => {
    if (!localAnswer.options) return;
    // если задача уже в бэке — создаём сразу на бэке
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
      emit({ ...localAnswer, options: [...(localAnswer.options || []), newOpt] });
    }
  };

  const updateOptionLocalOrRemote = async (id: string, updates: Partial<AnswerOption>) => {
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
        options: localAnswer.options.map((opt) => (opt.id === id ? { ...opt, ...updates } : opt)),
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
      const updatedOpts = (localAnswer.options || []).map((o) => ({ ...o, isCorrect: o.id === optionId }));
      emit({ ...localAnswer, options: updatedOpts, correctAnswer: { optionId } as any });
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
        options: (localAnswer.options || []).map((o) => (o.id === optionId ? { ...o, isCorrect: checked } : o)),
      });
    }
  };

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <h3 style={{ margin: "0 0 16px 0", fontWeight: 600 }}>Варианты ответов</h3>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Тип ответа</label>
        <select
          value={localAnswer.answerType}
          onChange={(e) => handleAnswerTypeChange(e.target.value as AnswerType)}
          style={{ width: "100%", maxWidth: "300px", padding: "8px 10px", border: "1px solid var(--color-border)", borderRadius: "4px", fontSize: "0.95rem", background: "var(--color-bg)", color: "var(--color-text)" }}
        >
          <option value="SINGLE_CHOICE">Один выбор из вариантов</option>
          <option value="MULTI_CHOICE">Множественный выбор</option>
          <option value="ORDER_WORDS">Упорядочить слова</option>
          <option value="SELECT_WORDS">Выбрать правильные слова</option>
          <option value="MATCH_PAIRS">Сопоставить пары</option>
          <option value="TEXT_INPUT">Текстовый ответ</option>
        </select>
      </div>

      {(localAnswer.answerType === "SINGLE_CHOICE" || localAnswer.answerType === "MULTI_CHOICE") && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontWeight: 500 }}>Варианты ответов</span>
            <button type="button" onClick={addOption} style={{ padding: "6px 12px", background: "var(--color-primary)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.9rem" }}>
              + Добавить вариант
            </button>
          </div>

          {(localAnswer.options || []).map((option) => (
            <div key={option.id} style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px", padding: "8px", border: "1px solid var(--color-border)", borderRadius: "4px" }}>
              <input
                type={localAnswer.answerType === "SINGLE_CHOICE" ? "radio" : "checkbox"}
                name="correct-answer"
                checked={!!option.isCorrect}
                onChange={(e) => handleCorrectToggle(option.id, e.target.checked)}
              />
              <input
                type="text"
                value={option.text}
                onChange={(e) => {
                  // локально обновляем текст, не пушим на бэк пока не нажали Save (чтобы не создавать постоянные запросы)
                  emit({
                    ...localAnswer,
                    options: (localAnswer.options || []).map((o) => (o.id === option.id ? { ...o, text: e.target.value } : o)),
                  });
                }}
                placeholder="Текст варианта"
                style={{ flex: 1, padding: "6px 8px", border: "1px solid var(--color-border)", borderRadius: "4px", fontSize: "0.9rem", background: "var(--color-bg)", color: "var(--color-text)" }}
              />
              <button
                type="button"
                onClick={() => updateOptionLocalOrRemote(option.id, { text: option.text })}
                disabled={isSaving === option.id}
                style={{ padding: "6px 8px" }}
              >
                {isSaving === option.id ? "Сох..." : "Сохранить"}
              </button>
              <button
                type="button"
                onClick={() => removeOption(option.id)}
                disabled={isSaving === option.id}
                style={{ background: "#dc3545", color: "white", border: "none", borderRadius: "4px", padding: "4px 8px", cursor: "pointer", fontSize: "0.8rem" }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Остальные типы ответа — оставляем как раньше */}
      {localAnswer.answerType === "TEXT_INPUT" && (
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 500 }}>Правильный ответ</label>
          <input
            type="text"
            value={localAnswer.correctAnswer?.text || ""}
            onChange={(e) => emit({ ...localAnswer, correctAnswer: { text: e.target.value } as any })}
            style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--color-border)", borderRadius: "4px", background: "var(--color-bg)", color: "var(--color-text)" }}
          />
        </div>
      )}

      {(localAnswer.answerType === "ORDER_WORDS" || localAnswer.answerType === "SELECT_WORDS") && (
        <div>
          {/* ... можно оставить прежнюю верстку, просто использовать localAnswer и emit */}
        </div>
      )}

      {localAnswer.answerType === "MATCH_PAIRS" && (
        <div>
          {/* ... как у вас было — опираясь на localAnswer.matchPairs */}
        </div>
      )}
    </div>
  );
};

export default AnswerEditor;
