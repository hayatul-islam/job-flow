"use client";
import { Trash2, X } from "lucide-react";
import { Button } from "../ui/button";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  title?: string;
  description?: string;
}

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  isDeleting = false,
  title = "Delete this item?",
  description = "This will permanently remove the item and all associated data. This action cannot be undone.",
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 w-full max-w-sm mx-4 p-6 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="w-[46px] h-[46px] rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center shrink-0">
            <Trash2 size={20} className="text-red-500" strokeWidth={1.8} />
          </div>
          <button
            onClick={onClose}
            className="w-[30px] h-[30px] rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <h2 className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 mb-1.5">
          {title}
        </h2>
        <p className="text-[13.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>

        <div className="flex gap-2.5 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 h-[38px] text-sm rounded-[10px] border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 h-[38px] text-sm rounded-[10px] bg-red-500 hover:bg-red-600 text-white border-0 font-medium disabled:opacity-80"
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeOpacity="0.3"
                  />
                  <path
                    d="M12 2a10 10 0 0110 10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                Deleting...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Trash2 size={13} strokeWidth={2.2} />
                Delete
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
