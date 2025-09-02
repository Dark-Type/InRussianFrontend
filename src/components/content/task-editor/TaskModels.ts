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
  correctWord: string;
  index: number; // internal; maps to backend indexWord
}

export interface Sentence {
  label: string;
  text: string;
  gaps: Gap[];
}

export interface GapWithVariantModel {
  indexWord: number; // matches backend indexWord
  variants: string[];
  correctVariant: string;
}

export interface TextInputWithVariantModel {
  label: string;
  text: string;
  gaps: GapWithVariantModel[];
}

export interface AudioBlocks {
  name: string;
  description?: string | null;
  audio: string; // mediaId | dataURL | base64
  descriptionTranslate?: string | null;
}

export interface ListenAndSelectModel {
  audioBlocks: AudioBlocks[];
  variants: Pair<string, boolean>[];
}

export interface ImageBlocks {
  name: string;
  description?: string | null;
  image: string; // mediaId | dataURL | base64
  descriptionTranslate?: string | null;
}

export interface ImageAndSelectModel {
  imageBlocks: ImageBlocks[];
  variants: Pair<string, boolean>[];
}

export interface ConstructSentenceModel {
  audio?: string | null; // mediaId | dataURL | base64
  variants: string[]; // words in correct order
}

export interface SelectWordsModel {
  audio: string; // mediaId | dataURL | base64 (required)
  variants: Pair<string, boolean>[]; // single correct (radio)
}

export type TaskBody =
  | {
      type: "TextConnectTask";
      variant: Pair<string, string>[];
    }
  | {
      type: "AudioTask";
      variant: Pair<string , string>[];
    }
  | {
      type: "TextInputTask";
      task: Sentence[];
    }
  | {
      type: "TextInputWithVariantTask";
      task: TextInputWithVariantModel;
    }
  | {
      type: "ImageTask";
      variant: Pair<string, string>[];
    }
  | {
      type: "ListenAndSelect";
      task: ListenAndSelectModel;
    }
  | {
      type: "ImageAndSelect";
      task: ImageAndSelectModel;
  }
  | {
      type: "ConstructSentenceTask";
      task: ConstructSentenceModel;
    }
  | {
      type: "SelectWordsTask";
      task: SelectWordsModel;
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

// Removed nonexistent TextTask guard to avoid type errors
export const isTextTask = (_b: TaskBody): _b is never => false;
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