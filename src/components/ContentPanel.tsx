import React, { useState } from 'react';
import { useAuth } from "../context/UseAuth.tsx";
import { useTheme } from "../context/UseTheme.tsx";
import { CoursesManagement } from './content/CourseManagement.tsx'
import { Statistics } from './content/ContentStatistics.tsx'
import { Reports } from './content/Reports.tsx';

type Section = 'courses' | 'statistics' | 'reports';

export const ContentPanel = () => {
    const { user, logout } = useAuth();
    const { theme, toggle } = useTheme();
    const [activeSection, setActiveSection] = useState<Section>('courses');

    const getUserDisplayName = () => {
        if (user?.staffProfile) {
            const { name, patronymic } = user.staffProfile;
            return patronymic ? `${name} ${patronymic}` : name;
        }
        return user?.email || 'Пользователь';
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'courses':
                return <CoursesManagement />;
            case 'statistics':
                return <Statistics />;
            case 'reports':
                return <Reports />;
            default:
                return <CoursesManagement />;
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box'
        }}>
            {/* Header */}
            <header style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 32px',
                borderBottom: '1px solid var(--color-border)',
                background: 'var(--color-card)',
                boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: 'var(--color-primary)',
                        borderRadius: '50%',
                        marginRight: '14px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}></div>
                    <h2 style={{ fontWeight: 700, fontSize: '1.6rem', margin: 0 }}>InRussian</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
                        Добро пожаловать, {getUserDisplayName()}
                    </span>
                    <button
                        type="button"
                        onClick={toggle}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-primary)',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            transition: 'background 0.2s'
                        }}
                        aria-label="Переключить тему"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button
                        onClick={logout}
                        style={{
                            padding: '8px 16px',
                            background: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}
                    >
                        Выйти
                    </button>
                </div>
            </header>

            {/* Navigation */}
            <nav style={{
                width: '100%',
                padding: '0 32px',
                background: 'var(--color-card)',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    marginTop: '16px',
                    marginBottom: '16px'
                }}>
                    {[
                        { key: 'courses' as Section, label: 'Управление курсами' },
                        { key: 'statistics' as Section, label: 'Статистика' },
                        { key: 'reports' as Section, label: 'Отчёты' }
                    ].map(({ key, label }, idx, arr) => {
                        let borderRadius = '0';
                        if (idx === 0) borderRadius = '8px 0 0 8px';
                        if (idx === arr.length - 1) borderRadius = '0 8px 8px 0';

                        return (
                            <React.Fragment key={key}>
                                <button
                                    onClick={() => setActiveSection(key)}
                                    style={{
                                        flex: 1,
                                        padding: '12px 24px',
                                        background: activeSection === key ? 'var(--color-primary)' : 'transparent',
                                        color: activeSection === key ? '#fff' : 'var(--color-text)',
                                        border: 'none',
                                        borderRadius,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        outline: 'none'
                                    }}
                                >
                                    {label}
                                </button>
                                {idx < arr.length - 1 && (
                                    <div style={{
                                        width: '1px',
                                        background: 'var(--color-border)',
                                        alignSelf: 'stretch'
                                    }} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: '32px',
                maxWidth: '100%',
                boxSizing: 'border-box'
            }}>
                {renderContent()}
            </main>
        </div>
    );
};