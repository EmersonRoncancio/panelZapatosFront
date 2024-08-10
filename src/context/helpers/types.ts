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
    talla:  string;
    color:  string;
    precio: string;
    stock:  string;
    imagen: Imagen[];
}

export interface Imagen {
    url:       string;
    public_id: string;
}
