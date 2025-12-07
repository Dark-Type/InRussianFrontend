import React from "react";
import styles from "../ContentEditor.module.css";
import {isBareBase64, isDataUrl} from "../mediaUtils";

interface FileInputProps {
    value?: string | null; // The current ID or URL or Base64
    onChange: (file: File | null) => void;
    accept?: string;
    disabled?: boolean;
    label?: string;
    className?: string;
}

export function FileInput({value, onChange, accept, disabled, label, className}: FileInputProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const hasValue = !!value;
    const isLong = value && (isDataUrl(value) || isBareBase64(value));
    const displayText = hasValue
        ? (isLong ? "Файл загружен" : `Файл: ${value}`)
        : "Файл не выбран";

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onChange(file);
    };

    return (
        <div className={className}>
            {label && <div className={styles.label} style={{marginBottom: 4}}>{label}</div>}
            <div style={{display: "flex", alignItems: "center", gap: 12}}>
                <button
                    type="button"
                    className={styles.actionButton}
                    onClick={handleClick}
                    disabled={disabled}
                    style={{
                        background: "transparent", 
                        color: "var(--color-text)", 
                        border: "1px solid var(--color-border)",
                        padding: "6px 12px"
                    }}
                >
                    {hasValue ? "Изменить файл" : "Выбрать файл"}
                </button>
                <span style={{fontSize: "0.9rem", color: "var(--color-text-secondary)", fontStyle: hasValue ? "normal" : "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "300px"}}>
                    {displayText}
                </span>
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    disabled={disabled}
                    style={{display: "none"}}
                />
            </div>
        </div>
    );
}
