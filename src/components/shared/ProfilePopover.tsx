import React, { useEffect, useRef, useState } from "react";
import { useProfile } from "../../context/profile/UseProfile.tsx";
import { useAuth } from "../../context/auth/UseAuth.ts";
import type { StaffProfile, User, UserSystemLanguageEnum } from "../../api";
import { resolveAvatarUrl } from "../../utils/avatarResolver";

type ProfilePopoverProps = {
    onSave: () => void;
    avatarUrl?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export const ProfilePopover: React.FC<ProfilePopoverProps> = ({
    onSave,
    avatarUrl,
    open,
    setOpen
}) => {
    const {
        getStaffProfileById,
        updateStaffProfileById,
        uploadAvatar,
        getAvatarIdByUserId,
    } = useProfile();

    const [staffForm, setStaffForm] = useState<Pick<StaffProfile, "name" | "surname" | "patronymic">>({
        name: "",
        surname: "",
        patronymic: "",
    });
    const [userForm, setUserForm] = useState<Pick<User, "email" | "phone" | "systemLanguage" | "avatarId">>({
        email: "",
        phone: "",
        systemLanguage: "RUSSIAN" as UserSystemLanguageEnum,
        avatarId: "",
    });
    const [avatarPreview, setAvatarPreview] = useState<string>(avatarUrl || "/public/assets/images/default-avatar.svg");
    const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!open || !user) return;

        const userId = user.id;

        setUserForm({
            email: user.email,
            phone: "",
            systemLanguage: "RUSSIAN",
            avatarId: "",
        });

        getStaffProfileById(userId).then(profile => {
            setStaffForm({
                name: profile.name,
                surname: profile.surname,
                patronymic: profile.patronymic,
            });
            setUserForm(prev => ({
                ...prev,
                phone: (profile as any).phone || "",
                systemLanguage: (profile as any).systemLanguage as UserSystemLanguageEnum,
            }));

            getAvatarIdByUserId(userId).then(async avatarId => {
                setUserForm(prev => ({ ...prev, avatarId }));
                const url = await resolveAvatarUrl(avatarId, avatarUrl);
                setAvatarPreview(url);
            });
        });
    }, [open, user, getStaffProfileById, getAvatarIdByUserId, avatarUrl]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleStaffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStaffForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userId = user?.id;
        let avatarId = userForm.avatarId;

        if (userId && avatarFile) {
            const media = await uploadAvatar(avatarFile, userId);
            avatarId = media.mediaId;
            setUserForm(prev => ({ ...prev, avatarId }));
        }

        if (userId) {
            await updateStaffProfileById(userId, {
                name: staffForm.name,
                surname: staffForm.surname,
                patronymic: staffForm.patronymic,
                phone: userForm.phone,
                systemLanguage: userForm.systemLanguage,
                avatarId,
            });
        }

        onSave();
        setOpen(false);
    };

    return (
        <div style={{ 
            position: "relative", 
            display: "inline-block"
             }}>
            <button
                style={{
                    border: "none",
                    background: "transparent",
                    borderRadius: "50%",
                    padding: 0,
                    overflow: "hidden",
                    width: 40,
                    height: 40,
                    cursor: "pointer"
                }}
                onClick={() => setOpen(true)}
            >
                <img
                    src={avatarUrl || "/public/assets/images/default-avatar.svg"}
                    alt="avatar"
                    style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
                />
            </button>
            {open && (
                <div
                    style={{
                        background: 'var(--color-card)',
                        color: 'var(--color-text)',
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        zIndex: 10,
                        // background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        padding: 24,
                        minWidth: 320,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div style={{ textAlign: "center", marginBottom: 16 }}>
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
                                    src={avatarUrl}
                                    alt="avatar"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label>
                                Имя:
                                <input
                                    name="name"
                                    value={staffForm.name}
                                    onChange={handleStaffChange}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label>
                                Фамилия:
                                <input
                                    name="surname"
                                    value={staffForm.surname}
                                    onChange={handleStaffChange}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label>
                                Отчество:
                                <input
                                    name="patronymic"
                                    value={staffForm.patronymic || ""}
                                    onChange={handleStaffChange}
                                    style={{ width: "100%" }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label>
                                Email:
                                <input
                                    name="email"
                                    type="email"
                                    value={userForm.email}
                                    onChange={handleUserChange}
                                    style={{ width: "100%" }}
                                    disabled
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label>
                                Телефон:
                                <input
                                    name="phone"
                                    type="tel"
                                    value={userForm.phone || ""}
                                    onChange={handleUserChange}
                                    style={{ width: "100%" }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label>
                                Язык системы:
                                <select
                                    name="systemLanguage"
                                    value={userForm.systemLanguage}
                                    onChange={handleUserChange}
                                    style={{ width: "100%" }}
                                >
                                    <option value="RUSSIAN">Русский</option>
                                    <option value="ENGLISH">English</option>
                                    <option value="TAJIC">Таджикский</option>
                                    <option value="UZBEK">Узбекский</option>
                                </select>
                            </label>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                style={{ marginRight: 12 }}
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
