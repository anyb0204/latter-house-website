"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-forest mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            "w-full rounded-md border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-colors resize-y min-h-[100px]",
            error ? "border-red-400" : "border-mint/60",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
