import { z } from 'zod';

export const RequestSchema = z.object({
  id: z.union([z.string(), z.number()]),
  method: z.string(),
  params: z.any().optional(),
});
export type Request = z.infer<typeof RequestSchema>;

export const SuccessSchema = z.object({
  id: z.union([z.string(), z.number()]),
  result: z.any(),
});
export const ErrorSchema = z.object({
  id: z.union([z.string(), z.number()]),
  error: z.object({
    message: z.string(),
  }),
});
export const ResponseSchema = z.union([SuccessSchema, ErrorSchema]);
export type Response = z.infer<typeof ResponseSchema>;

export function encodeRequest(req: Request): string {
  return JSON.stringify(req);
}

export function decodeRequest(json: string): Request {
  return RequestSchema.parse(JSON.parse(json));
}

export function encodeResponse(res: Response): string {
  return JSON.stringify(res);
}

export function decodeResponse(json: string): Response {
  return ResponseSchema.parse(JSON.parse(json));
}
