"use client";
import { useMemo } from "react";
import { JSONContent } from "novel";

import { api } from "~/trpc/react";
import { Editor } from "~/components/editor";
import { Scratchpad } from "~/lib/types";

let updateTimeout: NodeJS.Timeout | null = null;
export function EditorUI({
  scratchpad,
  userId,
}: {
  scratchpad: Scratchpad;
  userId: string;
}) {
  const utils = api.useUtils();

  const updatePageContent = api.scratchpad.updateContent.useMutation({
    onSuccess: async () => {
      await utils.scratchpad.invalidate();
    },
  });

  function handleUpdateContent(content: JSONContent) {
    // Update the content after a delay to prevent too many requests
    if (updateTimeout) clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      console.log("Saving content:", content);
      updatePageContent.mutate({
        userId,
        content: JSON.stringify(content),
      });
      updateTimeout = null;
    }, 400);
  }

  const initialContent = useMemo<JSONContent | undefined>(
    () =>
      scratchpad?.content && scratchpad.content.startsWith("{")
        ? JSON.parse(scratchpad.content)
        : null,
    [scratchpad?.content],
  );

  return (
    <Editor initialValue={initialContent} onChange={handleUpdateContent} />
  );
}
