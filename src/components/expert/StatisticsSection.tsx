import {useExpert} from '../../context/expert/UseExpert';
import type {
    ExpertCourse,
    CourseStatistics
} from '../../context/expert/ExpertProvider';

export const StatisticsSection = () => {
    const {
        courses,
        courseStatistics,
        loadCourseStatistics,
        exportCourseStatisticsToExcel
    } = useExpert();

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}ч ${mins}м`;
    };

    return (
        <div>
            <h2 style={{marginBottom: '24px'}}>Статистика курсов</h2>

            <div style={{marginBottom: '24px'}}>
                <select
                    onChange={(e) => {
                        if (e.target.value) {
                            loadCourseStatistics(e.target.value);
                        }
                    }}
                    style={{
                        padding: '12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        marginRight: '16px'
                    }}
                >
                    <option value="">Выберите курс</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            {Object.values(courseStatistics).length > 0 ? (
                Object.values(courseStatistics).map((stats) => (
                    <div key={stats.courseId} style={{
                        background: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h3>{stats.courseName}</h3>
                            <button
                                onClick={() => exportCourseStatisticsToExcel(stats.courseId)}
                                style={{
                                    padding: '8px 16px',
                                    background: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                📊 Экспорт
                            </button>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px',
                            marginBottom: '24px'
                        }}>
                            <div style={{background: 'var(--color-bg)', padding: '16px', borderRadius: '6px'}}>
                                <h4>Всего студентов</h4>
                                <p style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)'}}>
                                    {stats.totalStudents}
                                </p>
                            </div>
                            <div style={{background: 'var(--color-bg)', padding: '16px', borderRadius: '6px'}}>
                                <h4>Активные студенты</h4>
                                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#28a745'}}>
                                    {stats.activeStudents}
                                </p>
                            </div>
                            <div style={{background: 'var(--color-bg)', padding: '16px', borderRadius: '6px'}}>
                                <h4>Средний прогресс</h4>
                                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8'}}>
                                    {stats.averageProgress.toFixed(1)}%
                                </p>
                            </div>
                            <div style={{background: 'var(--color-bg)', padding: '16px', borderRadius: '6px'}}>
                                <h4>Среднее время</h4>
                                <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ffc107'}}>
                                    {formatTime(Math.round(stats.averageTimeSpent))}
                                </p>
                            </div>
                            <div style={{background: 'var(--color-bg)', padding: '16px', borderRadius: '6px'}}>
                                <h4>Процент завершения</h4>
                                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#dc3545'}}>
                                    {stats.completionRate}%
                                </p>
                            </div>
                        </div>

                        {stats.sections.length > 0 && (
                            <div>
                                <h4>Статистика по разделам</h4>
                                {stats.sections.map((section) => (
                                    <div key={section.sectionId} style={{
                                        background: 'var(--color-bg)',
                                        padding: '16px',
                                        borderRadius: '6px',
                                        marginBottom: '12px'
                                    }}>
                                        <h5>{section.sectionName}</h5>
                                        <p>Средний прогресс: {section.averageProgress.toFixed(1)}%</p>

                                        {section.themes && section.themes.length > 0 && (
                                            <div style={{marginTop: '12px'}}>
                                                <h6>Темы:</h6>
                                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                                                    {section.themes.map((theme) => (
                                                        <span
                                                            key={theme.themeId}
                                                            style={{
                                                                padding: '4px 8px',
                                                                background: 'var(--color-primary)',
                                                                color: 'white',
                                                                borderRadius: '4px',
                                                                fontSize: '0.85rem'
                                                            }}
                                                        >
                                                            {theme.themeName} ({theme.averageProgress.toFixed(1)}%)
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div style={{textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)'}}>
                    <p>Выберите курс для просмотра статистики</p>
                </div>
            )}
        </div>
    );
};