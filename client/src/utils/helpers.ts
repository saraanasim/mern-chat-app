import { ClassValue } from "clsx";
import { clsx } from "clsx";
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