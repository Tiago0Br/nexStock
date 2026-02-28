import { toast } from 'sonner'
import { create } from 'zustand'
import { createMaterialRequest } from '@/http/create-material'
import { deleteMaterialRequest } from '@/http/delete-material'
import { getAllMaterialsRequest } from '@/http/get-all-materials'
import { updateMaterialRequest } from '@/http/update-material'
import { getErrorMessageByError } from '@/services/api'
import type { RawMaterial, SaveRawMaterial } from '@/types'

interface MaterialStore {
  materials: RawMaterial[]
  isLoading: boolean
  isSaving: boolean
  fetchMaterials: () => Promise<void>
  createMaterial: (material: SaveRawMaterial) => Promise<void>
  updateMaterial: (materialId: number, material: SaveRawMaterial) => Promise<void>
  deleteMaterial: (materialId: number) => Promise<void>
}

export const useMaterialStore = create<MaterialStore>((set) => ({
  materials: [],
  isLoading: false,
  isSaving: false,

  fetchMaterials: async () => {
    set({ isLoading: true })
    try {
      const materials = await getAllMaterialsRequest()
      set({ materials, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      toast.error(getErrorMessageByError(error))
    }
  },

  createMaterial: async (material) => {
    set({ isSaving: true })
    try {
      await createMaterialRequest({ material })
      set({ isSaving: false })
      useMaterialStore.getState().fetchMaterials()
      toast.success('Matéria-prima cadastrada com sucesso!')
    } catch (error) {
      set({ isSaving: false })
      toast.error(getErrorMessageByError(error))
    }
  },

  updateMaterial: async (materialId, material) => {
    set({ isSaving: true })
    try {
      await updateMaterialRequest({ materialId, material })
      set({ isSaving: false })
      useMaterialStore.getState().fetchMaterials()
      toast.success('Matéria-prima atualizada com sucesso!')
    } catch (error) {
      set({ isSaving: false })
      toast.error(getErrorMessageByError(error))
    }
  },

  deleteMaterial: async (materialId) => {
    set({ isLoading: true })
    try {
      await deleteMaterialRequest({ materialId })
      set((state) => ({
        materials: state.materials.filter((material) => material.id !== materialId),
        isLoading: false
      }))
      toast.success('Matéria-prima deletada!')
    } catch (error) {
      set({ isLoading: false })
      toast.error(getErrorMessageByError(error))
    }
  }
}))
