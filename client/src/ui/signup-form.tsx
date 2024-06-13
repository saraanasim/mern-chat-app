'use client';

import { signupServerAction } from '@/lib/actions';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export const SignupForm = () => {
    const [errorMessage, dispatch] = useFormState(signupServerAction, undefined);

    return (
        <form action={dispatch} className="space-y-6">
            <div className="flex-1 rounded-lg bg-white shadow-md px-8 py-6">
            <h1 className='mb-6 text-2xl font-semibold text-center text-gray-800'>
                    Please signup and create an account
                </h1>
                <div className='mb-6 text-xl font-semibold text-center text-gray-800'>
                    <p>
                        Already have an account?
                    </p>
                    <Link href='/login' className='underline hover:bg-green-500/20'>Login</Link>
                </div>
                <div className="w-full">
                    <div className="mb-4">
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700"
                            htmlFor="firstName"
                        >
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-md border border-gray-300 py-2 px-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="mb-2 block text-sm font-medium text-gray-700"
                            htmlFor="lastName"
                        >
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-md border border-gray-300 py-2 px-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                id="lastName"
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                    </div>
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
                <SignupButton />
                {errorMessage && (
                    <div
                        className="mt-4 text-red-600 text-center"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage}
                    </div>
                )}
            </div>
        </form>
    );
};

function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className={`mt-6 w-full py-2 rounded-md text-white font-semibold transition ${
                pending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={pending}
        >
            {pending ? 'Signing up...' : 'Signup'}
        </button>
    );
}
