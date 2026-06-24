export const formFieldGroupClassName = "space-y-2.5";

export const formFieldClassName =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-1000 placeholder:text-neutral-500 outline-none focus-visible:border-primary-500 focus-visible:ring-[3px] focus-visible:ring-primary-500/20 disabled:opacity-50";

export const formSelectTriggerClassName =
  "h-auto w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-1000 shadow-none data-[size=default]:h-auto data-[placeholder]:text-neutral-500 outline-none focus-visible:border-primary-500 focus-visible:ring-[3px] focus-visible:ring-primary-500/20 disabled:opacity-50";

export const formTextareaClassName =
  "block min-h-28 w-full resize-y rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-1000 placeholder:text-neutral-500 outline-none focus-visible:border-primary-500 focus-visible:ring-[3px] focus-visible:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50";

/** Overrides applied on top of `formTextareaClassName` via shadcn `Textarea`. */
export const formLongTextareaClassName =
  "h-[135px] min-h-[135px] p-3 text-base leading-[1.2]";

/** @deprecated Use `formFieldClassName` */
export const applicationFieldClassName = formFieldClassName;

/** @deprecated Use `formTextareaClassName` */
export const applicationTextareaClassName = formTextareaClassName;
