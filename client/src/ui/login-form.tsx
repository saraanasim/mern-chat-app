'use client';

import { loginServerAction } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { ErrorText } from './error-text';
import Link from 'next/link';

const initialState = { email: '', password: '', errors: [] };

export const LoginForm = () => {
    const [state, dispatch] = useFormState(loginServerAction, initialState);

    return (
        <form action={dispatch} className="space-y-6">
            <div className="flex-1 rounded-lg bg-white shadow-md px-8 py-6">
                <h1 className='mb-6 text-2xl font-semibold text-center text-gray-800'>
                    Please log in to continue
                </h1>
                <div className='mb-6 text-xl font-semibold text-center text-gray-800'>
                    <p>
                        Dont have an account?
                    </p>
                    <Link href='/signup' className='underline hover:bg-green-500/20'>Signup</Link>
                </div>
                <div className="w-full">
                    <div className="mb-4">
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-md border border-gray-300 py-2 px-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-md border border-gray-300 py-2 px-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <ErrorText errors={state.errors || []} />
                <LoginButton />
            </div>
        </form>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className={`mt-6 w-full py-2 rounded-md text-white font-semibold transition ${pending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            disabled={pending}
        >
            {pending ? 'Logging in...' : 'Log in'}
        </button>
    );
}
