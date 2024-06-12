'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { AuthApi } from './api/auth.api';

export async function setAuthCookie(value: string) {
    if (!value?.length) return;
    cookies().set({
        name: "auth",
        value: value,
        path: "/",
    });
}

export async function setProfileCookie(value: string) {
    if (!value?.length) return;
    cookies().set({
        name: "profile",
        value: value,
        path: "/",
    });
}

const loginFormSchema = z.object({
    email: z.string({
        invalid_type_error: 'Invalid Email',
    }),
    password: z.string(),
})

const signupFormSchema = z.object({
    email: z.string({
        invalid_type_error: 'Invalid Email',
    }),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

export async function loginServerAction(prevState: any, formData: FormData) {
    const { email, password } = Object.fromEntries(formData);

    const validatedFields = loginFormSchema.safeParse({
        email,
        password
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        prevState.errors = validatedFields.error.flatten().fieldErrors
        revalidatePath('/login');
        return prevState

    }
    else {
        const loginResponse = await AuthApi.loginUser({ email: email.toString(), password: password.toString() })

        if (!loginResponse?.token) {
            prevState.errors = [loginResponse.message]
            revalidatePath('/login');
            return prevState

        }
        else {
            console.log({loginResponse})
            setAuthCookie(loginResponse.token)
        }

    }
    redirect('/')
}


export async function signupServerAction(prevState: any, formData: FormData) {
    const { email, password, firstName, lastName } = Object.fromEntries(formData);

    // Validate the form data
    const validatedFields = signupFormSchema.safeParse({
        email,
        password,
        firstName,
        lastName,
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        prevState.errors = validatedFields.error.flatten().fieldErrors
        revalidatePath('/login');
        return prevState
    }

    const signupResponse = await AuthApi.registerUser({
        email: email.toString(),
        password: password.toString(),
        firstName: firstName.toString(),
        lastName: lastName.toString()
    })

    if (signupResponse?.token) setAuthCookie(signupResponse.token)
    else {
        prevState.errors = ['Please try again later']
        revalidatePath('/login');
        return prevState
    }

    redirect('/')
}