import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Footer } from './Footer'

describe('Footer', () => {
  it('should render Footer', () => {
    render(<Footer />)

    const footer = screen.getByText(/10xpg/i).textContent

    expect(footer).toMatch(/10xpg/i)
  })
})
