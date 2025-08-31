// frontend/src/components/content/CreateEditModal.tsx
import React, { useEffect, useState } from "react";
import { mediaService } from "../../services/MediaService.ts";

interface CreateEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: {
        name: string;
        description?: string;
        authorUrl?: string;
        language?: string;
        coursePoster?: string | null;
        isPublished?: boolean;
    }) => Promise<void>;
    onDelete?: () => Promise<void>;
    title: string;
    initialName?: string;
    initialDescription?: string;
    isEdit?: boolean;
    deleteWarning?: string;
    type?: "course" | "section" | "theme";
    initialAuthorUrl?: string;
    initialLanguage?: string;
    initialCoursePosterId?: string | null;
    initialIsPublished?: boolean;
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
                                    type = "course",
                                    initialAuthorUrl = "",
                                    initialLanguage = "",
                                    initialCoursePosterId = null,
                                    initialIsPublished = false,
                                }: CreateEditModalProps) => {
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Course-specific
    const [authorUrl, setAuthorUrl] = useState(initialAuthorUrl);
    const [language, setLanguage] = useState(initialLanguage);
    const [coursePosterId, setCoursePosterId] = useState<string | null>(initialCoursePosterId);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [isPublished, setIsPublished] = useState<boolean>(initialIsPublished ?? false);

    useEffect(() => {
        if (isOpen) {
            setName(initialName);
            setDescription(initialDescription);
            setAuthorUrl(initialAuthorUrl);
            setLanguage(initialLanguage);
            setCoursePosterId(initialCoursePosterId ?? null);
            setSelectedFileName("");
            setIsPublished(initialIsPublished ?? false);
        }
    }, [
        isOpen,
        initialName,
        initialDescription,
        initialAuthorUrl,
        initialLanguage,
        initialCoursePosterId,
        initialIsPublished,
    ]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            setIsLoading(true);
            await onSave({
                name: name.trim(),
                description: description?.trim() || undefined,
                authorUrl: authorUrl?.trim() || undefined,
                language: language?.trim() || undefined, // должен соответствовать SystemLanguages
                coursePoster: coursePosterId ?? null,     // только mediaId
                isPublished,
            });
            onClose();
        } catch (error) {
            console.error("Ошибка сохранения:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!onDelete) return;
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

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append("mimeType", file.type);
            formData.append("fileSize", String(file.size));
            // Постер всегда IMAGE
            formData.append("fileType", "IMAGE");

            const resp = await mediaService.uploadMediaWithMeta(formData);
            const mediaId = resp.mediaId;
            setCoursePosterId(mediaId);
            setSelectedFileName(file.name);
        } catch (error) {
            console.error("Ошибка загрузки постера курса:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = async () => {
        if (!coursePosterId) {
            setSelectedFileName("");
            return;
        }
        try {
            setIsLoading(true);
            await mediaService.deleteMedia(coursePosterId);
        } catch (error) {
            console.error("Ошибка удаления медиа:", error);
        } finally {
            setCoursePosterId(null);
            setSelectedFileName("");
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: "var(--color-card)",
                    borderRadius: 8,
                    padding: 24,
                    minWidth: 400,
                    maxWidth: 640,
                }}
            >
                {!showDeleteConfirm ? (
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ marginTop: 0 }}>{title}</h3>

                        <label style={{ display: "block", marginTop: 12 }}>
                            Название
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{ width: "100%", marginTop: 6 }}
                            />
                        </label>

                        <label style={{ display: "block", marginTop: 12 }}>
                            Описание
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                style={{ width: "100%", marginTop: 6 }}
                            />
                        </label>

                        {type === "course" && (
                            <>
                                <label style={{ display: "block", marginTop: 12 }}>
                                    Автор URL
                                    <input
                                        type="url"
                                        value={authorUrl}
                                        onChange={(e) => setAuthorUrl(e.target.value)}
                                        placeholder="https://..."
                                        style={{ width: "100%", marginTop: 6 }}
                                    />
                                </label>

                                <label style={{ display: "block", marginTop: 12 }}>
                                    Язык (SystemLanguages)
                                    <input
                                        type="text"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value.toUpperCase())}
                                        placeholder="например: RUSSIAN"
                                        style={{ width: "100%", marginTop: 6 }}
                                    />
                                </label>

                                <div style={{ marginTop: 12 }}>
                                    <div style={{ marginBottom: 6, fontWeight: 600 }}>Постер курса (IMAGE)</div>
                                    {!coursePosterId ? (
                                        <input type="file" accept="image/*" onChange={handleImageChange} />
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            <span>Загружено: {selectedFileName || "image"}</span>
                                            <span style={{ color: "var(--color-text-secondary)" }}>
                        mediaId: {coursePosterId}
                      </span>
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                style={{
                                                    marginLeft: "auto",
                                                    background: "#dc3545",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: 4,
                                                    padding: "6px 10px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                                    <input
                                        type="checkbox"
                                        checked={isPublished}
                                        onChange={(e) => setIsPublished(e.target.checked)}
                                    />
                                    Опубликован
                                </label>
                            </>
                        )}

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
                            {isEdit && onDelete && (
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    style={{
                                        background: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 4,
                                        padding: "8px 12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Удалить
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                style={{
                                    background: "var(--color-border)",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                }}
                            >
                                Отмена
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !name.trim()}
                                style={{
                                    background: "var(--color-primary)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                }}
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <h3 style={{ marginTop: 0 }}>Подтверждение удаления</h3>
                        {deleteWarning && (
                            <p style={{ color: "var(--color-text-secondary)" }}>{deleteWarning}</p>
                        )}
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                style={{
                                    background: "var(--color-border)",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                }}
                            >
                                Отмена
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isLoading}
                                style={{
                                    background: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};