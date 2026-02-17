import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { RawMaterial } from '@/types'
import { type MaterialFormValues, materialFormSchema } from '../schemas/material.schema'
import { useMaterialStore } from '../stores/use-material-store'

interface MaterialFormDialogProps {
  isOpen: boolean
  onOpenChange: () => void
  material?: RawMaterial
}

export function MaterialFormDialog({
  isOpen,
  onOpenChange,
  material
}: MaterialFormDialogProps) {
  const isEditing = !!material

  const { createMaterial, updateMaterial } = useMaterialStore()

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      name: material?.name ?? '',
      stockQuantity: material?.stockQuantity ?? 0,
      unit: material?.unit ?? 'UN'
    }
  })

  useEffect(() => {
    if (material) {
      form.reset({
        name: material.name,
        stockQuantity: material.stockQuantity,
        unit: material?.unit ?? 'UN'
      })
    }
  }, [material, form])

  const onSubmit = async ({ name, stockQuantity, unit }: MaterialFormValues) => {
    if (isEditing && material?.id) {
      await updateMaterial(material.id, {
        name,
        stockQuantity,
        unit
      })
      toast.success('Matéria-prima atualizada com sucesso!')
    } else {
      await createMaterial({
        name,
        stockQuantity,
        unit
      })
      toast.success('Matéria-prima cadastrada com sucesso!')
    }

    form.reset()
    onOpenChange()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Matéria-prima</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Atualizar Matéria-Prima' : 'Cadastrar Nova Matéria-Prima'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Insumo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Farinha de Trigo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade em Estoque</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 150" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidade de Medida</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UN">Unidade (UN)</SelectItem>
                      <SelectItem value="KG">Quilograma (KG)</SelectItem>
                      <SelectItem value="G">Grama (G)</SelectItem>
                      <SelectItem value="L">Litro (L)</SelectItem>
                      <SelectItem value="ML">Mililitro (ML)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onOpenChange}>
                Cancelar
              </Button>
              <Button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
