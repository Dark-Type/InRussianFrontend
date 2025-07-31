import React, {useRef, useState} from "react";

// Mock user and staff profile types
type User = {
    email: string;
    phone?: string;
    systemLanguage: string;
    avatarId?: string;
};
type StaffProfile = {
    name: string;
    surname: string;
    patronymic?: string;
};

type ProfilePopoverProps = {
    user: User;
    staffProfile: StaffProfile;
    onSave: (updated: { user: User; staffProfile: StaffProfile; avatarFile?: File }) => void;
};

export const ProfilePopover: React.FC<ProfilePopoverProps> = ({
                                                                  user,
                                                                  staffProfile,
                                                                  onSave,
                                                              }) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        ...user,
        ...staffProfile,
    });
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
        user.avatarId ? `/media/${user.avatarId}` : undefined
    );
    const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            user: {
                email: form.email,
                phone: form.phone,
                systemLanguage: form.systemLanguage,
                avatarId: user.avatarId,
            },
            staffProfile: {
                name: form.name,
                surname: form.surname,
                patronymic: form.patronymic,
            },
            avatarFile,
        });
        setOpen(false);
    };

    // The popover itself
    return (
        <div style={{position: "relative", display: "inline-block"}}>
            <button style={{border: "none", background: "transparent"}} onClick={handleOpen}>
                <img
                    src={avatarPreview || "/default-avatar.png"}
                    alt="avatar"
                    style={{width: 40, height: 40, borderRadius: "50%", objectFit: "cover"}}
                />
            </button>
            {open && (
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        zIndex: 10,
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        padding: 24,
                        minWidth: 320,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div style={{textAlign: "center", marginBottom: 16}}>
                            <div
                                style={{
                                    margin: "0 auto",
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    border: "2px solid #eee",
                                }}
                                onClick={handleAvatarClick}
                                title="Change avatar"
                            >
                                <img
                                    src={avatarPreview || "/default-avatar.png"}
                                    alt="avatar"
                                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                                />
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{display: "none"}}
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div style={{marginBottom: 12}}>
                            <label>
                                Имя:
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    style={{width: "100%"}}
                                    required
                                />
                            </label>
                        </div>
                        <div style={{marginBottom: 12}}>
                            <label>
                                Фамилия:
                                <input
                                    name="surname"
                                    value={form.surname}
                                    onChange={handleChange}
                                    style={{width: "100%"}}
                                    required
                                />
                            </label>
                        </div>
                        <div style={{marginBottom: 12}}>
                            <label>
                                Отчество:
                                <input
                                    name="patronymic"
                                    value={form.patronymic || ""}
                                    onChange={handleChange}
                                    style={{width: "100%"}}
                                />
                            </label>
                        </div>
                        <div style={{marginBottom: 12}}>
                            <label>
                                Email:
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    style={{width: "100%"}}
                                    disabled
                                />
                            </label>
                        </div>
                        <div style={{marginBottom: 12}}>
                            <label>
                                Телефон:
                                <input
                                    name="phone"
                                    type="tel"
                                    value={form.phone || ""}
                                    onChange={handleChange}
                                    style={{width: "100%"}}
                                />
                            </label>
                        </div>
                        <div style={{marginBottom: 16}}>
                            <label>
                                Язык системы:
                                <select
                                    name="systemLanguage"
                                    value={form.systemLanguage}
                                    onChange={handleChange}
                                    style={{width: "100%"}}
                                >
                                    <option value="ru">Русский</option>
                                    <option value="en">English</option>
                                    {/* Add more languages if needed */}
                                </select>
                            </label>
                        </div>
                        <div style={{textAlign: "right"}}>
                            <button
                                type="button"
                                onClick={handleClose}
                                style={{marginRight: 12}}
                            >
                                Отмена
                            </button>
                            <button type="submit">Сохранить</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};