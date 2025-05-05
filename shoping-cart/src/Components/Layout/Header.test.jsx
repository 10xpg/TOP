import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'
import { BrowserRouter } from 'react-router-dom'

describe('Header', () => {
  it('should render Logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const logo = screen.getByText(/taberna/i).textContent

    expect(logo).toMatch(/taberna/i)
  })

  it('should render Navbar', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const nav = screen.getByText(/home/i).textContent

    expect(nav).toMatch(/home/i)
  })
})
