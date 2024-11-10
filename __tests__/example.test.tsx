import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
    it('deberia renderizar texto de registrasre', () =>{
        render(<Home />)

        const miElem = screen.getByText('Regístrate')

        expect(miElem).toBeInTheDocument()
    })
    it('deberia tener una imagen', () =>{
        render(<Home />)

        const miElem = screen.getByRole('img')

        expect(miElem).toBeInTheDocument()
    })
})