export interface Artist {
    id: number;
    name: string;
    albums: string;
    image: string;
}

export interface ArtistResource {
    id: number;
    name: string;
    mbid: string;
    image: [
        ImageUrl //maybe any
    ]
}

interface ImageUrl {
    '#text': string;
}