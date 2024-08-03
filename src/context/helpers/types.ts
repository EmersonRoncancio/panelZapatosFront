export interface Welcome {
    Totsal:   number;
    Page:    number;
    Limit:   number;
    Zapatos: Zapato[];
}

export interface Zapato {
    id:     string;
    nombre: string;
    marca:  string;
    talla:  number;
    color:  string;
    precio: number;
    stock:  number;
    imagen: string[];
}