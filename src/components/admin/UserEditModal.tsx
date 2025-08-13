import React, { useState, useEffect } from "react";
import { AdminService } from "../../services/AdminService";
import { profileApi } from "../../instances/profileApiInstance.ts";
import type {
  User,
  UserRoleEnum,
  UserStatusEnum,
  UserSystemLanguageEnum,
  UserProfile,
  StaffProfile,
  UpdateUserProfileRequest,
  UpdateStaffProfileRequest,
} from "../../api";

interface UserEditModalProps {
  user: User | null;
  onClose: () => void;
  onSave: () => void;
}

interface UserLanguageSkill {
  id?: string;
  language: string;
  understands: boolean;
  speaks: boolean;
  reads: boolean;
  writes: boolean;
}

export const UserEditModal = ({
  user,
  onClose,
  onSave,
}: UserEditModalProps) => {
  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    role: "STUDENT" as UserRoleEnum,
    status: "ACTIVE" as UserStatusEnum,
    systemLanguage: "RUSSIAN" as UserSystemLanguageEnum,
  });

  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});
  const [staffProfile, setStaffProfile] = useState<Partial<StaffProfile>>({});
  const [languageSkills, setLanguageSkills] = useState<UserLanguageSkill[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email || "",
        phone: user.phone || "",
        role: user.role,
        status: user.status,
        systemLanguage: user.systemLanguage,
      });
      loadProfileData(user);
    }
  }, [user]);

  const loadProfileData = async (userData: User) => {
    setLoadingData(true);
    try {
      if (userData.role === "STUDENT") {
        const [profileData, skillsData] = await Promise.all([
          AdminService.getStudentProfile(userData.id),
          AdminService.getStudentLanguageSkills(userData.id),
        ]);
        if (profileData) {
          setUserProfile(profileData);
        }

        setLanguageSkills(skillsData || []);
      } else {
        const profileResponse = await profileApi.profilesStaffIdGet(
          userData.id
        );
        if (profileResponse.data.success) {
          setStaffProfile(profileResponse.data.profile);
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
    return new Date(dateString).toISOString().split("T")[0];
  };

  const handleUserDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (userData.role === "STUDENT") {
      setUserProfile((prev) => ({ ...prev, [name]: value }));
    } else {
      setStaffProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLanguageSkillChange = (
    index: number,
    field: keyof UserLanguageSkill,
    value: string | boolean
  ) => {
    setLanguageSkills((prev) =>
      prev.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    );
  };

  const addLanguageSkill = () => {
    setLanguageSkills((prev) => [
      ...prev,
      {
        language: "",
        understands: false,
        speaks: false,
        reads: false,
        writes: false,
      },
    ]);
  };

  const removeLanguageSkill = (index: number) => {
    setLanguageSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const validLanguages = [
        "RUSSIAN",
        "UZBEK",
        "CHINESE",
        "HINDI",
        "TAJIK",
        "ENGLISH",
      ];
      const validatedUserData = {
        ...userData,
        systemLanguage: validLanguages.includes(userData.systemLanguage)
          ? userData.systemLanguage
          : "RUSSIAN",
      };

      //   await AdminService.updateUser(user.id, validatedUserData);
    //   console.log("USER", user);

      if (userData.role === "STUDENT") {
        if (Object.keys(userProfile).length > 0) {
          const updateRequest: UpdateUserProfileRequest = {
            surname: userProfile.surname,
            name: userProfile.name,
            patronymic: userProfile.patronymic,
            gender: userProfile.gender,
            dob: userProfile.dob,
            dor: userProfile.dor,
            citizenship: userProfile.citizenship,
            nationality: userProfile.nationality,
            countryOfResidence: userProfile.countryOfResidence,
            cityOfResidence: userProfile.cityOfResidence,
            education: userProfile.education,
            purposeOfRegister: userProfile.purposeOfRegister,
          };
          await AdminService.updateUserProfile(user.id, updateRequest);
        }
      } else {
        if (Object.keys(staffProfile).length > 0) {
          const updateRequest: UpdateStaffProfileRequest = {
            name: staffProfile.name,
            surname: staffProfile.surname,
            patronymic: staffProfile.patronymic,
            phone: validatedUserData.phone,
            systemLanguage: validatedUserData.systemLanguage,
          };
          await profileApi.profilesStaffIdPut(user.id, updateRequest);
        }
      }

      onSave();
      onClose();
    } catch (error) {
      onClose();
      console.error("Ошибка сохранения:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "var(--color-card)",
          borderRadius: "8px",
          padding: "24px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <h3 style={{ margin: "0 0 20px 0" }}>Редактирование пользователя</h3>

        {loadingData ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            Загрузка данных...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Основные данные пользователя */}
            <div style={{ marginBottom: "24px" }}>
              <h4>Основные данные</h4>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid var(--color-border)",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>
                  Телефон:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserDataChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid var(--color-border)",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "4px" }}>
                    Роль:
                  </label>
                  <select
                    name="role"
                    value={userData.role}
                    onChange={handleUserDataChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <option value="STUDENT">Студент</option>
                    <option value="EXPERT">Преподаватель</option>
                    <option value="CONTENT_MODERATOR">
                      Модератор контента
                    </option>
                    <option value="ADMIN">Администратор</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "4px" }}>
                    Системный язык:
                  </label>
                  <select
                    name="systemLanguage"
                    value={userData.systemLanguage}
                    onChange={handleUserDataChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <option value="RUSSIAN">Русский</option>
                    <option value="UZBEK">Узбекский</option>
                    <option value="CHINESE">Китайский</option>
                    <option value="HINDI">Хинди</option>
                    <option value="TAJIK">Таджикский</option>
                    <option value="ENGLISH">Английский</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "4px" }}>
                    Статус:
                  </label>
                  <select
                    name="status"
                    value={userData.status}
                    onChange={handleUserDataChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <option value="ACTIVE">Активен</option>
                    <option value="INACTIVE">Неактивен</option>
                    <option value="BANNED">Заблокирован</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Профиль */}
            <div style={{ marginBottom: "24px" }}>
              <h4>Профиль</h4>

              {userData.role === "STUDENT" ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: "4px" }}>
                        Фамилия*:
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={userProfile.surname || ""}
                        onChange={handleProfileChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border)",
                        }}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: "4px" }}>
                        Имя*:
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userProfile.name || ""}
                        onChange={handleProfileChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border)",
                        }}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: "4px" }}>
                        Отчество:
                      </label>
                      <input
                        type="text"
                        name="patronymic"
                        value={userProfile.patronymic || ""}
                        onChange={handleProfileChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Дополнительные поля для студентов */}
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: "4px" }}>
                        Пол*:
                      </label>
                      <select
                        name="gender"
                        value={userProfile.gender || ""}
                        onChange={handleProfileChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border)",
                        }}
                        required
                      >
                        <option value="">Выберите пол</option>
                        <option value="MALE">Мужской</option>
                        <option value="FEMALE">Женский</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: "4px" }}>
                        Дата рождения*:
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formatDate(userProfile.dob || "")}
                        onChange={handleProfileChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border)",
                        }}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", marginBottom: "4px" }}>
                        Дата регистрации*:
                      </label>
                      <input
                        type="date"
                        name="dor"
                        value={userProfile.dor || ""}
                        onChange={handleProfileChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-border)",
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Языковые навыки */}
                  <div style={{ marginTop: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <h5 style={{ margin: 0 }}>Языковые навыки</h5>
                      {/* <button
                        type="button"
                        onClick={addLanguageSkill}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "1px solid var(--color-primary)",
                          background: "transparent",
                          color: "var(--color-primary)",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        + Добавить
                      </button> */}
                    </div>

                    {languageSkills.map((skill, index) => (
                      <div
                        key={index}
                        style={{
                          border: "1px solid var(--color-border)",
                          borderRadius: "4px",
                          padding: "12px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              padding: "6px",
                              borderRadius: "4px",
                              border: "1px solid var(--color-border)",
                              lineHeight: "1.4",
                              fontSize: "14px",
                              color: "inherit",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {skill.language || "—"}
                          </div>
                          {/* <button
                            type="button"
                            onClick={() => removeLanguageSkill(index)}
                            style={{
                              padding: "6px",
                              borderRadius: "4px",
                              border: "1px solid #dc3545",
                              background: "transparent",
                              color: "#dc3545",
                              cursor: "pointer",
                            }}
                          >
                            ✕
                          </button> */}
                        </div>

                        <div style={{ display: "flex", gap: "16px" }}>
                          {(
                            [
                              "understands",
                              "speaks",
                              "reads",
                              "writes",
                            ] as const
                          ).map((skillType) => (
                            <label
                              key={skillType}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                cursor: "default",
                                userSelect: "none",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "16px",
                                  color: skill[skillType] ? "green" : "red",
                                  fontWeight: "bold",
                                  width: "18px",
                                  display: "inline-block",
                                  textAlign: "center",
                                }}
                              >
                                {skill[skillType] ? "✓" : "✗"}
                              </span>
                              <span style={{ fontSize: "12px" }}>
                                {skillType === "understands"
                                  ? "Понимает"
                                  : skillType === "speaks"
                                  ? "Говорит"
                                  : skillType === "reads"
                                  ? "Читает"
                                  : "Пишет"}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", marginBottom: "4px" }}>
                      Фамилия*:
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={staffProfile.surname || ""}
                      onChange={handleProfileChange}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid var(--color-border)",
                      }}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", marginBottom: "4px" }}>
                      Имя*:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={staffProfile.name || ""}
                      onChange={handleProfileChange}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid var(--color-border)",
                      }}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", marginBottom: "4px" }}>
                      Отчество:
                    </label>
                    <input
                      type="text"
                      name="patronymic"
                      value={staffProfile.patronymic || ""}
                      onChange={handleProfileChange}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  color: "var(--color-text)",
                  cursor: "pointer",
                }}
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  background: "var(--color-primary)",
                  color: "white",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
