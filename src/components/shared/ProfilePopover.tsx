import React, { useEffect, useRef, useState } from "react";
import { useProfile } from "../../context/profile/UseProfile.tsx";
import { useAuth } from "../../context/auth/UseAuth.ts";
import {
  type StaffProfile,
  type User,
  type UserSystemLanguageEnum,
  UserRoleEnum,
  UserStatusEnum,
} from "../../api";
import { resolveAvatarUrl } from "../../utils/avatarResolver";
import { AdminService } from "../../services/AdminService.ts";

type ProfilePopoverProps = {
  onSave: () => void;
  avatarUrl?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ProfilePopover = ({
  onSave,
  avatarUrl,
  open,
  setOpen,
}: ProfilePopoverProps) => {
  const {
    getStaffProfileById,
    updateUserBaseProfile,
    uploadAvatar,
    getAvatarIdByUserId,
  } = useProfile();

  const [staffForm, setStaffForm] = useState<
    Pick<StaffProfile, "name" | "surname" | "patronymic">
  >({
    name: "",
    surname: "",
    patronymic: "",
  });
  const [userForm, setUserForm] = useState<
    Pick<User, "email" | "phone" | "systemLanguage" | "avatarId" | "role" | "status">
  >({
    email: "",
    phone: "",
    systemLanguage: "RUSSIAN" as UserSystemLanguageEnum,
    avatarId: "",
    role: UserRoleEnum.Student,
    status: UserStatusEnum.Active,
  });
  const [avatarPreview, setAvatarPreview] = useState<string>(
    avatarUrl || "/public/assets/images/default-avatar.svg"
  );
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (avatarUrl) {
      setAvatarPreview(avatarUrl);
    } else {
      setAvatarPreview("/public/assets/images/default-avatar.svg");
    }
  }, [avatarUrl]);

  useEffect(() => {
    if (!open || !user) return;

    const userId = user.id;
    AdminService.getUserById(userId)
      .then((res) => {
        setUserForm({
          email: user.email,
          phone: res.data.phone,
          systemLanguage: "RUSSIAN",
          avatarId: "",
          role: res.data.role || UserRoleEnum.Student,
          status: res.data.status || UserStatusEnum.Active,
        });
      })
      .catch((error) => {
        console.error("Ошибка при получении пользователя:", error);
        setUserForm({
          email: user.email,
          phone: "",
          systemLanguage: "RUSSIAN",
          avatarId: "",
          role: UserRoleEnum.Student,
          status: UserStatusEnum.Active,
        });
      });

    getStaffProfileById(userId).then((profile) => {
      setStaffForm({
        name: profile.name,
        surname: profile.surname,
        patronymic: profile.patronymic,
      });
      setUserForm((prev) => ({
        ...prev,
        phone: (profile as any).phone ?? prev.phone,
        systemLanguage: (profile as any).systemLanguage ?? prev.systemLanguage,
      }));

      getAvatarIdByUserId(userId).then(async (avatarId) => {
        setUserForm((prev) => ({ ...prev, avatarId }));
        const url = await resolveAvatarUrl(
          avatarId,
          "/public/assets/images/default-avatar.svg"
        );
        setAvatarPreview(url);
      });
    });
  }, [open, user, getStaffProfileById, getAvatarIdByUserId, avatarUrl]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleStaffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStaffForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
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
      setUserForm((prev) => ({ ...prev, avatarId }));
    }

    if (userId) {
      await updateUserBaseProfile(userId, {
        name: staffForm.name,
        surname: staffForm.surname,
        patronymic: staffForm.patronymic,
        phone: userForm.phone,
        systemLanguage: userForm.systemLanguage,
        avatarId,
        role: userForm.role,
        status: userForm.status,
      });
    }

    onSave();
    setOpen(false);
  };
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <button
        style={{
          border: "none",
          background: "transparent",
          borderRadius: "50%",
          padding: 0,
          overflow: "hidden",
          width: 40,
          height: 40,
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <img
          src={avatarPreview}
          alt="avatar"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            background: "var(--color-card)",
            color: "var(--color-text)",
            position: "absolute",
            right: 0,
            top: "100%",
            zIndex: 10,
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
                  src={avatarPreview}
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
                  type="text"
                  name="name"
                  value={staffForm.name}
                  onChange={handleStaffChange}
                  style={{ width: "100%", background: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-input-border)', borderRadius: 6, padding: '8px 10px' }}
                  required
                />
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>
                Фамилия:
                <input
                  type="text"
                  name="surname"
                  value={staffForm.surname}
                  onChange={handleStaffChange}
                  style={{ width: "100%", background: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-input-border)', borderRadius: 6, padding: '8px 10px' }}
                  required
                />
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>
                Отчество:
                <input
                  type="text"
                  name="patronymic"
                  value={staffForm.patronymic || ""}
                  onChange={handleStaffChange}
                  style={{ width: "100%", background: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-input-border)', borderRadius: 6, padding: '8px 10px' }}
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
                  style={{ width: "100%", background: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-input-border)', borderRadius: 6, padding: '8px 10px' }}
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
                  style={{ width: "100%", background: 'var(--color-input-bg)', color: 'var(--color-text)', border: '1px solid var(--color-input-border)', borderRadius: 6, padding: '8px 10px' }}
                />
              </label>
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ marginRight: 12, background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
              >
                Отмена
              </button>
              <button type="submit" style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Сохранить</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
