import React from "react";
import styles from "../ContentEditor.module.css";
import {UntranslatableField} from "../UntranslatableField";
import type {ImageAndSelectModel} from "../TaskModels";
import {asDataUrl, fileToBase64, getMediaUrlById, isBareBase64, isDataUrl} from "../mediaUtils";

export function ImageAndSelectEditor({
    value,
    onChange,
    disabled,
}: {
    value: ImageAndSelectModel;
    onChange: (v: ImageAndSelectModel) => void;
    disabled?: boolean;
}) {
    const [previews, setPreviews] = React.useState<(string | null)[]>([]);
    React.useEffect(() => {
        let active = true;
        const urlsToRevoke: string[] = [];
        (async () => {
            const res = await Promise.all(
                value.imageBlocks.map(async (block) => {
                    const image = block.image;
                    if (isDataUrl(image)) return image;
                    if (isBareBase64(image)) return asDataUrl(image, "image/*");
                    if (/^https?:\/\//i.test(image)) return image;
                    const url = await getMediaUrlById(image);
                    if (url) urlsToRevoke.push(url);
                    return url;
                })
            );
            if (active) setPreviews(res);
        })();
        return () => {
            active = false;
            urlsToRevoke.forEach((url) => url && URL.revokeObjectURL(url));
        };
    }, [value.imageBlocks]);

    const addBlock = () =>
        onChange({
            ...value,
            imageBlocks: [
                ...value.imageBlocks,
                {name: "", description: "", image: "", descriptionTranslate: ""},
            ],
        });

    const removeBlock = (idx: number) =>
        onChange({...value, imageBlocks: value.imageBlocks.filter((_, i) => i !== idx)});

    const updateBlock = (idx: number, patch: Partial<ImageAndSelectModel["imageBlocks"][number]>) =>
        onChange({
            ...value,
            imageBlocks: value.imageBlocks.map((block, i) => (i === idx ? {...block, ...patch} : block)),
        });

    const setImage = async (idx: number, file: File | null) => {
        if (!file) return;
        const base64 = await fileToBase64(file);
        updateBlock(idx, {image: base64});
    };

    const setVariantText = (idx: number, text: string) =>
        onChange({...value, variants: value.variants.map((variant, i) => (i === idx ? [text, variant[1]] : variant))});

    const setOnlyCorrect = (idx: number) =>
        onChange({...value, variants: value.variants.map((variant, i) => [variant[0], i === idx])});

    const addVariant = () => onChange({...value, variants: [...value.variants, ["", false]]});
    const removeVariant = (idx: number) => onChange({...value, variants: value.variants.filter((_, i) => i !== idx)});

    return (
        <div>
            <div className={styles.header}>
                <h4 className={styles.title} style={{fontSize: "1rem"}}>
                    Смотреть и выбирать
                </h4>
                {!disabled && (
                    <button className={styles.actionButton} onClick={addBlock}>
                        Добавить блок
                    </button>
                )}
            </div>
            <div className={styles.list}>
                {value.imageBlocks.map((block, i) => (
                    <div key={i} className={styles.card}>
                        {!disabled && (
                            <button className={styles.removeButton} onClick={() => removeBlock(i)}>
                                ✕ удалить
                            </button>
                        )}
                        <div className={styles.fieldsGrid}>
                            <label className={styles.label}>
                                Название
                                <UntranslatableField
                                    className={styles.input}
                                    value={block.name}
                                    onChange={(v) => updateBlock(i, {name: v})}
                                    disabled={disabled}
                                />
                            </label>
                            <label className={styles.label}>
                                Описание
                                <UntranslatableField
                                    className={styles.input}
                                    value={block.description ?? ""}
                                    onChange={(v) => updateBlock(i, {description: v})}
                                    disabled={disabled}
                                />
                            </label>
                            <label className={styles.label}>
                                Перевод описания
                                <UntranslatableField
                                    className={styles.input}
                                    value={block.descriptionTranslate ?? ""}
                                    onChange={(v) => updateBlock(i, {descriptionTranslate: v})}
                                    disabled={disabled}
                                />
                            </label>
                        </div>
                        <div className={styles.mediaBlock}>
                            {previews[i] ? (
                                <img className={styles.image} src={previews[i] || undefined}/>
                            ) : (
                                <div className={styles.label}>
                                    {block.image ? `изображение загружено (id: ${block.image})` : "изображение не выбрано"}
                                </div>
                            )}
                        </div>
                        <label className={styles.label}>
                            Изображение
                            <input
                                className={styles.input}
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(i, e.target.files?.[0] ?? null)}
                                disabled={disabled}
                            />
                        </label>
                    </div>
                ))}
            </div>
            <div className={styles.header} style={{marginTop: 8}}>
                <h4 className={styles.title} style={{fontSize: "0.95rem"}}>
                    Варианты ответа
                </h4>
                {!disabled && (
                    <button className={styles.actionButton} onClick={addVariant}>
                        Добавить вариант
                    </button>
                )}
            </div>
            <div className={styles.list}>
                {value.variants.map(([text, correct], i) => (
                    <div key={i} className={styles.card}>
                        {!disabled && (
                            <button className={styles.removeButton} onClick={() => removeVariant(i)}>
                                ✕ удалить
                            </button>
                        )}
                        <div className={styles.fieldsGrid}>
                            <label className={styles.label}>
                                Текст
                                <UntranslatableField
                                    className={styles.input}
                                    value={text}
                                    onChange={(v) => setVariantText(i, v)}
                                    disabled={disabled}
                                />
                            </label>
                            <div className={styles.label} style={{display: "flex", alignItems: "center", gap: 8}}>
                                <input
                                    type="radio"
                                    name="image-correct"
                                    checked={correct}
                                    onChange={() => setOnlyCorrect(i)}
                                    disabled={disabled}
                                />
                                <span>Правильный</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

