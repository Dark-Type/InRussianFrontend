import { useEffect, useMemo, useState } from "react";
import ExpertService from "../../services/ExpertService";
import type { Course, User } from "../../api";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const styles = {
  container: { padding: 20, fontFamily: "Inter, Roboto, Arial, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  title: { fontSize: 22, fontWeight: 700 },
  sectionTitle: { fontSize: 18, fontWeight: 700, margin: "18px 0 8px" },
  cardsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 18 },
  card: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
  },
  bigStat: { fontSize: 28, fontWeight: 800, marginTop: 6 },
  muted: { color: "var(--color-text-secondary)" },
  select: { padding: 12, borderRadius: 8, border: "1px solid var(--color-border)", minWidth: 260 },
  studentsHeaderBig: { fontSize: 20, fontWeight: 800, margin: "12px 0" },
  toggleGroup: { display: "flex", gap: 8 },
  toggleButton: (active = false) => ({
    padding: "8px 12px",
    borderRadius: 8,
    border: active ? "1px solid #2b8a3e" : "1px solid rgba(255,255,255,0.06)",
    background: active ? "rgba(40,167,69,0.08)" : "transparent",
    cursor: "pointer",
    color: "var(--color-text)",
    outline: "none"
  }),
  table: { width: "100%", borderCollapse: "collapse", marginTop: 12 },
  th: { textAlign: "left", padding: "10px 8px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 14 },
  td: { padding: "4px 8px", borderBottom: "1px solid rgba(255,255,255,0.02)" },
  pill: { display: "inline-block", padding: "4px 8px", borderRadius: 999, fontSize: 12, background: "rgba(0,0,0,0.06)" },
  footerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  btn: { padding: "8px 12px", borderRadius: 8, cursor: "pointer", border: "none", color: "var(--color-text)", background: "var(--color-card)" },
};

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}м`;
};

const studentEnrolledInCourse = (s: any, courseId: string) => {
  if (!courseId) return false;
  if (!s) return false;
  if (s.courseId && String(s.courseId) === String(courseId)) return true;
  if (Array.isArray(s.courses) && s.courses.some((c: any) => String(c.id || c.courseId || c) === String(courseId))) return true;
  if (Array.isArray(s.enrollments) && s.enrollments.some((en: any) => String(en.courseId || en.course?.id) === String(courseId))) return true;
  if (s.profile && Array.isArray((s.profile as any).courses) && (s.profile as any).courses.some((c: any) => String(c.id) === String(courseId))) return true;
  return false;
};

export const StatisticsSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [avgProgress, setAvgProgress] = useState<number | null>(null);
  const [avgTimeMinutes, setAvgTimeMinutes] = useState<number | null>(null);
  const [courseStudentsCount, setCourseStudentsCount] = useState<number | null>(null);

  const [overallAvgProgress, setOverallAvgProgress] = useState<number | null>(null);
  const [overallAvgTime, setOverallAvgTime] = useState<number | null>(null);
  const [overallStudentsCount, setOverallStudentsCount] = useState<number | null>(null);
  const [students, setStudents] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState<number>(10);
  const [totalStudents, setTotalStudents] = useState<number>(0);

  const [viewMode, setViewMode] = useState<"all" | "byCourse">("all");

  useEffect(() => {
    let cancelled = false;
    const loadInit = async () => {
      try {
        const [coursesResp, overallProg, overallTime, studentsCount] = await Promise.all([
          ExpertService.getAllCourses(),
          ExpertService.getOverallAverageProgress(),
          ExpertService.getOverallAverageTime(),
          ExpertService.getStudentsCount(),
        ]);

        
        if (cancelled) return;
        
        setCourses(coursesResp || []);
        setOverallAvgProgress(typeof overallProg === "number" ? overallProg : parseFloat(String(overallProg)) || 0);
        setOverallAvgTime(typeof overallTime === "number" ? overallTime : parseFloat(String(overallTime)) || 0);
        setOverallStudentsCount(typeof studentsCount === "number" ? studentsCount : parseInt(String(studentsCount), 10) || 0);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Не удалось загрузить общую информацию");
      }
    };

    loadInit();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!selectedCourseId) {
      setAvgProgress(null);
      setAvgTimeMinutes(null);
      setCourseStudentsCount(null);
      return;
    }

    let cancelled = false;
    setLoadingStats(true);
    setError(null);

    const loadCourseStats = async () => {
      try {
        const [progress, time, studentsCount] = await Promise.all([
          ExpertService.getCourseAverageProgress(selectedCourseId),
          ExpertService.getCourseAverageTime(selectedCourseId),
          ExpertService.getCourseStudentsCount(selectedCourseId),
        ]);

        if (cancelled) return;
        setAvgProgress(typeof progress === "number" ? progress : parseFloat(String(progress)) || 0);
        setAvgTimeMinutes(typeof time === "number" ? time : parseFloat(String(time)) || 0);
        setCourseStudentsCount(typeof studentsCount === "number" ? studentsCount : parseInt(String(studentsCount), 10) || 0);
        if (viewMode === "byCourse") {
          setTotalStudents(typeof studentsCount === "number" ? studentsCount : parseInt(String(studentsCount), 10) || 0);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Ошибка загрузки статистики по курсу");
        setAvgProgress(null);
        setAvgTimeMinutes(null);
        setCourseStudentsCount(null);
      } finally {
        if (!cancelled) setLoadingStats(false);
      }
    };

    loadCourseStats();
    return () => {
      cancelled = true;
    };
  }, [selectedCourseId, viewMode]);

  useEffect(() => {
    let cancelled = false;
    setLoadingStudents(true);
    setError(null);

    const loadStudents = async () => {
      try {
        if (viewMode === "all") {
          const res = await ExpertService.getAllStudents(page, size);
          const total = await ExpertService.getStudentsCount();
          if (cancelled) return;
          setStudents(res || []);
          setTotalStudents(typeof total === "number" ? total : parseInt(String(total), 10) || 0);
        } else {
          const res = await ExpertService.getAllStudents(0, 1000);
          if (cancelled) return;
          const filtered = (res || []).filter((s: any) => studentEnrolledInCourse(s, selectedCourseId));
          // local pagination for filtered array:
          const start = page * size;
          const paged = filtered.slice(start, start + size);
          setStudents(paged);
          setTotalStudents(filtered.length);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Ошибка загрузки студентов");
        setStudents([]);
        setTotalStudents(0);
      } finally {
        if (!cancelled) setLoadingStudents(false);
      }
    };

    if (viewMode === "byCourse" && !selectedCourseId) {
      setStudents([]);
      setTotalStudents(0);
      setLoadingStudents(false);
      return;
    }

    loadStudents();
    return () => {
      cancelled = true;
    };
  }, [viewMode, selectedCourseId, page, size]);

  const hasCourseStats = useMemo(() => {
    return avgProgress !== null || avgTimeMinutes !== null || (courseStudentsCount !== null && courseStudentsCount > 0);
  }, [avgProgress, avgTimeMinutes, courseStudentsCount]);

  const getStudentName = (s: any) => {
    const prof = s.profile;
    if (prof) {
      if (prof.fullName) return prof.fullName;
      if (prof.firstName || prof.lastName) return `${prof.firstName ?? ""} ${prof.lastName ?? ""}`.trim();
    }
    return s.email || s.username || s.id;
  };
  const getLastActivity = (s: any) => {
    return s.lastActiveAt || s.updatedAt || (s.profile && s.profile.lastActiveAt) || "—";
  };

  const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

  const pagesCount = Math.max(1, Math.ceil((totalStudents || 0) / size));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Статистика </div>
          <div style={{ marginTop: 6, color: "var(--color-text-secondary)" }}>Обзор по курсам и студентам</div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>Всего студентов (всех курсов)</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{overallStudentsCount ?? "—"}</div>
          </div>
      </div>

      {/* OVERALL CARDS */}
      <div style={styles.cardsRow}>
        <div style={styles.card}>
          <div className={""}>Средний прогресс (всех курсов)</div>
          <div style={styles.bigStat}>{overallAvgProgress !== null ? `${Number(overallAvgProgress).toFixed(1)}%` : "—"}</div>
        </div>

        <div style={styles.card}>
          <div>Среднее время (всех курсов)</div>
          <div style={styles.bigStat}>{overallAvgTime !== null ? formatTime(Math.round(overallAvgTime)) : "—"}</div>
        </div>

        <div style={styles.card}>
          <div>Курсы</div>
          <div style={styles.bigStat}>{courses.length}</div>
        </div>
      </div>

      {/* Course selector + course cards */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
        <select
          style={styles.select}
          value={selectedCourseId}
          onChange={(e) => {
            setSelectedCourseId(e.target.value);
            setPage(0);
            // if currently viewing byCourse, keep it; otherwise no change
          }}
        >
          <option value="">Выберите курс</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div style={styles.toggleGroup}>
          <button
            style={styles.toggleButton(viewMode === "all")}
            onClick={() => {
              setViewMode("all");
              setPage(0);
            }}
          >
            Все студенты
          </button>
          <button
            style={styles.toggleButton(viewMode === "byCourse")}
            onClick={() => {
              setViewMode("byCourse");
              setPage(0);
            }}
          >
            Только студенты курса
          </button>
        </div>
      </div>

      {/* course stats area */}
      {selectedCourseId ? (
        loadingStats ? (
          <div style={{ padding: 16 }}>Загрузка статистики курса...</div>
        ) : !hasCourseStats ? (
          <div style={{ padding: 16, color: "var(--color-text-secondary)" }}>Статистики по выбранному курсу пока нет.</div>
        ) : (
          <div style={styles.cardsRow}>
            <div style={styles.card}>
              <div>Средний прогресс (курс)</div>
              <div style={styles.bigStat}>{avgProgress !== null ? `${Number(avgProgress).toFixed(1)}%` : "—"}</div>
            </div>
            <div style={styles.card}>
              <div>Среднее время (курс)</div>
              <div style={styles.bigStat}>{avgTimeMinutes !== null ? formatTime(Math.round(avgTimeMinutes)) : "—"}</div>
            </div>
            <div style={styles.card}>
              <div>Всего студентов (курс)</div>
              <div style={styles.bigStat}>{courseStudentsCount ?? "—"}</div>
            </div>
          </div>
        )
      ) : (
        <div style={{ color: "var(--color-text-secondary)", marginBottom: 8 }}>Чтобы увидеть статистику по курсу — выберите курс в списке.</div>
      )}

      {/* Students section */}
      <div>
        <div style={styles.studentsHeaderBig}>Студенты</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "var(--color-text-secondary)" }}>
            Просмотр: <span style={{ fontWeight: 700 }}>{viewMode === "all" ? "Все студенты" : "Студенты выбранного курса"}</span>
            {viewMode === "byCourse" && selectedCourseId && (
              <span style={{ marginLeft: 8, color: "var(--color-text-secondary)" }}>
                (курс: {courses.find((c) => c.id === selectedCourseId)?.name ?? selectedCourseId})
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ color: "var(--color-text-secondary)" }}>
              {totalStudents ?? 0} студентов — страница {page + 1}/{pagesCount}
            </div>
            <div>
              <select
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setPage(0);
                }}
                style={{ padding: 8, borderRadius: 8 }}
              >
                {PAGE_SIZE_OPTIONS.map((ps) => (
                  <option key={ps} value={ps}>
                    {ps} / стр
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loadingStudents ? (
          <div style={{ padding: 12 }}>Загрузка списка студентов...</div>
        ) : students.length === 0 ? (
          <div style={{ padding: 12, color: "var(--color-text-secondary)" }}>Студентов не найдено.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Пользователь</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Прогресс</th>
                <th style={styles.th}>Время</th>
                <th style={styles.th}>Последняя активность</th>
                <th style={styles.th}>Статус</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s: any) => (
                <tr key={s.id}>
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                        {String(getStudentName(s)).slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{getStudentName(s)}</div>
                        <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{s.profile?.title || s.profile?.role || ""}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>{s.email ?? "—"}</td>
                  <td style={styles.td}>{(s.progressPercent ?? s.progress ?? "—") !== "—" ? `${Number(s.progressPercent ?? s.progress).toFixed(1)}%` : "—"}</td>
                  <td style={styles.td}>{s.timeSpentMinutes ? formatTime(Math.round(s.timeSpentMinutes)) : "—"}</td>
                  <td style={styles.td}>{formatDateTime(getLastActivity(s))}</td>

                  <td style={styles.td}>
                    {s.completed ? <span style={{ ...styles.pill, background: "rgba(40,167,69,0.12)" }}>Завершил</span> : <span style={styles.pill}>В процессе</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination controls */}
        <div style={styles.footerRow}>
          <div>
            <button
              style={{ ...styles.btn }}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              ← Пред.
            </button>
            <button
              style={{ ...styles.btn, marginLeft: 8 }}
              onClick={() => setPage((p) => Math.min(p + 1, pagesCount - 1))}
              disabled={page >= pagesCount - 1}
            >
              След. →
            </button>
          </div>

          <div style={{ color: "var(--color-text-secondary)" }}>
            Показаны {Math.min(size, (totalStudents || 0) - page * size)} из {totalStudents}
          </div>
        </div>
      </div>

      {error && <div style={{ color: "crimson", marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default StatisticsSection;
