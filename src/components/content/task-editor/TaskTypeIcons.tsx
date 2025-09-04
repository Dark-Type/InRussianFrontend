import React from 'react';
import type { TaskType } from './TaskModels';
import { TASK_TYPE_LABELS_RU } from './TaskModels';

// Import ALL available SVG assets (one place). Vite converts them to URLs.
import IconFillInTheBlanks from './IconsSVG/FillInTheBlanks.svg';
import IconListen from './IconsSVG/Listen.svg';
import IconConnectTranslationToWord from './IconsSVG/ConnectTranslationToWord.svg';
import IconConnectImageToText from './IconsSVG/ConnectImageToText.svg';
import IconChooseRightVariant from './IconsSVG/ChooseRightVariant.svg';
import IconWrite from './IconsSVG/Write.svg';
import IconTask from './IconsSVG/Task.svg';
import IconSpeak from './IconsSVG/Speak.svg';
import IconSetTheStress from './IconsSVG/SetTheStress.svg';
import IconRepeat from './IconsSVG/Repeat.svg';
import IconRemember from './IconsSVG/Remember.svg';
import IconRead from './IconsSVG/Read.svg';
import IconQuestion from './IconsSVG/Question.svg';
import IconPickRightWords from './IconsSVG/PickRightWords.svg';

// Explicit order (5 per row target). Keep aligned with ALL_TASK_TYPES in TaskEditorModal.
export const TASK_TYPE_ORDER: TaskType[] = [
  'LISTEN_AND_CHOOSE',
  'READ_AND_CHOOSE',
  'LOOK_AND_CHOOSE',
  'MATCH_AUDIO_TEXT',
  'MATCH_TEXT_TEXT',
  'WRITE',
  'LISTEN',
  'READ',
  'SPEAK',
  'REMIND',
  'MARK',
  'FILL',
  'CONNECT_AUDIO',
  'CONNECT_IMAGE',
  'CONNECT_TRANSLATE',
  'SELECT',
];

// Mapping every TaskType -> icon (use all unique SVGs at least once; some reuse inevitable)
export const TASK_TYPE_ICON_PATH: Record<TaskType, string> = {
  LISTEN_AND_CHOOSE: IconRepeat,                 // слушать несколько фрагментов и выбрать
  READ_AND_CHOOSE: IconPickRightWords,          // чтение + выбор слов/варианта
  LOOK_AND_CHOOSE: IconQuestion,                // визуальный/общий выбор (вопрос)
  MATCH_AUDIO_TEXT: IconConnectTranslationToWord, // сопоставить аудио с текстом/переводом
  MATCH_TEXT_TEXT: IconTask,                    // общий матчинг текст <-> текст
  WRITE: IconWrite,                             // письмо / ввод
  LISTEN: IconListen,                           // прослушивание
  READ: IconRead,                               // чтение
  SPEAK: IconSpeak,                             // проговаривание
  REMIND: IconRemember,                         // задание на запоминание
  MARK: IconSetTheStress,                       // поставить ударение / отметить
  FILL: IconFillInTheBlanks,                    // заполнить пропуски
  CONNECT_AUDIO: IconRepeat,                    // соединить аудио элементы (повтор/повторение) – повторно используем
  CONNECT_IMAGE: IconConnectImageToText,        // соединить изображение и текст
  CONNECT_TRANSLATE: IconConnectTranslationToWord, // соединить слово и перевод
  SELECT: IconChooseRightVariant,               // выбрать правильный вариант
};

export interface TaskTypeIconPickerProps {
  selected: TaskType[];
  onToggle?: (t: TaskType) => void;
  disabled?: boolean;
  compact?: boolean; // for read-only small display
}

export const TaskTypeIconPicker: React.FC<TaskTypeIconPickerProps> = ({ selected, onToggle, disabled, compact }) => {
  const handleToggle = (t: TaskType) => {
    if (disabled || !onToggle) return;
    onToggle(t);
  };
  return (
    <div className={`taskTypeGrid${compact ? ' taskTypeGridCompact' : ''}`}>
      {TASK_TYPE_ORDER.map(t => {
        const active = selected.includes(t);
        return (
          <button
            key={t}
            type="button"
            aria-pressed={active}
            disabled={disabled}
            onClick={() => handleToggle(t)}
            className={`taskTypeItem${active ? ' selected' : ''}`}
            title={TASK_TYPE_LABELS_RU[t]}
          >
            <span className="taskTypeIconWrapper">
              <img src={TASK_TYPE_ICON_PATH[t]} alt={TASK_TYPE_LABELS_RU[t]} className="taskTypeIcon" loading="lazy" />
            </span>
            <span className="taskTypeLabel">{TASK_TYPE_LABELS_RU[t]}</span>
          </button>
        );
      })}
    </div>
  );
};
