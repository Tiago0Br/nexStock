import { z } from 'zod/v3'

export const materialFormSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  stockQuantity: z.coerce
    .number({ message: 'A quantidade é obrigatória' })
    .min(0, 'O estoque não pode ser negativo.')
})

export type MaterialFormValues = z.infer<typeof materialFormSchema>
