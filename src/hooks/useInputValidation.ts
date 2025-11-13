import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().trim().email("Invalid email address").max(255);
export const nameSchema = z.string().trim().min(1, "Name is required").max(100);
export const textSchema = (maxLength = 1000) => 
  z.string().trim().max(maxLength, `Text must be less than ${maxLength} characters`);
export const phoneSchema = z.string().trim().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number").optional().or(z.literal(''));
export const urlSchema = z.string().trim().url("Invalid URL").optional().or(z.literal(''));
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format");
export const numberSchema = z.number().positive().or(z.string().transform((val) => {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}));

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

// CRM Client validation
export const clientSchema = z.object({
  name: nameSchema,
  industry: z.string().trim().max(100).optional(),
  email: emailSchema.optional().or(z.literal('')),
  primaryContact: nameSchema.optional().or(z.literal('')),
  notes: textSchema(2000).optional(),
});

// CRM Contact validation
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  title: z.string().trim().max(100).optional(),
  clientId: z.string().min(1, "Client is required"),
});

// CRM Interaction validation
export const interactionSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  contactId: z.string().min(1, "Contact is required"),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  description: textSchema(2000).optional(),
  type: z.enum(["call", "email", "meeting", "note", "chat", "video-call"]),
});

// CRM Opportunity validation
export const opportunitySchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  clientId: z.string().min(1, "Client is required"),
  value: numberSchema.optional(),
  description: textSchema(2000).optional(),
});

// Marketing Task validation
export const marketingTaskSchema = z.object({
  title: z.string().trim().min(1, "Task title is required").max(200),
  description: textSchema(2000),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().optional(),
  trackingMethod: z.string().trim().max(500).optional(),
});

// Evaluation scheduling validation
export const evaluationScheduleSchema = z.object({
  client: z.string().min(1, "Client is required"),
  location: z.string().min(1, "Location is required"),
  evaluator: z.string().min(1, "Evaluator is required"),
  date: z.date({ required_error: "Date is required" }),
  notes: textSchema(1000).optional(),
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
    clientSchema,
    contactSchema,
    interactionSchema,
    opportunitySchema,
    marketingTaskSchema,
    evaluationScheduleSchema,
  };
};
