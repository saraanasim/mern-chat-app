import { getRandomProfileImages } from "./helpers";

export enum HeadingSizes {
    LG = "Large",
    MD = "Medium"
}



export const tempPeople = Array.from({ length: 20 }, () => ({
    name: 'Saraan',
    alt: "Saraan's Image",
    desc: 'MERN Dev',
    src: getRandomProfileImages(1)[0],
  }));