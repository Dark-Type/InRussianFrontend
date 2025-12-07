import { useState, useEffect, useCallback, useRef } from "react";
import expertService from "../../services/ExpertService";
import type { UserStatsDTO } from "../../services/ExpertService";
import { useProfile } from "../../context/profile/UseProfile";
import type { User, UserProfile } from "../../api";
import * as XLSX from "xlsx";

interface UserLanguageSkill {
  language: string;
  understands: boolean;
  speaks: boolean;
  reads: boolean;
  writes: boolean;
}

interface StudentWithProfile extends User {
  profile?: (UserProfile & Record<string, any>) | null; // allow extra dynamic fields like dateOfBirth
  languageSkills?: UserLanguageSkill[];
  avatarUrl?: string;
}

const exportCategories = [
  { key: "Email", label: "Email" },
  { key: "Имя", label: "Имя" },
  { key: "Фамилия", label: "Фамилия" },
  { key: "Отчество", label: "Отчество" },
  { key: "Статус", label: "Статус" },
  { key: "Дата рождения", label: "Дата рождения" },
  { key: "Пол", label: "Пол" },
  { key: "Гражданство", label: "Гражданство" },
  { key: "Национальность", label: "Национальность" },
  { key: "Страна проживания", label: "Страна проживания" },
  { key: "Город проживания", label: "Город проживания" },
  { key: "Образование", label: "Образование" },
  { key: "Цель регистрации", label: "Цель регистрации" },
  { key: "Дата регистрации", label: "Дата регистрации" },
  { key: "Языковые навыки", label: "Языковые навыки" },
];

