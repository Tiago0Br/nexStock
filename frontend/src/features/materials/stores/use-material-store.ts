import { create } from 'zustand'
import { api } from '@/services/api'
import type { RawMaterial, SaveRawMaterial } from '@/types'

interface MaterialStore {
  materials: RawMaterial[]
  isLoading: boolean
  fetchMaterials: () => Promise<void>
  createMaterial: (material: SaveRawMaterial) => Promise<void>
  updateMaterial: (materialId: number, material: SaveRawMaterial) => Promise<void>
  deleteMaterial: (materialId: number) => Promise<void>
}

export const useMaterialStore = create<MaterialStore>((set) => ({
  materials: [],
  isLoading: false,

  fetchMaterials: async () => {
    set({ isLoading: true })
    try {
      const response = await api.get('/raw-materials')
      set({ materials: response.data, isLoading: false })
    } catch (error) {
      console.error('Erro ao buscar matérias-primas:', error)
      set({ isLoading: false })
    }
  },

  createMaterial: async (material) => {
    try {
      await api.post('/raw-materials', material)
      useMaterialStore.getState().fetchMaterials()
    } catch (error) {
      console.error('Erro ao criar matéria-prima:', error)
    }
  },

  updateMaterial: async (materialId, material) => {
    try {
      await api.put(`/raw-materials/${materialId}`, material)
      useMaterialStore.getState().fetchMaterials()
    } catch (error) {
      console.error('Erro ao atualizar a matéria-prima:', error)
    }
  },

  deleteMaterial: async (materialId) => {
    set({ isLoading: true })
    try {
      await api.delete(`/raw-materials/${materialId}`)
      set((state) => ({
        materials: state.materials.filter((material) => material.id !== materialId),
        isLoading: false
      }))
    } catch (error) {
      console.error('Erro ao deletar a matéria-prima:', error)
      set({ isLoading: false })
    }
  }
}))
