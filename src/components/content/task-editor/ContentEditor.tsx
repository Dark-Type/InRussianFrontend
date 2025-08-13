import React, { useState, useRef, useEffect } from "react";
import type {
  TaskContent,
  ContentType,
} from "../../../context/content/ContentProvider.tsx";
import { mediaService } from "../../../services/MediaService.ts";

interface ContentEditorProps {
  contents: TaskContent[];
  onContentsChange: (contents: TaskContent[]) => void;
}

export const ContentEditor = ({
  contents,
  onContentsChange,
}: ContentEditorProps) => {
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addContent = (type: ContentType) => {
    const newContent: TaskContent = {
      id: `content_${Date.now()}`,
      contentType: type,
      orderNum: contents.length,
      description: "",
      text: type === "TEXT" ? "" : undefined,
      contentId: undefined,
    };

    if (type !== "TEXT") {
      // Создаем новый input элемент вместо использования ref
      const input = document.createElement("input");
      input.type = "file";
      input.style.display = "none";
      input.accept =
        type === "IMAGE" ? "image/*" : type === "AUDIO" ? "audio/*" : "video/*";

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          try {
            setIsUploading(true);
            const url = URL.createObjectURL(file);

            const fileName = file.name;
            const mimeType = file.type;
            const fileSize = file.size;
            const fileType = type;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", fileName);
            formData.append("mimeType", mimeType);
            formData.append("fileSize", fileSize.toString());
            formData.append("fileType", fileType);

            const contentId = (await mediaService.uploadMediaWithMeta(formData))
              .mediaId;
            // console.log(contentId);
            newContent.contentId = contentId;
            onContentsChange([
              ...contents,
              {
                ...newContent,
                contentId,
                url,
                file,
              },
            ]);
          } catch (error) {
            console.error("Ошибка загрузки медиа:", error);
          } finally {
            setIsUploading(false);
            document.body.removeChild(input);
          }
        }
      };

      document.body.appendChild(input);
      input.click();
    } else {
      onContentsChange([...contents, newContent]);
    }
  };

  const updateContent = (id: string, updates: Partial<TaskContent>) => {
    onContentsChange(
      contents.map((content) =>
        content.id === id ? { ...content, ...updates } : content
      )
    );
  };

  const removeContent = async (id: string) => {
    try {
      const contentToDelete = contents.find((c) => c.contentId === id);
      console.log(contentToDelete)
      if (!contentToDelete) return;
      if (contentToDelete.contentId) {
        try {
          await mediaService.deleteMedia(contentToDelete.contentId);
          console.log(
            `Медиа ${contentToDelete.contentId} успешно удалено на сервере`
          );
        } catch (error) {
          console.error(
            `Ошибка удаления медиа на сервере: ${contentToDelete.contentId}`,
            error
          );
        }
      }
      if (mediaUrls[id]) {
        URL.revokeObjectURL(mediaUrls[id]);
      }
      const filtered = contents.filter((c) => c.id !== id);
      const reordered = filtered.map((c, index) => ({ ...c, orderNum: index }));
      setMediaUrls((prev) => {
        const newUrls = { ...prev };
        delete newUrls[id];
        return newUrls;
      });

      onContentsChange(reordered);
    } catch (error) {
      console.error("Ошибка при удалении контента:", error);
    }
  };

  const fetchMedia = async (contentId: string, mediaId: string) => {
    try {
      const mediaBlob = await mediaService.getMediaById(mediaId);
      if (!mediaBlob || mediaBlob.size === 0) {
        throw new Error("Получен пустой Blob");
      }
      const mediaUrl = URL.createObjectURL(mediaBlob);
      setMediaUrls((prev) => ({
        ...prev,
        [contentId]: mediaUrl,
      }));
    } catch (error) {
      console.error("Ошибка загрузки медиа:", error);
      setMediaUrls((prev) => ({
        ...prev,
        [contentId]: "/fallback-image.jpg",
      }));
    }
  };

  useEffect(() => {
    contents.forEach((content) => {
      if (content.contentType !== "TEXT") {
        if (content.contentId && !mediaUrls[content.contentId]) {
          fetchMedia(content.contentId, content.contentId);
        } else if (content.url && !mediaUrls[content.contentId]) {
          setMediaUrls((prev) => ({
            ...prev,
            [content.contentId]: content.url!,
          }));
        }
      }
    });

    return () => {
      Object.values(mediaUrls).forEach(URL.revokeObjectURL);
    };
  }, [contents]);

  console.log(contents);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3 style={{ margin: 0, fontWeight: 600 }}>Содержимое задачи</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => addContent("TEXT")}
            disabled={isUploading}
            style={{
              padding: "6px 12px",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              opacity: isUploading ? 0.5 : 1,
            }}
          >
            Текст
          </button>
          <button
            type="button"
            onClick={() => addContent("AUDIO")}
            disabled={isUploading}
            style={{
              padding: "6px 12px",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              opacity: isUploading ? 0.5 : 1,
            }}
          >
            Аудио
          </button>
          <button
            type="button"
            onClick={() => addContent("IMAGE")}
            disabled={isUploading}
            style={{
              padding: "6px 12px",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              opacity: isUploading ? 0.5 : 1,
            }}
          >
            Изображение
          </button>
          <button
            type="button"
            onClick={() => addContent("VIDEO")}
            disabled={isUploading}
            style={{
              padding: "6px 12px",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              opacity: isUploading ? 0.5 : 1,
            }}
          >
            Видео
          </button>
        </div>
      </div>

      {isUploading && (
        <div style={{ marginBottom: "16px", textAlign: "center" }}>
          Загрузка медиафайла...
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {contents.map((content, index) => (
          <div
            key={content.id}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "16px",
              position: "relative",
            }}
          >
            <button
              onClick={() => removeContent(content.contentId)}
              style={{
                position: "absolute",
                right: "16px",
                top: "16px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "2px 4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <span>×</span>
              <span style={{ fontSize: "0.7rem" }}>Удалить</span>
            </button>

            {content.contentType === "TEXT" ? (
              <textarea
                value={content.text || ""}
                onChange={(e) =>
                  updateContent(content.id, { text: e.target.value })
                }
                placeholder="Введите текст..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                  resize: "vertical",
                  boxSizing: "border-box",
                  marginBottom: "12px",
                }}
              />
            ) : (
              <div style={{ marginBottom: "12px" }}>
                {(mediaUrls[content.contentId] || content.url) && (
                  <div style={{ marginBottom: "8px" }}>
                    {content.contentType === "IMAGE" && (
                      <img
                        src={mediaUrls[content.contentId] || content.url}
                        alt={content.description || ""}
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          console.error("Ошибка загрузки изображения");
                        }}
                      />
                    )}

                    {content.contentType === "AUDIO" && (
                      <audio controls style={{ width: "90%", zIndex: "" }}>
                        <source
                          src={mediaUrls[content.contentId] || content.url}
                          type="audio/mpeg"
                        />
                      </audio>
                    )}

                    {content.contentType === "VIDEO" && (
                      <video
                        controls
                        style={{ maxWidth: "300px", maxHeight: "200px" }}
                      >
                        <source
                          src={mediaUrls[content.contentId] || content.url}
                          type="video/mp4"
                        />
                      </video>
                    )}
                  </div>
                )}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  Описание
                </label>
                <input
                  type="text"
                  value={content.description || ""}
                  onChange={(e) =>
                    updateContent(content.id, { description: e.target.value })
                  }
                  placeholder="Описание контента"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  Транскрипция
                </label>
                <input
                  type="text"
                  value={content.transcription || ""}
                  onChange={(e) =>
                    updateContent(content.id, {
                      transcription: e.target.value,
                    })
                  }
                  placeholder="Транскрипция"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  Перевод
                </label>
                <input
                  type="text"
                  value={content.translation || ""}
                  onChange={(e) =>
                    updateContent(content.id, { translation: e.target.value })
                  }
                  placeholder="Перевод"
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {contents.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "32px",
            color: "var(--color-text-secondary)",
            border: "2px dashed var(--color-border)",
            borderRadius: "8px",
          }}
        >
          Добавьте содержимое для задачи
        </div>
      )}
    </div>
  );
};