export const StudentsSection = () => {
  const [students, setStudents] = useState<StudentWithProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [totalLoaded, setTotalLoaded] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const { getAvatarIdByUserId: _unusedGetAvatar } = useProfile();

  const toggleCategory = (key: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) newSet.delete(key);
      else newSet.add(key);
      return newSet;
    });
  };

  const getPrimaryColorWithOpacity = (opacity: number) => {
    const hex =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim() || "#007bff";
    const hexToRgb = (hex: string) => {
      let c = hex.startsWith("#") ? hex.substring(1) : hex;
      if (c.length === 3)
        c = c
          .split("")
          .map((x) => x + x)
          .join("");
      const bigint = parseInt(c, 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const loadStudents = useCallback(
    async (pageNum: number, reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);
      try {
        const studentsWithProfiles =
          await expertService.getStudentsWithProfiles(pageNum, 20);

        if (reset) {
          students.forEach((student) => {
            if (student.avatarUrl && student.avatarUrl.startsWith("blob:")) {
              URL.revokeObjectURL(student.avatarUrl);
            }
          });
          setStudents(studentsWithProfiles);
          setTotalLoaded(studentsWithProfiles.length);
        } else {
          setStudents((prev) => [...prev, ...studentsWithProfiles]);
          setTotalLoaded((prev) => prev + studentsWithProfiles.length);
        }

        setHasMore(
          studentsWithProfiles.length === 20 &&
            totalLoaded + studentsWithProfiles.length < 1000
        );
      } catch (error) {
        console.error("Ошибка загрузки студентов:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, totalLoaded, students]
  );

  const searchStudents = useCallback(
    async (search: string) => {
      if (!search.trim()) {
        setPage(1);
        setTotalLoaded(0);
        setHasMore(true);
        loadStudents(1, true);
        return;
      }

      setSearchLoading(true);
      try {
        const studentsWithProfiles =
          await expertService.getStudentsWithProfiles(1, 200);

        const filtered = studentsWithProfiles.filter(
          (student) =>
            student.email?.toLowerCase().includes(search.toLowerCase()) ||
            student.profile?.name
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            student.profile?.surname
              ?.toLowerCase()
              .includes(search.toLowerCase())
        );

        students.forEach((student) => {
          if (student.avatarUrl && student.avatarUrl.startsWith("blob:")) {
            URL.revokeObjectURL(student.avatarUrl);
          }
        });

        setStudents(filtered);
        setHasMore(false);
      } catch (error) {
        console.error("Ошибка поиска студентов:", error);
      } finally {
        setSearchLoading(false);
      }
    },
    [loadStudents, students]
  );

  const exportToExcel = useCallback(async () => {
    try {
      // Fetch detailed stats for each student sequentially (could be optimized with Promise.all + batching)
      const statsMap: Record<string, UserStatsDTO | null> = {};
      for (const student of students) {
        statsMap[student.id] = await expertService.getUserStats(student.id);
      }

      const exportData = students.map((student) => {
        const stats = statsMap[student.id];
        const courses = stats?.courses || [];
        const flatCourseData: Record<string, string | number> = {};
        courses.forEach((c, cIdx) => {
          const prefix = `Курс ${cIdx + 1} (${c.courseId})`;
          if (c.courseProgress) {
            flatCourseData[`${prefix} Прогресс %`] = Number(c.courseProgress.percent.toFixed(1));
            flatCourseData[`${prefix} Решено`] = c.courseProgress.solvedTasks;
            flatCourseData[`${prefix} Всего задач`] = c.courseProgress.totalTasks;
            flatCourseData[`${prefix} Среднее время (мин)`] = Math.round(c.courseProgress.averageTimeMs / 60000);
          } else {
            // Нет данных по курсу – заполняем нулями
            flatCourseData[`${prefix} Прогресс %`] = 0;
            flatCourseData[`${prefix} Решено`] = 0;
            flatCourseData[`${prefix} Всего задач`] = 0;
            flatCourseData[`${prefix} Среднее время (мин)`] = 0;
          }
          c.sections.forEach((s, sIdx) => {
            const sp = `${prefix} Раздел ${sIdx + 1}`;
            flatCourseData[`${sp} %`] = Number(s.percent.toFixed(1));
            flatCourseData[`${sp} Решено`] = s.solvedTasks;
            flatCourseData[`${sp} Всего`] = s.totalTasks;
            flatCourseData[`${sp} Ср.время(мин)`] = Math.round(s.averageTimeMs / 60000);
          });
        });

        return {
        Email: student.email || "",
        Имя: student.profile?.name || "",
        Фамилия: student.profile?.surname || "",
        Отчество: student.profile?.patronymic || "",
        Статус: student.status || "",
        "Дата рождения": (student.profile as any)?.dateOfBirth
          ? formatDate((student.profile as any).dateOfBirth)
          : "",
        Пол: student.profile?.gender || "",
        Гражданство: student.profile?.citizenship || "",
        Национальность: student.profile?.nationality || "",
        "Страна проживания": student.profile?.countryOfResidence || "",
        "Город проживания": student.profile?.cityOfResidence || "",
        Образование: student.profile?.education || "",
        "Цель регистрации": student.profile?.purposeOfRegister || "",
        "Дата регистрации": new Date(student.createdAt).toLocaleDateString(
          "ru-RU"
        ),
        "Языковые навыки":
          student.languageSkills
            ?.map(
              (skill) =>
                `${skill.language} (${[
                  skill.understands ? "понимает" : "",
                  skill.speaks ? "говорит" : "",
                  skill.reads ? "читает" : "",
                  skill.writes ? "пишет" : "",
                ]
                  .filter(Boolean)
                  .join(", ")})`
            )
            .join("; ") || "",
        ...flatCourseData
      };});

      const filteredData = exportData.map((row) => {
        if (selectedCategories.size === 0) return {};
        const filteredRow: Record<string, string> = {};
        selectedCategories.forEach((key) => {
          filteredRow[key] = row[key as keyof typeof row] || "";
        });
        return filteredRow;
      });

      if (
        filteredData.length === 0 ||
        filteredData.every((row) => Object.keys(row).length === 0)
      ) {
        alert("Выберите хотя бы один столбец для экспорта");
        return;
      }

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(filteredData);

      const keysToMeasure = Array.from(selectedCategories);
      const colWidths = keysToMeasure.map((key) => ({
        wch: Math.max(
          key.length,
          ...exportData.map((row) => String((row as any)[key]).length)
        ),
      }));
      ws["!cols"] = colWidths;

      XLSX.utils.book_append_sheet(wb, ws, "Студенты");

      XLSX.writeFile(
        wb,
        `students_export_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Ошибка экспорта:", error);
    }
  }, [students, selectedCategories]);

  useEffect(() => {
    loadStudents(1, true);
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm) {
        searchStudents(searchTerm);
      } else {
        setPage(1);
        setTotalLoaded(0);
        setHasMore(true);
        loadStudents(1, true);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm && page > 1) {
      loadStudents(page);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    return () => {
      students.forEach((student) => {
        if (student.avatarUrl && student.avatarUrl.startsWith("blob:")) {
          URL.revokeObjectURL(student.avatarUrl);
        }
      });
    };
  }, []);

  const lastStudentCallback = useCallback(
    (node: HTMLDivElement) => {
      if (loading || searchTerm || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, searchTerm]
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}.${year}`;
    }

    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const renderCategoryToggles = () => {
    const primaryColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim() || "#007bff";
    const primaryColorTransparent = getPrimaryColorWithOpacity(0.3);

    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}
      >
        {exportCategories.map(({ key, label }) => {
          const selected = selectedCategories.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleCategory(key)}
              style={{
                cursor: "pointer",
                padding: "6px 14px",
                fontSize: "0.9rem",
                borderRadius: 6,
                border: selected ? `2px solid ${primaryColor}` : "transparent",
                backgroundColor: selected
                  ? primaryColorTransparent
                  : "transparent",
                color: selected ? primaryColor : "var(--color-text, #000)",
                userSelect: "none",
                transition: "all 0.3s ease",
                fontWeight: 500,
                outline: "none",
              }}
              aria-pressed={selected}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  };

  const renderStudentCard = (student: StudentWithProfile, index: number) => {
    const isLast = index === students.length - 1 && hasMore && !searchTerm;
    return (
      <div
        key={student.id}
        ref={isLast ? lastStudentCallback : undefined}
        style={{
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "1.1rem" }}>
              {student.profile?.surname || student.profile?.name
                ? `${student.profile.surname || ""} ${
                    student.profile.name || ""
                  } ${student.profile.patronymic || ""}`.trim()
                : student.email}
            </h4>
            <p
              style={{ margin: "4px 0", color: "var(--color-text-secondary)" }}
            >
              Email: {student.email}
            </p>
            <p
              style={{ margin: "4px 0", color: "var(--color-text-secondary)" }}
            >
              Статус: {student.status}
            </p>
            <p
              style={{ margin: "4px 0", color: "var(--color-text-secondary)" }}
            >
              Дата регистрации: {formatDate(student.createdAt)}
            </p>
            {student.profile && (
              <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                <span style={{ fontSize: "0.9rem" }}>
                  Пол:{" "}
                  {student.profile.gender === "MALE"
                    ? "Мужской"
                    : student.profile.gender === "FEMALE"
                    ? "Женский"
                    : "Не указан"}
                </span>
                <span style={{ fontSize: "0.9rem" }}>
                  Образование: {student.profile.education || "Не указано"}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() =>
              setSelectedStudentId(
                selectedStudentId === student.id ? null : student.id
              )
            }
            style={{
              padding: "8px 16px",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {selectedStudentId === student.id ? "Скрыть" : "Подробнее"}
          </button>
        </div>

        {selectedStudentId === student.id && (
          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              background: "var(--color-bg)",
              borderRadius: "8px",
            }}
          >
            <h5>Детальная информация</h5>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <strong>Личные данные:</strong>
        {(student.profile as any)?.dateOfBirth && (
                  <div>
                    <span style={{ fontWeight: "500" }}>Дата рождения:</span>
          {formatDate((student.profile as any).dateOfBirth)}
                  </div>
                )}
                <p>
                  Гражданство: {student.profile?.citizenship || "Не указано"}
                </p>
                <p>
                  Национальность: {student.profile?.nationality || "Не указано"}
                </p>
                <p>
                  Страна проживания:{" "}
                  {student.profile?.countryOfResidence || "Не указано"}
                </p>
                <p>
                  Город проживания:{" "}
                  {student.profile?.cityOfResidence || "Не указано"}
                </p>
                <p>Образование: {student.profile?.education || "Не указано"}</p>
                <p>
                  Цель регистрации:{" "}
                  {student.profile?.purposeOfRegister || "Не указана"}
                </p>
              </div>
              <div>
                <strong>Языковые навыки:</strong>
                {student.languageSkills && student.languageSkills.length > 0 ? (
                  <div style={{ marginTop: "8px" }}>
                    {student.languageSkills.map((skill, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "12px",
                          padding: "8px",
                          background: "var(--color-card)",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        <div
                          style={{ fontWeight: "bold", marginBottom: "4px" }}
                        >
                          {skill.language}
                        </div>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "4px",
                          }}
                        >
                          <span>Понимает: {skill.understands ? "✓" : "✗"}</span>
                          <span>Говорит: {skill.speaks ? "✓" : "✗"}</span>
                          <span>Читает: {skill.reads ? "✓" : "✗"}</span>
                          <span>Пишет: {skill.writes ? "✓" : "✗"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      marginTop: "8px",
                      fontStyle: "italic",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Языковые навыки не указаны
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "12px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Поиск студентов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px",
            background: "var(--text-color)",
            border: "2px solid var(--color-border)",
            borderRadius: "6px",
            fontSize: "1rem",
            flex: "1 1 300px",
            maxWidth: "400px",
          }}
        />
        <button
          onClick={exportToExcel}
          style={{
            padding: "12px 16px",
            background: "var(--color-success, #28a745)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
          }}
          title="Экспорт выбранных полей в Excel"
        >
          Экспорт в Excel
        </button>
      </div>

      {renderCategoryToggles()}

      <div>
        {students.map((student, index) => renderStudentCard(student, index))}
      </div>

      {(loading || searchLoading) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "2px solid var(--color-border)",
              borderTop: "2px solid var(--color-primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}

      {!hasMore && !searchTerm && students.length > 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "var(--color-text-secondary)",
            fontSize: "0.9rem",
          }}
        >
          Загружено студентов: {students.length}
        </div>
      )}

      {!loading && students.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "var(--color-text-secondary)",
            fontSize: "1rem",
          }}
        >
          Студенты не найдены
        </div>
      )}
    </div>
  );
};
