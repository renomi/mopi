import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email({ message: 'invalid email' }),
  password: z.string().min(6, { message: 'at least 6 characters' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
