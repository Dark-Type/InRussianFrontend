import { useState, useEffect } from "react";
import expertService from "../../services/ExpertService";
import type {
  Course,
  Section,
  Theme,
  TaskWithDetails,
  CountStats,
} from "../../api";

interface ExtendedCourse extends Course {
  sectionsCount: number;
  themesCount: number;
  tasksCount: number;
  enrolledStudents: number;
}

interface ExtendedSection extends Section {
  themesCount: number;
  tasksCount: number;
}

interface ExtendedTheme extends Theme {
  tasksCount: number;
}

export const CoursesSection = () => {
  const [courses, setCourses] = useState<ExtendedCourse[]>([]);
  const [sections, setSections] = useState<{
    [courseId: string]: ExtendedSection[];
  }>({});
  const [themes, setThemes] = useState<{
    [sectionId: string]: ExtendedTheme[];
  }>({});
  const [tasks, setTasks] = useState<{ [themeId: string]: TaskWithDetails[] }>(
    {}
  );
  const [contentStats, setContentStats] = useState<CountStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskWithDetails | null>(
    null
  );

  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

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
      const allSections: { [courseId: string]: ExtendedSection[] } = {};
      const allThemes: { [sectionId: string]: ExtendedTheme[] } = {};
      const allTasks: { [themeId: string]: TaskWithDetails[] } = {};

      for (const course of coursesData) {
        const sectionsData = await expertService.getSectionsByCourse(course.id);
        const sectionsWithCounts: ExtendedSection[] = [];

        let totalThemesCount = 0;
        let totalTasksCount = 0;

        for (const section of sectionsData) {
          const themesData = await expertService.getThemesBySection(section.id);
          const themesWithCounts: ExtendedTheme[] = [];

          let sectionTasksCount = 0;

          for (const theme of themesData) {
            const tasksData = await expertService.getTasksByTheme(theme.id);
            allTasks[theme.id] = tasksData;

            themesWithCounts.push({
              ...theme,
              tasksCount: tasksData.length,
            });

            sectionTasksCount += tasksData.length;
          }

          sectionsWithCounts.push({
            ...section,
            themesCount: themesData.length,
            tasksCount: sectionTasksCount,
          });

          allThemes[section.id] = themesWithCounts;
          totalThemesCount += themesData.length;
          totalTasksCount += sectionTasksCount;
        }

        const enrolledStudents = await expertService.getCourseStudentsCount(
          course.id
        );

        coursesWithCounts.push({
          ...course,
          sectionsCount: sectionsData.length,
          themesCount: totalThemesCount,
          tasksCount: totalTasksCount,
          enrolledStudents,
        });

        allSections[course.id] = sectionsWithCounts;
      }

      setCourses(coursesWithCounts);
      setSections(allSections);
      setThemes(allThemes);
      setTasks(allTasks);
    } catch (error) {
      console.error("Ошибка загрузки данных курсов:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      setExpandedSection(null);
      setExpandedTheme(null);
    } else {
      setExpandedCourse(courseId);
      setExpandedSection(null);
      setExpandedTheme(null);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
      setExpandedTheme(null);
    } else {
      setExpandedSection(sectionId);
      setExpandedTheme(null);
    }
  };

  const handleThemeClick = (themeId: string) => {
    if (expandedTheme === themeId) {
      setExpandedTheme(null);
    } else {
      setExpandedTheme(themeId);
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
            <button
              onClick={() => setSelectedTask(null)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
              }}
            >
              ×
            </button>
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
                {selectedTask.title || "Без названия"}
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
                {selectedTask.description || "Описание отсутствует"}
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
                {selectedTask.content || "Содержание отсутствует"}
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
                          {String.fromCharCode(65 + index)}. {option.text}
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
                  {selectedTask.answer}
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
                  {selectedTask.type || "Не указан"}
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
                  {selectedTask.orderIndex !== undefined
                    ? selectedTask.orderIndex + 1
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
            <span>Разделов: {contentStats.sectionsCount || 0}</span>
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
                      {course.sectionsCount} разделов | {course.themesCount} тем
                      | {course.tasksCount} задач | {course.enrolledStudents}{" "}
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

              {expandedCourse === course.id && sections[course.id] && (
                <div style={{ padding: "0 16px 16px 32px" }}>
                  {sections[course.id].map((section) => (
                    <div key={section.id} style={{ marginBottom: "12px" }}>
                      <div
                        onClick={() => handleSectionClick(section.id)}
                        style={{
                          padding: "12px",
                          cursor: "pointer",
                          background:
                            expandedSection === section.id
                              ? "var(--color-bg)"
                              : "var(--color-card)",
                          borderRadius: "6px",
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
                            <h4 style={{ margin: "0 0 4px 0" }}>
                              {section.title}
                            </h4>
                            <p
                              style={{
                                margin: "0",
                                color: "var(--color-text-secondary)",
                                fontSize: "0.8rem",
                              }}
                            >
                              {section.description}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.8rem",
                                color: "var(--color-text-secondary)",
                              }}
                            >
                              {section.themesCount} тем | {section.tasksCount}{" "}
                              задач
                            </span>
                            <span
                              style={{
                                fontSize: "1rem",
                                transform:
                                  expandedSection === section.id
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

                      {expandedSection === section.id && themes[section.id] && (
                        <div
                          style={{ padding: "0 0 0 24px", marginTop: "8px" }}
                        >
                          {themes[section.id].map((theme) => (
                            <div key={theme.id} style={{ marginBottom: "8px" }}>
                              <div
                                onClick={() => handleThemeClick(theme.id)}
                                style={{
                                  padding: "10px",
                                  cursor: "pointer",
                                  background:
                                    expandedTheme === theme.id
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
                                      {theme.title}
                                    </h5>
                                    <p
                                      style={{
                                        margin: "0",
                                        color: "var(--color-text-secondary)",
                                        fontSize: "0.75rem",
                                      }}
                                    >
                                      {theme.description}
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
                                      {theme.tasksCount} задач
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "0.9rem",
                                        transform:
                                          expandedTheme === theme.id
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

                              {expandedTheme === theme.id &&
                                tasks[theme.id] && (
                                  <div
                                    style={{
                                      padding: "0 0 0 24px",
                                      marginTop: "8px",
                                    }}
                                  >
                                    <h6
                                      style={{
                                        margin: "0 0 8px 0",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Задачи:
                                    </h6>
                                    {tasks[theme.id].map((task) => (
                                      <div
                                        key={task.id}
                                        onClick={() => setSelectedTask(task)}
                                        style={{
                                          padding: "8px 12px",
                                          marginBottom: "4px",
                                          cursor: "pointer",
                                          background: "var(--color-bg)",
                                          borderRadius: "4px",
                                          border:
                                            "1px solid var(--color-border)",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div>
                                          <div style={{ fontWeight: 500 }}>
                                            {task.title ||
                                              task.name ||
                                              "Задача без названия"}
                                          </div>
                                          <div
                                            style={{
                                              fontSize: "0.8rem",
                                              color:
                                                "var(--color-text-secondary)",
                                            }}
                                          >
                                            {task.type || task.taskType}{" "}
                                            {task.isTraining && "(Тренировка)"}
                                          </div>
                                        </div>
                                        <span
                                          style={{
                                            fontSize: "0.9rem",
                                            color:
                                              "var(--color-text-secondary)",
                                          }}
                                        >
                                          #
                                          {task.orderIndex !== undefined
                                            ? task.orderIndex + 1
                                            : "?"}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
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
    </div>
  );
};
