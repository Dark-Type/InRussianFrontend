import React, { useEffect, useState } from "react";

interface CreateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description?: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  title: string;
  initialName?: string;
  initialDescription?: string;
  isEdit?: boolean;
  deleteWarning?: string;
}

export const CreateEditModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  title,
  initialName = "",
  initialDescription = "",
  isEdit = false,
  deleteWarning,
}: CreateEditModalProps) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setDescription(initialDescription);
    }
  }, [isOpen, initialName, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsLoading(true);
      await onSave(name.trim(), description.trim() || undefined);
      setName("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) {
        return;
    }

    try {
      setIsLoading(true);
      await onDelete();
      onClose();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Ошибка удаления:", error);
    } finally {
      setIsLoading(false);
    }
  };

  

  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "var(--color-card)",
          borderRadius: "8px",
          padding: "24px",
          minWidth: "400px",
          maxWidth: "500px",
        }}
      >
        {!showDeleteConfirm ? (
          <>
            <h3 style={{ margin: "0 0 16px 0", fontWeight: 600 }}>{title}</h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: 500,
                  }}
                >
                  Название *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: 500,
                  }}
                >
                  Описание
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent:
                    isEdit && onDelete ? "space-between" : "flex-end",
                }}
              >
                {isEdit && onDelete && (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isLoading}
                    style={{
                      padding: "10px 20px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      fontWeight: 500,
                    }}
                  >
                    🗑️ Удалить
                  </button>
                )}

                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    style={{
                      padding: "10px 20px",
                      background: "var(--color-border)",
                      color: "var(--color-text)",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={!name.trim() || isLoading}
                    style={{
                      padding: "10px 20px",
                      background: isLoading
                        ? "var(--color-border)"
                        : "var(--color-primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {isLoading
                      ? "Сохранение..."
                      : isEdit
                      ? "Сохранить"
                      : "Создать"}
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <h3
              style={{
                margin: "0 0 16px 0",
                fontWeight: 600,
                color: "#dc3545",
              }}
            >
              ⚠️ Подтверждение удаления
            </h3>

            <div style={{ marginBottom: "24px" }}>
              <p style={{ margin: "0 0 12px 0" }}>
                Вы действительно хотите удалить <strong>{name}</strong>?
              </p>
              {deleteWarning && (
                <div
                  style={{
                    padding: "12px",
                    background: "#fff3cd",
                    border: "1px solid #ffeaa7",
                    borderRadius: "6px",
                    color: "#856404",
                  }}
                >
                  <strong>Внимание:</strong> {deleteWarning}
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
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isLoading}
                style={{
                  padding: "10px 20px",
                  background: "var(--color-border)",
                  color: "var(--color-text)",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Отмена
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                style={{
                  padding: "10px 20px",
                  background: isLoading ? "#6c757d" : "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontWeight: 500,
                }}
              >
                {isLoading ? "Удаление..." : "Удалить навсегда"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
