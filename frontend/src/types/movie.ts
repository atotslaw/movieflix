import { Genre } from "./genre";

export type Movie = {

    id: number;
    title: string;
    subtitle: string;
    year: number;
    imgUrl: string;
    synopsis: string;
    genres: Genre[];

}