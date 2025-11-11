import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().email("Invalid email address").max(255);
export const nameSchema = z.string().trim().min(1, "Name is required").max(100);
export const textSchema = (maxLength = 1000) => 
  z.string().trim().max(maxLength, `Text must be less than ${maxLength} characters`);
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number");
export const urlSchema = z.string().url("Invalid URL");
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format");
export const numberSchema = z.number().or(z.string().transform((val) => Number(val)));

// Customer interaction validation
export const customerInteractionSchema = z.object({
  customer_name: nameSchema,
  interaction_type: z.string().min(1, "Interaction type is required"),
  notes: textSchema(2000),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  follow_up_required: z.boolean(),
});

// Task validation
export const taskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: textSchema(1000).optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
  due_date: dateSchema.optional(),
});

// Performance note validation
export const performanceNoteSchema = z.object({
  note: textSchema(500),
  rating: z.number().min(1).max(5),
});

// User management validation
export const userFormSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
});

// Audit trail validation  
export const auditEntrySchema = z.object({
  action: z.string().min(1, "Action is required").max(100),
  module: z.string().min(1, "Module is required"),
  details: textSchema(500).optional(),
});

export const useInputValidation = () => {
  const validateField = <T>(schema: z.ZodSchema<T>, value: unknown) => {
    try {
      schema.parse(value);
      return { isValid: true, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message };
      }
      return { isValid: false, error: "Validation error" };
    }
  };

  const sanitizeHtml = (html: string): string => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  };

  return {
    validateField,
    sanitizeHtml,
    emailSchema,
    nameSchema,
    textSchema,
    phoneSchema,
    urlSchema,
    customerInteractionSchema,
    taskSchema,
    performanceNoteSchema,
    userFormSchema,
    auditEntrySchema,
  };
};
