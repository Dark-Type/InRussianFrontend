import React, { useState, type ReactNode } from "react";
import contentService from "../../services/ContentService.ts";
import taskService from "../../services/TaskService.ts";
import { mediaService } from "../../services/MediaService.ts";
import { ContentContext } from "./ContentContext.ts";
import type { TaskModel } from "../../components/content/task-editor/TaskModels.ts";
import type {
  UpdateTaskRequest,
  UpdateCourseRequest,
  UpdateSectionRequest,
  UpdateThemeRequest,
} from "../../api";
import { axiosInstance } from "../../instances/axiosInstance.ts";

export interface Course {
  id: string;
  name: string;
  description?: string;
  sectionsCount: number;
  themesCount: number;
  tasksCount: number;
  authorUrl?: string;
  language?: string;
  isPublished?: boolean;
  posterId?: string;
}

export interface Section {
  id: string;
  courseId: string;
  name: string;
  description?: string;
  themesCount: number;
  tasksCount: number;
}

export interface Theme {
  id: string;
  sectionId: string;
  name: string;
  description?: string;
  tasksCount: number;
}

export type TaskType =
  | "LISTEN_AND_CHOOSE"
  | "READ_AND_CHOOSE"
  | "LOOK_AND_CHOOSE"
  | "MATCH_AUDIO_TEXT"
  | "MATCH_TEXT_TEXT";

export type ContentType = "AUDIO" | "IMAGE" | "TEXT" | "VIDEO";

export type AnswerType =
  | "SINGLE_CHOICE"
  | "MULTI_CHOICE"
  | "ORDER_WORDS"
  | "SELECT_WORDS"
  | "MATCH_PAIRS"
  | "TEXT_INPUT";

export interface TaskContent {
  id?: string;
  contentId?: string,
  contentType: ContentType;
  description?: string;
  transcription?: string;
  translation?: string;
  orderNum?: number;
  text?: string;
  file?: File;
  url?: string;
}

export interface MatchPair {
  id: string;
  leftItem: {
    type: "TEXT" | "AUDIO";
    content: string;
  };
  rightItem: {
    type: "TEXT";
    content: string;
  };
}

export interface TaskAnswer {
  answerType: AnswerType;
  correctAnswer: any;
  options?: AnswerOption[];
  matchPairs?: MatchPair[];
}

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
  orderNum: number;
}

export interface Task {
  id?: string;
  themeId?: string;
  name: string;
  taskType: TaskType;
  question: string;
  instructions?: string;
  isTraining: boolean;
  orderNum?: number;
  contents: TaskContent[];
  answer: TaskAnswer;
  answerOptions: AnswerOption[];
}

export interface ContentContextType {
  courses: Course[];
  sections: { [courseId: string]: Section[] };
  themes: { [sectionId: string]: Theme[] };
  tasks: { [themeId: string]: Task[] };
  taskModels: { [themeId: string]: TaskModel[] };

  loadCourses: () => Promise<void>;
  loadSections: (courseId: string) => Promise<void>;
  loadThemes: (sectionId: string) => Promise<void>;
  loadTasks: (themeId: string) => Promise<void>;
  loadTaskModels: (themeId: string) => Promise<void>;

  createCourse: (
    name: string,
    description?: string,
    authorUrl?: string,
    language?: string,
    isPublished?: boolean
  ) => Promise<void>;
  createSection: (
    courseId: string,
    name: string,
    description?: string
  ) => Promise<void>;
  createTheme: (
    sectionId: string,
    name: string,
    description?: string
  ) => Promise<void>;

  updateCourse: (
    id: string,
    name: string,
    description?: string
  ) => Promise<void>;
  updateSection: (
    id: string,
    name: string,
    description?: string
  ) => Promise<void>;
  updateTheme: (
    id: string,
    name: string,
    description?: string
  ) => Promise<void>;

  deleteCourse: (id: string) => Promise<void>;
  deleteSection: (id: string) => Promise<void>;
  deleteTheme: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;

  createTask: (
    themeId: string,
    taskData: Omit<Task, "id" | "themeId">
  ) => Promise<Task>;
  updateTask: (
    taskId: string,
    taskData: Partial<Omit<Task, "id" | "themeId">>
  ) => Promise<Task>;
  uploadMediaFile: (file: File) => Promise<string>;

