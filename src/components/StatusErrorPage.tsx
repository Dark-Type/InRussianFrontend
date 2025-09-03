import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/auth/UseAuth';

const statusMessages: Record<string, { title: string; description: string }> = {
    SUSPENDED: {
        title: 'Аккаунт приостановлен',
        description: 'Ваш аккаунт временно приостановлен. Обратитесь к поддержке или администратору.'
    },
    DEACTIVATED: {
        title: 'Аккаунт деактивирован',
        description: 'Этот аккаунт отключён. Для восстановления доступа свяжитесь с администратором.'
    },
    PENDING_VERIFICATION: {
        title: 'Ожидается подтверждение',
        description: 'Ваш аккаунт ещё не подтверждён. Проверьте почту или дождитесь подтверждения модератора.'
    },
    UNKNOWN: {
        title: 'Доступ ограничен',
        description: 'Статус вашего аккаунта не позволяет войти.'
    }
};

export const StatusErrorPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const status = (location.state as any)?.status || 'UNKNOWN';
    const msg = statusMessages[status] || statusMessages.UNKNOWN;

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--color-bg)', color: 'var(--color-text)', padding: 24
        }}>
            <div style={{
                width: '100%', maxWidth: 560, background: 'var(--color-card)', border: '1px solid var(--color-border)',
                borderRadius: 16, padding: '40px 36px', boxShadow: '0 6px 28px rgba(0,0,0,0.12)'
            }}>
                <h1 style={{ margin: '0 0 16px', fontSize: '1.6rem' }}>{msg.title}</h1>
                <p style={{ margin: 0, lineHeight: 1.55, fontSize: '.95rem', opacity: .9 }}>{msg.description}</p>
                <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                        type="button"
                        onClick={() => { logout(); navigate('/', { replace: true }); }}
                        style={{
                            padding: '10px 22px', background: 'var(--color-primary)', color: '#fff', border: 'none',
                            borderRadius: 8, cursor: 'pointer', fontWeight: 600
                        }}
                    >На страницу входа</button>
                </div>
                <div style={{ marginTop: 24, fontSize: 12, opacity: .5, textAlign: 'center' }}>
                    Код статуса: {status}
                </div>
            </div>
        </div>
    );
};

export default StatusErrorPage;
