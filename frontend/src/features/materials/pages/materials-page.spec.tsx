import { fireEvent, render } from '@testing-library/react'
import { useMaterialStore } from '../stores/use-material-store'
import { MaterialsPage } from './materials-page'

vi.mock('../stores/use-material-store', () => ({
  useMaterialStore: vi.fn()
}))

const mockStoreBase = {
  materials: [],
  isLoading: false,
  isSaving: false,
  fetchMaterials: vi.fn(),
  createMaterial: vi.fn(),
  updateMaterial: vi.fn(),
  deleteMaterial: vi.fn()
}

describe('Materials Page', () => {
  it('Should render the page heading and the new material button.', () => {
    vi.mocked(useMaterialStore).mockReturnValue({ ...mockStoreBase })

    const wrapper = render(<MaterialsPage />)

    expect(wrapper.getByText('Matérias-Primas')).toBeInTheDocument()
    expect(wrapper.getByText(/Nova Matéria-prima/i)).toBeInTheDocument()
  })

  it('Should call fetchMaterials on mount.', () => {
    const fetchMaterials = vi.fn()
    vi.mocked(useMaterialStore).mockReturnValue({ ...mockStoreBase, fetchMaterials })

    render(<MaterialsPage />)

    expect(fetchMaterials).toHaveBeenCalledOnce()
  })

  it('Should display skeletons in the table while materials are loading.', () => {
    vi.mocked(useMaterialStore).mockReturnValue({ ...mockStoreBase, isLoading: true })

    const wrapper = render(<MaterialsPage />)

    const skeletons = wrapper.container.querySelectorAll('[data-slot="skeleton"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('Should display an empty message when there are no materials.', () => {
    vi.mocked(useMaterialStore).mockReturnValue({ ...mockStoreBase, materials: [] })

    const wrapper = render(<MaterialsPage />)

    expect(wrapper.getByText(/Nenhum insumo cadastrado ainda/i)).toBeInTheDocument()
  })

  it('Should render the materials list in the table.', () => {
    const materials = [
      { id: 1, name: 'Farinha de Trigo', stockQuantity: 10, unit: 'KG' },
      { id: 2, name: 'Açúcar Refinado', stockQuantity: 5, unit: 'KG' }
    ]
    vi.mocked(useMaterialStore).mockReturnValue({ ...mockStoreBase, materials })

    const wrapper = render(<MaterialsPage />)

    expect(wrapper.getByText('Farinha de Trigo')).toBeInTheDocument()
    expect(wrapper.getByText('Açúcar Refinado')).toBeInTheDocument()
  })

  it('Should open the new material dialog when clicking the "Nova Matéria-prima" button.', () => {
    vi.mocked(useMaterialStore).mockReturnValue({ ...mockStoreBase })

    const wrapper = render(<MaterialsPage />)

    const button = wrapper.getByText(/Nova Matéria-prima/i)
    fireEvent.click(button)

    expect(wrapper.getByText('Matéria-prima')).toBeInTheDocument()
    expect(wrapper.getByText('Cadastrar Nova Matéria-Prima')).toBeInTheDocument()
  })
})
