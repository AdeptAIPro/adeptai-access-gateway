
import { z } from "zod";

export const importFormSchema = z.object({
  sourceType: z.string({
    required_error: "Please select a source type",
  }),
  sourceName: z.string().min(2, {
    message: "Source name must be at least 2 characters.",
  }),
  resumeText: z.string().min(50, {
    message: "Resume text must be at least 50 characters.",
  }).optional(),
  fileUpload: z.any().optional(),
  sourceUrl: z.string().url({
    message: "Please enter a valid URL",
  }).optional(),
});

export type ImportFormValues = z.infer<typeof importFormSchema>;
