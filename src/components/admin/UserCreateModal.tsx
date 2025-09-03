import React, { useState } from 'react';
import { UserRoleEnum, UserSystemLanguageEnum } from '../../api';
import { authApi } from '../../instances/axiosInstance';

interface UserCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void; // callback so parent can refresh list
}

// Reuse same validation rules as AuthPage
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+\d{1,3}[-\s]?\d{1,14}([-\s]?\d{1,13})?$/;

export const UserCreateModal: React.FC<UserCreateModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [role, setRole] = useState<UserRoleEnum | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  // Student-specific (basic) profile fields (optional minimal set)
  const [studentProfileEnabled, setStudentProfileEnabled] = useState(true);
  const [studentGender, setStudentGender] = useState('');
  const [studentDob, setStudentDob] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const reset = () => {
    setRole(null);
    setEmail('');
    setPassword('');
    setPhone('');
    setName('');
    setSurname('');
    setPatronymic('');
    setError(null);
    setLoading(false);
  };

  const validate = () => {
    const errs: string[] = [];
    if (!emailRegex.test(email)) errs.push('Некорректный email');
    if (password.length < 6) errs.push('Пароль должен быть не короче 6 символов');
    if (!/\d/.test(password)) errs.push('Пароль должен содержать хотя бы одну цифру');
    if (!/[!@#$%^&*()_]/.test(password)) errs.push('Пароль должен содержать хотя бы один спецсимвол');
    const phoneValue = phone.trim();
    if (!phoneValue) errs.push('Телефон обязателен');
    else if (!phoneRegex.test(phoneValue)) errs.push('Некорректный формат телефона');
    if (!role) errs.push('Выберите роль');
    if (role !== UserRoleEnum.Student) { // staff only requirements
      if (!surname.trim()) errs.push('Фамилия обязательна');
      if (!name.trim()) errs.push('Имя обязательно');
    } else {
      if (!surname.trim()) errs.push('Фамилия обязательна');
      if (!name.trim()) errs.push('Имя обязательно');
      if (studentProfileEnabled) {
        if (!studentGender) errs.push('Пол обязателен');
        if (!studentDob) errs.push('Дата рождения обязательна');
      }
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    const errs = validate();
    if (errs.length) {
      setError(errs.join('\n'));
      return;
    }
    try {
      setLoading(true);
      const baseURL = import.meta.env.VITE_API_URL || '/api';
      if (role === UserRoleEnum.Student) {
        // Student registration
        const { data } = await authApi.authStudentRegisterPost({
          email, password, phone, systemLanguage: UserSystemLanguageEnum.Russian
        });
        // Optional: create base user profile (if API requires separate call and we collected minimal data)
        if (studentProfileEnabled) {
          try {
            await fetch(`${baseURL}/profiles/user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.accessToken}`,
              },
              body: JSON.stringify({
                name,
                surname,
                patronymic,
                gender: studentGender || undefined,
                dob: studentDob || undefined
              })
            });
          } catch (studentProfileErr) {
            console.error('Student profile creation failed', studentProfileErr);
          }
        }
      } else {
        // Staff registration path
        const { data } = await authApi.authStaffRegisterPost({
          // @ts-ignore - role enum compatibility
          email, password, phone, role, systemLanguage: UserSystemLanguageEnum.Russian
        });
        try {
          await fetch(`${baseURL}/profiles/staff`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.accessToken}`,
            },
            body: JSON.stringify({ name, surname, patronymic })
          });
        } catch (profileErr) {
          console.error('Staff profile creation failed', profileErr);
        }
      }

      onCreated();
      reset();
      onClose();
    } catch (e) {
      console.error('Create user error', e);
      setError('Не удалось создать пользователя');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
    }} onClick={() => { if (!loading) { onClose(); reset(); } }}>
      <div style={{
        background: 'var(--color-card)', padding: 24, borderRadius: 12, width: '100%', maxWidth: 520,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)', color: 'var(--color-text)', position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0, marginBottom: 20 }}>Новый пользователь</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Роль:</label>
            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden' }}>
              {[
                {value: UserRoleEnum.Admin, label: 'Администратор'},
                {value: UserRoleEnum.Expert, label: 'Эксперт'},
                {value: UserRoleEnum.ContentModerator, label: 'Менеджер'},
                {value: UserRoleEnum.Student, label: 'Студент'}
              ].map((r, idx, arr) => {
                const active = role === r.value;
                return (
                  <React.Fragment key={r.value}>
                    <button type="button" onClick={() => setRole(r.value)} style={{
                      flex: 1, padding: '10px 0', background: active ? 'var(--color-primary)' : 'transparent',
                      color: active ? '#fff' : 'var(--color-text)', border: 'none', borderRight: idx < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
                      cursor: 'pointer', fontWeight: 600, transition: 'background .2s'
                    }}>{r.label}</button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={fieldStyle} />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required style={fieldStyle} />
            <input type="tel" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} required style={fieldStyle} />
            <input type="text" placeholder="Фамилия" value={surname} onChange={e => setSurname(e.target.value)} required style={fieldStyle} />
            <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required style={fieldStyle} />
            <input type="text" placeholder="Отчество (необязательно)" value={patronymic} onChange={e => setPatronymic(e.target.value)} style={fieldStyle} />
            {role === UserRoleEnum.Student && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                  <input type="checkbox" id="stud-prof" checked={studentProfileEnabled} onChange={e => setStudentProfileEnabled(e.target.checked)} />
                  <label htmlFor="stud-prof" style={{ cursor: 'pointer' }}>Добавить базовые данные профиля</label>
                </div>
                {studentProfileEnabled && (
                  <>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <select value={studentGender} onChange={e => setStudentGender(e.target.value)} style={{ ...fieldStyle, padding: '10px 8px' }} required>
                        <option value="">Пол</option>
                        <option value="MALE">Мужской</option>
                        <option value="FEMALE">Женский</option>
                      </select>
                      <input type="date" value={studentDob} onChange={e => setStudentDob(e.target.value)} style={fieldStyle} required />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          {error && <div style={{ marginTop: 14, background: '#f8d7da', color: '#721c24', padding: '10px 12px', borderRadius: 6, whiteSpace: 'pre-line', fontSize: 14 }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 22 }}>
            <button type="button" onClick={() => { if (!loading) { onClose(); reset(); } }} style={secondaryBtnStyle}>Отмена</button>
            <button type="submit" disabled={loading} style={{
              padding: '10px 20px', borderRadius: 6, border: 'none', background: 'var(--color-primary)', color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: loading ? .6 : 1
            }}>{loading ? 'Создание...' : 'Создать'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const fieldStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 6,
  background: 'var(--color-card)', color: 'var(--color-text)', boxSizing: 'border-box'
};

const secondaryBtnStyle: React.CSSProperties = {
  padding: '10px 20px', borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-card)',
  color: 'var(--color-text)', cursor: 'pointer'
};

export default UserCreateModal;
