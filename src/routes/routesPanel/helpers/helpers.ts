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

export const SkeletonZapatos = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]


export const valorInicialState = {
    id: '',
    nombre: '',
    marca: '',
    precio: '',
    color: '',
    talla: '',
    stock: '',
    imagen: [{
        url: '',
        public_id: ''
    }]
}
