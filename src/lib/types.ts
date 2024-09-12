import { z } from "zod";

export const ScratchpadSchema = z.object({
  userId: z.string(),
  content: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Scratchpad = z.infer<typeof ScratchpadSchema>;
