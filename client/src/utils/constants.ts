import { getRandomProfileImages } from "./helpers";

export enum HeadingSizes {
    LG = "Large",
    MD = "Medium"
}

export enum HTTP_METHODS {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export const tempPeople = Array.from({ length: 20 }, () => ({
    name: 'Saraan',
    alt: "Saraan's Image",
    desc: 'MERN Dev',
    src: getRandomProfileImages(1)[0],
}));


export const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;