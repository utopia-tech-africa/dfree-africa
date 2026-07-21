"use client";

import { useTranslations } from "next-intl";
import { useId, useRef } from "react";

import {
  recognitionLogoAcceptedMimeTypes,
  recognitionLogoMaxBytes,
} from "@/lib/forms/schemas/leadership-institute-sponsor";
import { cn } from "@/lib/utils";

type LogoFileUploadFieldProps = {
  value: File | null;
  disabled?: boolean;
  error?: string;
  onChange: (file: File | null) => void;
  onValidationError?: (message: string | null) => void;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function LogoFileUploadField({
  value,
  disabled = false,
  error,
  onChange,
  onValidationError,
}: LogoFileUploadFieldProps) {
  const t = useTranslations("leadershipInstituteSponsor.step3.logoUpload");
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const accept = recognitionLogoAcceptedMimeTypes.join(",");

  const validateFile = (file: File): string | null => {
    if (file.size > recognitionLogoMaxBytes) {
      return t("errors.tooLarge");
    }

    if (
      !(recognitionLogoAcceptedMimeTypes as readonly string[]).includes(
        file.type,
      )
    ) {
      return t("errors.invalidType");
    }

    return null;
  };

  const handleFile = (file: File | null) => {
    if (!file) {
      onValidationError?.(null);
      onChange(null);
      return;
    }

    const validationError = validateFile(file);

    if (validationError) {
      onValidationError?.(validationError);
      onChange(null);
      return;
    }

    onValidationError?.(null);
    onChange(file);
  };

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="row-span-2 flex h-full min-h-[52px] flex-col">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          handleFile(file);
          event.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(event) => {
          if (disabled) {
            return;
          }

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFilePicker();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();

          if (disabled) {
            return;
          }

          const file = event.dataTransfer.files?.[0] ?? null;
          handleFile(file);
        }}
        onClick={openFilePicker}
        className={cn(
          "flex min-h-[52px] flex-1 cursor-pointer flex-col text-center",
          disabled && "cursor-not-allowed opacity-60",
        )}
        aria-invalid={Boolean(error)}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4 pt-3">
          {value ? (
            <div className="font-poppins text-base leading-[1.3] text-neutral-1000">
              <p className="font-medium">{value.name}</p>
              <p className="text-sm text-neutral-600">
                {formatFileSize(value.size)}
              </p>
            </div>
          ) : (
            <>
              <p className="font-poppins text-base leading-[1.3] text-neutral-900">
                <span>{t("dropzonePrefix")} </span>
                <span className="text-primary-500">{t("browse")}</span>
              </p>
              <p className="font-poppins text-sm leading-[1.3] text-neutral-500">
                {t("maxSize")}
              </p>
            </>
          )}
        </div>

        <div
          className={cn(
            "w-full border-b border-dashed border-neutral-300",
            error && "border-red-500",
          )}
        />
      </div>

      {error ? (
        <p className="mt-2 text-center text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
