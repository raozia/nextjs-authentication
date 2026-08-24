import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const pushMock = vi.fn()

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}))

import SignupPage from '../page'

describe('SignupPage', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.clearAllMocks()
    })

    it('registers a new user and navigates to /login', async () => {
        const user = userEvent.setup()
        const alertMock = vi.fn()

        vi.stubGlobal('alert', alertMock)

        render(<SignupPage />)

        await user.type(
            screen.getByPlaceholderText('Name'),
            'John Doe'
        )

        await user.type(
            screen.getByPlaceholderText('Email'),
            'john@example.com'
        )

        await user.type(
            screen.getByPlaceholderText('Password'),
            'password123'
        )

        await user.click(
            screen.getByRole('button', {
                name: /create account/i,
            })
        )

        expect(
            await screen.findByRole('button', {
                name: /create account/i,
            })
        ).toBeInTheDocument()

        expect(
            localStorage.getItem('john@example.com')
        ).toBeTruthy()

        expect(alertMock).toHaveBeenCalledWith(
            'Account created! Please login.'
        )

        expect(pushMock).toHaveBeenCalledWith('/login')
    })

    it('shows error when email already exists', async () => {
        const user = userEvent.setup()

        localStorage.setItem(
            'existing@example.com',
            JSON.stringify({
                name: 'Existing',
                email: 'existing@example.com',
                password: 'password123',
            })
        )

        render(<SignupPage />)

        await user.type(
            screen.getByPlaceholderText('Name'),
            'New User'
        )

        await user.type(
            screen.getByPlaceholderText('Email'),
            'existing@example.com'
        )

        await user.type(
            screen.getByPlaceholderText('Password'),
            'password123'
        )

        await user.click(
            screen.getByRole('button', {
                name: /create account/i,
            })
        )

        expect(
            await screen.findByText(
                'Email already registered. Please login.'
            )
        ).toBeInTheDocument()
    })
})