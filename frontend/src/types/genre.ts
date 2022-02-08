export type GenreResponse = {
    content: Genre[];
    totalPages: number;
}

export type Genre = {
    id:number;
    name: string;
}
