export interface Town {
    Brastlewark?: Gnommes[];
}

export interface Gnommes {
 id: number;
 name: string;
 thumbnail: string;
 age: number;
 weight: number;
 height: number;
 hair_color: string;
 professions: string[];
 friends?: string[];
}
