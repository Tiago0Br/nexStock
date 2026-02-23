import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MainLayout } from './main-layout'

describe('MainLayout Component', () => {
  it('Should render the application title correctly (for desktop and mobile)', () => {
    const wrapper = render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    )

    expect(wrapper.getAllByText(/Nex/i)).toHaveLength(2)
    expect(wrapper.getAllByText(/Stock/i)).toHaveLength(2)
  })

  it('Should render all items in the sidebar menu.', () => {
    const wrapper = render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    )

    expect(wrapper.getByText('Dashboard (Produção)')).toBeInTheDocument()
    expect(wrapper.getByText('Produtos')).toBeInTheDocument()
    expect(wrapper.getByText('Matérias-Primas')).toBeInTheDocument()
  })
})
