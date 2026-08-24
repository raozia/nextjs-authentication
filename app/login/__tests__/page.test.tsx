import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const pushMock = vi.fn()

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock,
    }),
}))

import LoginPage from '../page'

describe('LoginPage', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.clearAllMocks()
    })

    it('shows error when no account exists', async () => {
        const user = userEvent.setup()

        render(<LoginPage />)

        await user.type(
            screen.getByPlaceholderText('Email'),
            'noone@example.com'
        )

        await user.type(
            screen.getByPlaceholderText('Password'),
            'password123'
        )

        await user.click(
            screen.getByRole('button', {
                name: /^login$/i,
            })
        )

        expect(
            await screen.findByText(
                'No account found. Please signup first.'
            )
        ).toBeInTheDocument()
    })

    it('shows error when password is incorrect', async () => {
        const user = userEvent.setup()

        localStorage.setItem(
            'user@example.com',
            JSON.stringify({
                name: 'User',
                email: 'user@example.com',
                password: 'rightpassword',
            })
        )

        render(<LoginPage />)

        await user.type(
            screen.getByPlaceholderText('Email'),
            'user@example.com'
        )

        await user.type(
            screen.getByPlaceholderText('Password'),
            'wrongpassword'
        )

        await user.click(
            screen.getByRole('button', {
                name: /^login$/i,
            })
        )

        expect(
            await screen.findByText('Incorrect password.')
        ).toBeInTheDocument()
    })

    it('logs in successfully and navigates to /home', async () => {
        const user = userEvent.setup()

        localStorage.setItem(
            'user2@example.com',
            JSON.stringify({
                name: 'User2',
                email: 'user2@example.com',
                password: 'password123',
            })
        )

        render(<LoginPage />)

        await user.type(
            screen.getByPlaceholderText('Email'),
            'user2@example.com'
        )

        await user.type(
            screen.getByPlaceholderText('Password'),
            'password123'
        )

        await user.click(
            screen.getByRole('button', {
                name: /^login$/i,
            })
        )

        expect(
            localStorage.getItem('loggedInUser')
        ).toBeTruthy()

        expect(document.cookie).toContain(
            'loggedInUser=user2@example.com'
        )

        expect(pushMock).toHaveBeenCalledWith('/home')
    })
})