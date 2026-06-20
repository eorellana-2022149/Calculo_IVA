// Producto
export interface Producto {
    id: number;
    nombre: string;
    precio: number;
}

// Lo uso para poder agregar productos al carrito
export interface ItemCompra {
    producto: Producto;
    cantidad: number;
}
