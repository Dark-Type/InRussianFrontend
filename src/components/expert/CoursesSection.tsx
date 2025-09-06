import { useState, useEffect } from "react";
import expertService from "../../services/ExpertService";
import { axiosInstance } from "../../instances/axiosInstance.ts";
import type { TaskModel } from "../content/task-editor/TaskModels";
import TaskEditorModal from "../content/task-editor/TaskEditorModal";
import { taskTypesToRu } from "../content/task-editor/TaskModels";
import type { ThemeTreeNode } from '../../context/content/ContentProvider';
import type {
  Course,
  TaskWithDetails,
  CountStats,
} from "../../api";

interface ExtendedCourse extends Course {
  themesCount: number;
  tasksCount: number;
  enrolledStudents: number;
}

export const CoursesSection = () => {
  const [courses, setCourses] = useState<ExtendedCourse[]>([]);
  const [themeTree, setThemeTree] = useState<{
    [courseId: string]: ThemeTreeNode[];
  }>({});
  const [tasks] = useState<{ [themeId: string]: TaskWithDetails[] }>(
    {}
  );
  const [taskModels, setTaskModels] = useState<{ [themeId: string]: TaskModel[] }>({});
  const [previewTask, setPreviewTask] = useState<TaskModel | null>(null);
  const [previewThemeId, setPreviewThemeId] = useState<string | null>(null);
  const [contentStats, setContentStats] = useState<CountStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskWithDetails | null>(
    null
  );

  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedThemes, setExpandedThemes] = useState<{ [themeId: string]: boolean }>(
    {}
  );

  useEffect(() => {
    loadAllData();
    loadContentStats();
  }, []);

  const loadContentStats = async () => {
    try {
      const stats = await expertService.getContentStats();
      setContentStats(stats);
    } catch (error) {
      console.error("Ошибка загрузки статистики контента:", error);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const coursesData = await expertService.getAllCourses();
      const coursesWithCounts: ExtendedCourse[] = [];

      for (const course of coursesData) {
        // Load theme tree for this course
        const response = await axiosInstance.get(`/content/courses/${course.id}/theme-tree`);
        const treeData = Array.isArray(response.data) ? response.data : [response.data];
        
        // Count total themes and tasks recursively
        const countThemesAndTasks = async (nodes: ThemeTreeNode[]): Promise<{ themes: number, tasks: number }> => {
          let themeCount = 0;
          let taskCount = 0;
          
          for (const node of nodes) {
            themeCount += 1;
            // Load tasks for this theme
            const themeTasks = await expertService.getTasksByTheme(node.theme.id);
            taskCount += themeTasks.length;
            
            // Recursively count children
            if (node.children && node.children.length > 0) {
              const childCounts = await countThemesAndTasks(node.children);
              themeCount += childCounts.themes;
              taskCount += childCounts.tasks;
            }
          }
          
          return { themes: themeCount, tasks: taskCount };
        };

        const { themes: totalThemesCount, tasks: totalTasksCount } = await countThemesAndTasks(treeData);
        
        const enrolledStudents = await expertService.getCourseStudentsCount(course.id);

        coursesWithCounts.push({
          ...course,
          themesCount: totalThemesCount,
          tasksCount: totalTasksCount,
          enrolledStudents,
        });

        // Store the theme tree
        setThemeTree(prev => ({ ...prev, [course.id]: treeData }));
      }

      setCourses(coursesWithCounts);
    } catch (error) {
      console.error("Ошибка загрузки данных курсов:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderThemeTree = (nodes: ThemeTreeNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.theme.id} style={{ marginBottom: "8px" }}>
        <div
          onClick={() => handleThemeClick(node.theme.id)}
          style={{
            padding: "10px",
            marginLeft: `${level * 24}px`,
            cursor: "pointer",
            background:
              expandedThemes[node.theme.id]
                ? "var(--color-bg)"
                : "var(--color-card)",
            borderRadius: "4px",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h5 style={{ margin: "0 0 2px 0" }}>
                {node.theme.name}
              </h5>
              <p
                style={{
                  margin: "0",
                  color: "var(--color-text-secondary)",
                  fontSize: "0.75rem",
                }}
              >
                {node.theme.description}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                {node.children && node.children.length > 0 ? `${node.children.length} подтем` : ''}
              </span>
              {(node.children && node.children.length > 0) && (
                <span
                  style={{
                    fontSize: "0.9rem",
                    transform:
                      expandedThemes[node.theme.id]
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ▶
                </span>
              )}
            </div>
          </div>
        </div>

        {expandedThemes[node.theme.id] && (
          <div
            style={{
              padding: "0 0 0 24px",
              marginTop: "8px",
            }}
          >
            {/* Only show tasks section if theme has no children */}
            {(!node.children || node.children.length === 0) && (
              <>
                {/* Новые задания (TaskModel) */}
                <h6
                  style={{
                    margin: "0 0 8px 0",
                    fontWeight: 600,
                  }}
                >
                  Задания:
                </h6>
                {taskModels[node.theme.id] && taskModels[node.theme.id].length > 0 ? (
                  taskModels[node.theme.id].map((tm) => (
                    <div
                      key={tm.id}
                      style={{
                        padding: "8px 12px",
                        marginBottom: "4px",
                        background: "var(--color-bg)",
                        borderRadius: "4px",
                        border: "1px solid var(--color-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => { setPreviewTask(tm); setPreviewThemeId(String(node.theme.id)); }}
                    >
                      <div>
                        <div style={{ fontWeight: 500 }}>
                          {tm.question || "Без вопроса"}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {tm.taskType && tm.taskType.length > 0
                            ? taskTypesToRu(tm.taskType)
                            : "Типы не указаны"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Заданий нет
                  </div>
                )}

                {/* Старые задачи */}
                {tasks[node.theme.id] && tasks[node.theme.id].length > 0 && (
                  <div style={{ marginTop: 10 }}>
                    <h6
                      style={{
                        margin: "0 0 8px 0",
                        fontWeight: 600,
                      }}
                    >
                      Старые задачи:
                    </h6>
                    {tasks[node.theme.id].map((task) => (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        style={{
                          padding: "8px 12px",
                          marginBottom: "4px",
                          cursor: "pointer",
                          background: "var(--color-bg)",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 500 }}>
                            {task.name || "Задача без названия"}
                          </div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--color-text-secondary)",
                            }}
                          >
                            {task.taskType} {task.isTraining && "(Тренировка)"}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          #{task.orderNum !== undefined ? task.orderNum : "?"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Render children themes */}
            {node.children && node.children.length > 0 && (
              <div style={{ marginTop: "8px" }}>
                {renderThemeTree(node.children, level + 1)}
              </div>
            )}
          </div>
        )}
      </div>
    ));
  };

  const handleCourseClick = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      setExpandedThemes({});
    } else {
      setExpandedCourse(courseId);
      setExpandedThemes({});
    }
  };

  const handleThemeClick = (themeId: string) => {
    setExpandedThemes(prev => ({
      ...prev,
      [themeId]: !prev[themeId]
    }));
    
    if (!taskModels[themeId]) {
      loadTaskModels(themeId);
    }
  };

  const loadTaskModels = async (themeId: string) => {
    try {
      const resp = await axiosInstance.get<TaskModel[]>(`/task/theme/${themeId}`);
      setTaskModels((prev) => ({ ...prev, [themeId]: resp.data || [] }));
    } catch (error) {
      console.error(`Ошибка загрузки TaskModel для темы ${themeId}:`, error);
      setTaskModels((prev) => ({ ...prev, [themeId]: [] }));
    }
  };

  const renderTaskPopup = () => {
    if (!selectedTask) return null;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "var(--color-card)",
            padding: "24px",
            borderRadius: "12px",
            maxWidth: "800px",
            maxHeight: "80vh",
            overflow: "auto",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3 style={{ margin: 0 }}>Просмотр задачи</h3>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                style={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Название задачи:
              </label>
              <div
                style={{
                  padding: "8px",
                  background: "var(--color-bg)",
                  borderRadius: "4px",
                }}
              >
                {selectedTask.name || "Без названия"}
              </div>
            </div>

            <div>
              <label
                style={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Описание:
              </label>
              <div
                style={{
                  padding: "8px",
                  background: "var(--color-bg)",
                  borderRadius: "4px",
                  minHeight: "60px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedTask.instructions || "Описание отсутствует"}
              </div>
            </div>

            <div>
              <label
                style={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Содержание задачи:
              </label>
              <div
                style={{
                  padding: "8px",
                  background: "var(--color-bg)",
                  borderRadius: "4px",
                  minHeight: "100px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedTask.content && selectedTask.content.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {selectedTask.content.map((c) => (
                      <div key={c.id} style={{ padding: 8, background: "var(--color-bg)", borderRadius: 4, border: "1px solid var(--color-border)" }}>
                        <div style={{ fontWeight: 600 }}>{c.contentType}</div>
                        {(c.description || c.transcription || c.translation) && (
                          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.85rem" }}>
                            {[c.description, c.transcription, c.translation].filter(Boolean).join(" · ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  "Содержание отсутствует"
                )}
              </div>
            </div>

            {selectedTask.answerOptions &&
              selectedTask.answerOptions.length > 0 && (
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Варианты ответов:
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {selectedTask.answerOptions.map((option, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "8px",
                          background: "var(--color-bg)",
                          borderRadius: "4px",
                          border: option.isCorrect
                            ? "2px solid #28a745"
                            : "1px solid var(--color-border)",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: option.isCorrect ? "bold" : "normal",
                          }}
                        >
                          {String.fromCharCode(65 + index)}. {option.optionText}
                          {option.isCorrect && (
                            <span
                              style={{ color: "#28a745", marginLeft: "8px" }}
                            >
                              ✓ Правильный ответ
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {selectedTask.answer && (
              <div>
                <label
                  style={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Ответ:
                </label>
                <div
                  style={{
                    padding: "8px",
                    background: "var(--color-bg)",
                    borderRadius: "4px",
                    border: "2px solid #28a745",
                  }}
                >
                  {selectedTask.answer?.answerType || ""}
                </div>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Тип задачи:
                </label>
                <div
                  style={{
                    padding: "8px",
                    background: "var(--color-bg)",
                    borderRadius: "4px",
                  }}
                >
                  {selectedTask.taskType || "Не указан"}
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Порядковый номер:
                </label>
                <div
                  style={{
                    padding: "8px",
                    background: "var(--color-bg)",
                    borderRadius: "4px",
                  }}
                >
                  {selectedTask.orderNum !== undefined
                    ? selectedTask.orderNum
                    : "Не указан"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid var(--color-border)",
            borderTop: "3px solid var(--color-primary)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
  {/* Preview modal is rendered below to ensure themeId is provided */}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ margin: 0 }}>Управление курсами</h2>
        {contentStats && (
          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
            }}
          >
            <span>Курсов: {contentStats.coursesCount || 0}</span>
            <span>Тем: {contentStats.themesCount || 0}</span>
            <span>Задач: {contentStats.tasksCount || 0}</span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <div
                onClick={() => handleCourseClick(course.id)}
                style={{
                  padding: "16px",
                  cursor: "pointer",
                  background:
                    expandedCourse === course.id
                      ? "var(--color-bg)"
                      : "transparent",
                  borderBottom:
                    expandedCourse === course.id
                      ? "1px solid var(--color-border)"
                      : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 8px 0" }}>{course.name}</h3>
                    <p
                      style={{
                        margin: "0",
                        color: "var(--color-text-secondary)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {course.description}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {course.themesCount} тем | {course.tasksCount} задач | {course.enrolledStudents}{" "}
                      студентов
                    </span>
                    <span
                      style={{
                        fontSize: "1.2rem",
                        transform:
                          expandedCourse === course.id
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    >
                      ▶
                    </span>
                  </div>
                </div>
              </div>

              {expandedCourse === course.id && themeTree[course.id] && (
                <div style={{ padding: "0 16px 16px 32px" }}>
                  {renderThemeTree(themeTree[course.id])}
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "var(--color-text-secondary)",
            }}
          >
            Курсы не найдены
          </div>
        )}
      </div>

      {renderTaskPopup()}

      {previewTask && previewThemeId && (
        <TaskEditorModal
          isOpen={!!previewTask}
          onClose={() => { setPreviewTask(null); setPreviewThemeId(null); }}
          readOnly
          initialTask={previewTask}
          themeId={previewThemeId}
        />
      )}
    </div>
  );
};