  getContentStats: () => Promise<unknown>;
  getTasksCountByCourse: (courseId: string) => Promise<number>;
  getTasksCountBySection: (sectionId: string) => Promise<number>;
  getTasksCountByTheme: (themeId: string) => Promise<number>;

  isLoadingTasks: boolean;
  isUploadingMedia: boolean;
  isLoadingCourses: boolean;
  isLoadingSections: boolean;
  isLoadingThemes: boolean;
}

const transformApiTaskToTask = (apiTask: any): Task => {
  return {
    id: apiTask.id,
    themeId: apiTask.themeId,
    name: apiTask.name,
    taskType: apiTask.taskType as TaskType,
    question: apiTask.question,
    instructions: apiTask.instructions,
    isTraining: apiTask.isTraining,
    orderNum: apiTask.orderNum,
    contents:
      apiTask.contents?.map((content: any) => ({
        id: content.id,
        contentType: content.contentType as ContentType,
        description: content.description,
        transcription: content.transcription,
        translation: content.translation,
        orderNum: content.orderNum,
        contentId: content.contentId 
      })) || [],
    answer: {
      answerType: (apiTask.answer?.answerType as AnswerType) || "SINGLE_CHOICE",
      correctAnswer: apiTask.answer?.correctAnswer || {},
    },
    answerOptions:
      apiTask.answerOptions?.map((option: any) => ({
        id: option.id,
        optionText: option.optionText,
        isCorrect: option.isCorrect,
        orderNum: option.orderNum,
      })) || [],
  };
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sections, setSections] = useState<{ [courseId: string]: Section[] }>(
    {}
  );
  const [themes, setThemes] = useState<{ [sectionId: string]: Theme[] }>({});
  const [tasks, setTasks] = useState<{ [themeId: string]: Task[] }>({});
  const [taskModels, setTaskModels] = useState<{ [themeId: string]: TaskModel[] }>({});

  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [isLoadingSections, setIsLoadingSections] = useState(false);
  const [isLoadingThemes, setIsLoadingThemes] = useState(false);

  const loadCourses = async () => {
    setIsLoadingCourses(true);
    try {
      const apiCourses = await contentService.getAllCourses();
      setCourses(apiCourses);
    } catch (error) {
      console.error("Ошибка загрузки курсов:", error);
      setCourses([]);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const loadSections = async (courseId: string) => {
    setIsLoadingSections(true);
    try {
      const apiSections = await contentService.getSectionsByCourse(courseId);
      setSections((prev) => ({ ...prev, [courseId]: apiSections }));
    } catch (error) {
      console.error("Ошибка загрузки секций:", error);
      setSections((prev) => ({ ...prev, [courseId]: [] }));
    } finally {
      setIsLoadingSections(false);
    }
  };

  const loadThemes = async (sectionId: string) => {
    setIsLoadingThemes(true);
    try {
      const apiThemes = await contentService.getThemesBySection(sectionId);
      setThemes((prev) => ({ ...prev, [sectionId]: apiThemes }));
    } catch (error) {
      console.error("Ошибка загрузки тем:", error);
      setThemes((prev) => ({ ...prev, [sectionId]: [] }));
    } finally {
      setIsLoadingThemes(false);
    }
  };

  const loadTasks = async (themeId: string) => {
    setIsLoadingTasks(true);
    try {
      const apiTasks = await contentService.getTasksByTheme(themeId);
      const transformedTasks: Task[] = apiTasks.map(transformApiTaskToTask);
      setTasks((prev) => ({ ...prev, [themeId]: transformedTasks }));
    } catch (error) {
      console.error("Ошибка загрузки задач:", error);
      setTasks((prev) => ({ ...prev, [themeId]: [] }));
    } finally {
      setIsLoadingTasks(false);
    }
  };

  // Placeholder: загрузка TaskModel (новые задания редактора)
  const loadTaskModels = async (themeId: string) => {
    setIsLoadingTasks(true);
    try {
      const resp = await axiosInstance.get<TaskModel[]>("/task/theme/" + themeId)
      const items: TaskModel[] = resp.data;
      setTaskModels((prev) => ({ ...prev, [themeId]: items }));
    } catch (error) {
      console.error("Ошибка загрузки TaskModel:", error);
      setTaskModels((prev) => ({ ...prev, [themeId]: [] }));
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const createCourse = async (
    name: string,
    description?: string,
    authorUrl?: string,
    language?: string,
    isPublished?: boolean
  ) => {
    try {
      const defaultAuthorUrl =
        authorUrl ||
        localStorage.getItem("userId") ||
        "0070ecd4-fa1f-4007-bde7-a5399b789fe1";

      const courseData: any = {
        name,
        description: description || "",
        authorUrl: defaultAuthorUrl,
        language: language || "RUSSIAN",
        isPublished: isPublished ?? false,
      };
      const newCourse = await contentService.createCourse(courseData);
      setCourses((prev) => [...prev, newCourse]);
    } catch (error) {
      console.error("Ошибка создания курса:", error);
      throw error;
    }
  };

  const createSection = async (
    courseId: string,
    name: string,
    description?: string
  ) => {
    try {
      const newSection = await contentService.createSection(
        courseId,
        name,
        description || ""
      );
      setSections((prev) => ({
        ...prev,
        [courseId]: [...(prev[courseId] || []), newSection],
      }));
    } catch (error) {
      console.error("Ошибка создания секции:", error);
      throw error;
    }
  };

  const createTheme = async (
    sectionId: string,
    name: string,
    description?: string
  ) => {
    try {
      const newTheme = await contentService.createTheme(
        sectionId,
        name,
        description || ""
      );
      setThemes((prev) => ({
        ...prev,
        [sectionId]: [...(prev[sectionId] || []), newTheme],
      }));
    } catch (error) {
      console.error("Ошибка создания темы:", error);
      throw error;
    }
  };

  const updateCourse = async (
    id: string,
    name: string,
    description?: string
  ) => {
    try {
      const courseData: UpdateCourseRequest = { name, description };
      const apiCourse = await contentService.updateCourse(id, courseData);

      const updatedCourse: Course = {
        id: apiCourse.id,
        name: apiCourse.name,
        description: apiCourse.description,
        sectionsCount: 0,
        themesCount: 0,
        tasksCount: await contentService.getTasksCountByCourse(id),
      };

      setCourses((prev) =>
        prev.map((course) => (course.id === id ? updatedCourse : course))
      );
    } catch (error) {
      console.error("Ошибка обновления курса:", error);
      throw error;
    }
  };

  const updateSection = async (
    id: string,
    name: string,
    description?: string
  ) => {
    try {
      const sectionData: UpdateSectionRequest = { name, description };
      const apiSection = await contentService.updateSection(id, sectionData);

      const updatedSection: Section = {
        id: apiSection.id,
        courseId: apiSection.courseId,
        name: apiSection.name,
        description: apiSection.description,
        themesCount: 0,
        tasksCount: await contentService.getTasksCountBySection(id),
      };

      setSections((prev) => {
        const newSections = { ...prev };
        Object.keys(newSections).forEach((courseId) => {
          newSections[courseId] = newSections[courseId].map((section) =>
            section.id === id ? updatedSection : section
          );
        });
        return newSections;
      });
    } catch (error) {
      console.error("Ошибка обновления секции:", error);
      throw error;
    }
  };

  const updateTheme = async (
    id: string,
    name: string,
    description?: string
  ) => {
    try {
      const themeData: UpdateThemeRequest = { name, description };
      const apiTheme = await contentService.updateTheme(id, themeData);

      const updatedTheme: Theme = {
        id: apiTheme.id,
        sectionId: apiTheme.sectionId,
        name: apiTheme.name,
        description: apiTheme.description,
        tasksCount: await contentService.getTasksCountByTheme(id),
      };

      setThemes((prev) => {
        const newThemes = { ...prev };
        Object.keys(newThemes).forEach((sectionId) => {
          newThemes[sectionId] = newThemes[sectionId].map((theme) =>
            theme.id === id ? updatedTheme : theme
          );
        });
        return newThemes;
      });
    } catch (error) {
      console.error("Ошибка обновления темы:", error);
      throw error;
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await contentService.deleteCourse(id);
      setCourses((prev) => prev.filter((course) => course.id !== id));
      setSections((prev) => {
        const newSections = { ...prev };
        delete newSections[id];
        return newSections;
      });
    } catch (error) {
      console.error("Ошибка удаления курса:", error);
      throw error;
    }
  };

  const deleteSection = async (id: string) => {
    try {
      await contentService.deleteSection(id);
      setSections((prev) => {
        const newSections = { ...prev };
        Object.keys(newSections).forEach((courseId) => {
          newSections[courseId] = newSections[courseId].filter(
            (section) => section.id !== id
          );
        });
        return newSections;
      });
    } catch (error) {
      console.error("Ошибка удаления секции:", error);
      throw error;
    }
  };

  const deleteTheme = async (id: string) => {
    try {
      await contentService.deleteTheme(id);
      setThemes((prev) => {
        const newThemes = { ...prev };
        Object.keys(newThemes).forEach((sectionId) => {
          newThemes[sectionId] = newThemes[sectionId].filter(
            (theme) => theme.id !== id
          );
        });
        return newThemes;
      });
    } catch (error) {
      console.error("Ошибка удаления темы:", error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach((themeId) => {
          newTasks[themeId] = newTasks[themeId].filter(
            (task) => task.id !== id
          );
        });
        return newTasks;
      });
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
      throw error;
    }
  };

  const createTask = async (themeId: string, taskData: any) => {
    try {
      console.log("Отправляемые данные contents:", taskData);
  const createdTask: any = await contentService.createTask(themeId, taskData);
      // Если нужно получить полные данные задачи после создания:
      const fullTask = await contentService.getTaskById(createdTask.id);
      // Обновляем состояние, если нужно
      return fullTask;
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
      throw error;
    }
  };

  const updateTask = async (
    taskId: string,
    taskData: Partial<Omit<Task, "id" | "themeId">>
  ): Promise<Task> => {
    try {
      const updateRequest: UpdateTaskRequest = {};
      if (taskData.name) updateRequest.name = taskData.name;
      if (taskData.question) updateRequest.question = taskData.question;
      if (taskData.instructions !== undefined)
        updateRequest.instructions = taskData.instructions;
      if (taskData.isTraining !== undefined)
        updateRequest.isTraining = taskData.isTraining;
      if (taskData.orderNum !== undefined)
        updateRequest.orderNum = taskData.orderNum;

      const apiTask = await taskService.updateTask(taskId, updateRequest);
      const updatedTask = transformApiTaskToTask(apiTask);

      setTasks((prev) => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach((themeId) => {
          newTasks[themeId] = newTasks[themeId].map((task) =>
            task.id === taskId ? updatedTask : task
          );
        });
        return newTasks;
      });

      return updatedTask;
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
      throw error;
    }
  };

  const uploadMediaFile = async (file: File): Promise<string> => {
    setIsUploadingMedia(true);
    try {
      const userId = localStorage.getItem("userId") || undefined;
      const formData = new FormData();
      formData.append("file", file);
      const mediaInfo = await mediaService.uploadMediaWithMeta(
        formData,
        userId
      );
      return mediaInfo.mediaId;
    } catch (error) {
      console.error("Ошибка загрузки медиафайла:", error);
      throw error;
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const getContentStats = async (): Promise<unknown> => {
    try {
      return await contentService.getContentStats();
    } catch (error) {
      console.error("Ошибка получения статистики:", error);
      throw error;
    }
  };

  const getTasksCountByCourse = async (courseId: string): Promise<number> => {
    try {
      return await contentService.getTasksCountByCourse(courseId);
    } catch (error) {
      console.error("Ошибка получения количества задач курса:", error);
      return 0;
    }
  };

  const getTasksCountBySection = async (sectionId: string): Promise<number> => {
    try {
      return await contentService.getTasksCountBySection(sectionId);
    } catch (error) {
      console.error("Ошибка получения количества задач секции:", error);
      return 0;
    }
  };

  const getTasksCountByTheme = async (themeId: string): Promise<number> => {
    try {
      return await contentService.getTasksCountByTheme(themeId);
    } catch (error) {
      console.error("Ошибка получения количества задач темы:", error);
      return 0;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        courses,
        sections,
        themes,
        tasks,
  taskModels,
        loadCourses,
        loadSections,
        loadThemes,
        loadTasks,
  loadTaskModels,
        createCourse,
        createSection,
        createTheme,
        updateCourse,
        updateSection,
        updateTheme,
        deleteCourse,
        deleteSection,
        deleteTheme,
        deleteTask,
        createTask,
        updateTask,
        uploadMediaFile,
        getContentStats,
        getTasksCountByCourse,
        getTasksCountBySection,
        getTasksCountByTheme,
        isLoadingTasks,
        isUploadingMedia,
        isLoadingCourses,
        isLoadingSections,
        isLoadingThemes,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
