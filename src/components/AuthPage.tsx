import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserRoleEnum, UserSystemLanguageEnum} from '../api';
import {useAuth} from '../context/UseAuth.tsx';
import {useTheme} from "../context/UseTheme.tsx";

export const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const {theme, toggle} = useTheme();
    const [role, setRole] = useState<UserRoleEnum | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [systemLanguage, setSystemLanguage] = useState<UserSystemLanguageEnum>(UserSystemLanguageEnum.Russian);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {login, registerWithStaffProfile, user} = useAuth();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === 'login') {
                await login(email, password);
                if (!user?.role) {
                    setError('Не удалось получить роль пользователя');
                    setIsLoading(false);
                    return;
                }
                redirectToPanel(user.role as UserRoleEnum);

            } else {
                if (!role) {
                    setError('Пожалуйста, выберите роль');
                    setIsLoading(false);
                    return;
                }
                const userRole = await registerWithStaffProfile(
                    {email, password, phone, role, systemLanguage},
                    {name, surname, patronymic}
                );
                redirectToPanel(userRole);
            }
        } catch (err: unknown) {
            console.error("Auth error:", err);
            setError('Произошла ошибка');

        } finally {
            setIsLoading(false);
        }
    };

    const redirectToPanel = useCallback((userRole: UserRoleEnum) => {
        switch (userRole) {
            case UserRoleEnum.Admin:
                navigate('/admin');
                break;
            case UserRoleEnum.Expert:
                navigate('/expert');
                break;
            case UserRoleEnum.ContentModerator:
                navigate('/content');
                break;
            default:
                navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        if (user?.role) {
            redirectToPanel(user.role as UserRoleEnum);
        }
    }, [redirectToPanel, user]);

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
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: 'var(--color-primary)',
                        borderRadius: '50%',
                        marginRight: '14px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}></div>
                    <h2 style={{fontWeight: 700, fontSize: '1.6rem', margin: 0}}>InRussian</h2>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <span style={{fontSize: '1.1rem', fontWeight: 500}}>Система управления</span>
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
                </div>
            </header>
            <main style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw'
            }}>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: '100%',
                        maxWidth: '460px',
                        padding: '28px',
                        background: 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '16px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '32px',
                        fontWeight: 700,
                        fontSize: '1.4rem'
                    }}>
                        {mode === 'login' ? 'Вход в систему' : 'Регистрация'}
                    </h2>
                    {/* Role Selection */}

                    {mode === 'register' && (
                        <div style={{marginBottom: '15px', width: '100%'}}>
                            <label style={{display: 'block', marginBottom: '8px'}}>Роль:</label>
                            <div style={{
                                display: 'flex',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-card)',
                                width: '100%'
                            }}>
                                {[
                                    {value: UserRoleEnum.Admin, label: 'Администратор'},
                                    {value: UserRoleEnum.Expert, label: 'Эксперт'},
                                    {value: UserRoleEnum.ContentModerator, label: 'Контент-менеджер'}
                                ].map(({value, label}, idx, arr) => {
                                    let borderRadius = '0';
                                    if (idx === 0) borderRadius = '12px 0 0 12px';
                                    if (idx === arr.length - 1) borderRadius = '0 12px 12px 0';
                                    const borderColor = role === value ? 'var(--color-primary)' : 'var(--color-border)';
                                    return (
                                        <React.Fragment key={value}>
                                            <button
                                                type="button"
                                                onClick={() => setRole(value)}
                                                style={{
                                                    flex: 1,
                                                    padding: '12px 0',
                                                    background: role === value ? 'var(--color-primary)' : 'transparent',
                                                    color: role === value ? '#fff' : 'var(--color-text)',
                                                    border: `1px solid ${borderColor}`,
                                                    borderRadius,
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                                                    outline: 'none'
                                                }}
                                            >
                                                {label}
                                            </button>
                                            {idx < arr.length - 1 && (
                                                <div style={{
                                                    width: '1px',
                                                    background: 'rgba(120,120,120,0.3)',
                                                    alignSelf: 'stretch'
                                                }}/>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div style={{marginBottom: '15px', width: '100%'}}>

                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                            style={{
                                width: '100%',
                                minWidth: '0',
                                boxSizing: 'border-box',
                                padding: '8px',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                background: 'var(--color-card)',
                                color: 'var(--color-text)'
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{marginBottom: '15px', width: '100%'}}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Пароль"
                            style={{
                                width: '100%',
                                minWidth: '0',
                                boxSizing: 'border-box',
                                padding: '8px',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                background: 'var(--color-card)',
                                color: 'var(--color-text)'
                            }}
                        />
                    </div>

                    {/* Register-only fields */}
                    {mode === 'register' && (
                        <>
                            <div style={{marginBottom: '15px', width: '100%'}}>
                                <input
                                    type="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Телефон (необязательно)"

                                    style={{
                                        width: '100%',
                                        minWidth: '0',
                                        boxSizing: 'border-box',
                                        padding: '8px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        background: 'var(--color-card)',
                                        color: 'var(--color-text)'
                                    }}
                                />
                            </div>
                            <div style={{marginBottom: '15px', width: '100%'}}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Имя"
                                    style={{
                                        width: '100%',
                                        minWidth: '0',
                                        boxSizing: 'border-box',
                                        padding: '8px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        background: 'var(--color-card)',
                                        color: 'var(--color-text)'
                                    }}
                                />
                            </div>
                            <div style={{marginBottom: '15px', width: '100%'}}>
                                <input
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                    placeholder="Фамилия"
                                    style={{
                                        width: '100%',
                                        minWidth: '0',
                                        boxSizing: 'border-box',
                                        padding: '8px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        background: 'var(--color-card)',
                                        color: 'var(--color-text)'
                                    }}
                                />
                            </div>
                            <div style={{marginBottom: '15px', width: '100%'}}>
                                <input
                                    type="text"
                                    value={patronymic}
                                    onChange={(e) => setPatronymic(e.target.value)}
                                    placeholder="Отчество"
                                    style={{
                                        width: '100%',
                                        minWidth: '0',
                                        boxSizing: 'border-box',
                                        padding: '8px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        background: 'var(--color-card)',
                                        color: 'var(--color-text)'
                                    }}
                                />
                            </div>
                            <div style={{marginBottom: '15px', width: '100%'}}>
                                <label style={{display: 'block', marginBottom: '5px', textAlign: 'left'}}>Язык
                                    системы:</label>
                                <select
                                    value={systemLanguage}
                                    onChange={(e) => setSystemLanguage(e.target.value as UserSystemLanguageEnum)}
                                    style={{
                                        width: '100%',
                                        minWidth: '0',
                                        boxSizing: 'border-box',
                                        padding: '8px',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        background: 'var(--color-card)',
                                        color: 'var(--color-text)'
                                    }}
                                >
                                    <option value={UserSystemLanguageEnum.Russian}>Русский</option>
                                    <option value={UserSystemLanguageEnum.English}>Английский</option>
                                    <option value={UserSystemLanguageEnum.Chinese}>Китайский</option>
                                    <option value={UserSystemLanguageEnum.Hindi}>Хинди</option>
                                    <option value={UserSystemLanguageEnum.Tajik}>Таджикский</option>
                                    <option value={UserSystemLanguageEnum.Uzbek}>Узбекский</option>
                                </select>
                            </div>
                        </>
                    )}

                    {/* Error */}
                    {error && (
                        <div style={{
                            marginBottom: '15px',
                            padding: '10px',
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            borderRadius: '4px',
                            width: '100%'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '80%',
                            padding: '12px',
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-card)',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            opacity: isLoading ? 0.6 : 1,
                            margin: '0 auto',
                            fontWeight: 600
                        }}
                    >
                        {isLoading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </button>

                    {/* Switch mode */}
                    <div style={{marginTop: '18px', textAlign: 'center', width: '100%'}}>
                        {mode === 'login' ? (
                            <span>
                                Нет аккаунта?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('register')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-primary)',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Зарегистрироваться
                                </button>
                            </span>
                        ) : (
                            <span>
                                Уже есть аккаунт?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('login')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-primary)',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Войти
                                </button>
                            </span>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
};