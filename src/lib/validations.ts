import { z } from 'zod';

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[+]?[\d\s-()]{7,15}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .max(200, 'Company name must not exceed 200 characters')
    .optional()
    .or(z.literal('')),
  enquiry_type: z.enum([
    'general',
    'product',
    'franchise',
    'contract_manufacturing',
    'career',
    'media',
  ], { required_error: 'Please select an enquiry type' }),
  subject: z
    .string()
    .max(200, 'Subject must not exceed 200 characters')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters'),
});

export type EnquirySchemaType = z.infer<typeof enquirySchema>;

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
  category_id: z.string().uuid().optional().nullable(),
  composition: z.string().optional(),
  indications: z.string().optional(),
  dosage: z.string().optional(),
  pack_size: z.string().optional(),
  storage: z.string().optional(),
  prescription_type: z.enum(['rx', 'otc']).default('rx'),
  images: z.array(z.string()).default([]),
  brochure_url: z.string().url().optional().or(z.literal('')),
  status: z.enum(['active', 'draft']).default('draft'),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
