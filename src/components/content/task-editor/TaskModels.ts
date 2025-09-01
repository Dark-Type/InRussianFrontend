export type TaskType =
  | "LISTEN_AND_CHOOSE"
  | "READ_AND_CHOOSE"
  | "LOOK_AND_CHOOSE"
  | "MATCH_AUDIO_TEXT"
  | "MATCH_TEXT_TEXT"
  | "WRITE"
  | "LISTEN"
  | "READ"
  | "SPEAK"
  | "REMIND"
  | "MARK"
  | "FILL"
  | "CONNECT_AUDIO"
  | "CONNECT_IMAGE"
  | "CONNECT_TRANSLATE"
  | "SELECT";

export type Pair<A, B> = [A, B];

export interface Gap {
  enter: string;
  correctWord: string;
  index: number;
}

export interface Sentence {
  text: string;
  gaps: Gap[];
}

export type TaskBody =
  | {
      type: "TextTask";
      variant: Pair<string, string>[];
    }
  | {
      type: "AudioTask";
      variant: Pair<string , string>[];
    }
  | {
      type: "TextInputTask";
      sentence: Sentence[];
    }
  | {
      type: "TextInputWithVariantTask";
      variant: Pair<string, string[]>[];
    }
  | {
      type: "ImageTask";
      variant: Pair<string, string>[];
    };

export interface TaskModel {
  id: string;
  taskType: TaskType[];
  taskBody: TaskBody;
  question: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskModelRequest {
  themeId: string;
  taskBody: TaskBody;
  question: string | null;
  taskTypes: TaskType[];
}

export interface UpdateTaskModelRequest {
  themeId: string;
  taskBody: TaskBody;
  taskTypes: TaskType[];
}

export const isTextTask = (b: TaskBody): b is Extract<TaskBody, { type: "TextTask" }> =>
  b.type === "TextTask";
export const isAudioTask = (b: TaskBody): b is Extract<TaskBody, { type: "AudioTask" }> =>
  b.type === "AudioTask";
export const isImageTask = (b: TaskBody): b is Extract<TaskBody, { type: "ImageTask" }> =>
  b.type === "ImageTask";
export const isTextInputTask = (b: TaskBody): b is Extract<TaskBody, { type: "TextInputTask" }> =>
  b.type === "TextInputTask";
export const isTextInputWithVariantTask = (
  b: TaskBody
): b is Extract<TaskBody, { type: "TextInputWithVariantTask" }> => b.type === "TextInputWithVariantTask";

export const TASK_TYPE_LABELS_RU: Record<TaskType, string> = {
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

export const taskTypeToRu = (t: TaskType): string => TASK_TYPE_LABELS_RU[t];

export const taskTypesToRu = (types: TaskType[], separator = ", "): string =>
  types.map(taskTypeToRu).join(separator);