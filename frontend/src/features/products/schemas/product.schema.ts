import { z } from 'zod/v3'

export const productFormSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  price: z.coerce.number().gt(0, 'O preço deve ser maior que zero.'),
  composition: z
    .array(
      z.object({
        rawMaterialId: z.coerce.number().min(1, 'Selecione uma matéria-prima.'),
        quantityRequired: z.coerce
          .number({ message: 'A quantidade é obrigatória' })
          .min(1, 'A quantidade deve ser maior que zero.')
      })
    )
    .min(1, 'Adicione pelo menos um ingrediente na receita.')
})

export type ProductFormValues = z.infer<typeof productFormSchema>
