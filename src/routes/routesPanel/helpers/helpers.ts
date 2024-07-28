type TypeCreateZapato = [
    'nombre',
    'marca',
    'talla',
    'color',
    'precio',
    'stock',
    'images'
]

export const CreateZapato: TypeCreateZapato = [
    'nombre',
    'marca',
    'talla',
    'color',
    'precio',
    'stock',
    'images'
]

type TypesCreateZapato = 'nombre' | 'marca' | 'talla' | 'color' | 'precio' | 'stock'

interface typeFormCreateZapato {
    label: string,
    name: TypesCreateZapato,
}

export const formCreateZapato: typeFormCreateZapato[] = [
    {
        label: 'Nombre',
        name: 'nombre',
    },
    {
        label: 'Marca',
        name: "marca"
    },
    {
        label: 'Talla',
        name: "talla"
    },
    {
        label: 'Color',
        name: "color"
    },
    {
        label: 'Precio',
        name: "precio"
    },
    {
        label: 'Stock',
        name: "stock"
    },
]

