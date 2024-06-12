import { ClassValue, clsx } from "clsx";
import Cookies from 'js-cookie';
import { twMerge } from "tailwind-merge";
export const mergeClasses = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const getRandomProfileImages = (count: number): string[] => {
    const baseUrl = 'https://randomuser.me/api/portraits/';
    const genders = ['men', 'women'];
    const results: string[] = [];

    for (let i = 0; i < count; i++) {
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const number = Math.floor(Math.random() * 100);
        const url = `${baseUrl}${gender}/${number}.jpg`;
        results.push(url);
    }

    return results;
};

export const getAbsolutePath = (relativePath: string) => {
    return `${process.env.NEXT_PUBLIC_CLIENT_PATH}${relativePath}`;
  };

export const setAuthCookie = (authToken: string) => {
    Cookies.set('auth', JSON.stringify(authToken), {
        expires: 10000,
        path: '/',
        // secure: process.env.NODE_ENV === 'production',
        // httpOnly: process.env.NODE_ENV === 'production',
    });
};

export const getAuthCookie = (): string | null => {
    return Cookies.get('auth') || null
};

export const removeAuthCookie = () => {
    Cookies.remove('auth');
};

export const settlePromises = async (allPromises: Promise<any>[]) => {
    const results = await Promise.allSettled(allPromises);
    return results.map((result) => (result.status === "fulfilled" ? result.value : null));
  };