"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

// Only import this to the next file
export const MarkdownEditor = forwardRef(
  ({ textareaProps, onChange, ...props }, ref) => {
    return (
      <MDEditor
        {...props}
        onChange={(value, event) =>
          onChange({ ...event, target: { ...event.target, value } })
        }
        textareaProps={textareaProps}
        ref={ref}
      />
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";
