"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { ZeffyDonationEmbed } from "./zeffy-donation-embed";

type ZeffyDonationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string;
  title: string;
  amountLabel?: string;
};

export function ZeffyDonationModal({
  isOpen,
  onClose,
  checkoutUrl,
  title,
  amountLabel,
}: ZeffyDonationModalProps) {
  const [activeCheckoutUrl, setActiveCheckoutUrl] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!isOpen) {
      setActiveCheckoutUrl(null);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setActiveCheckoutUrl(checkoutUrl);
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen, checkoutUrl]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="zeffy-donation-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex h-[min(95vh,1100px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col gap-1 border-b border-neutral-200 px-4 py-3 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <h2
              id="zeffy-donation-modal-title"
              className="pr-4 font-montserrat text-lg font-bold text-neutral-1000 sm:text-xl"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
              aria-label="Close donation form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {amountLabel ? (
            <p className="text-sm font-medium text-primary-600">
              {amountLabel}
            </p>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-neutral-50">
          {activeCheckoutUrl ? (
            <ZeffyDonationEmbed
              src={activeCheckoutUrl}
              title={title}
              minHeight={1200}
              className="w-full"
            />
          ) : (
            <div className="flex min-h-[1200px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
