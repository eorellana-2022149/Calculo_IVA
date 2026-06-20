import { ItemCompra } from "../models/ProductoModel";

// Calcula el subtotal
export const calcularSubtotal = (items: ItemCompra[]): number => {
    let subtotal = 0;

    for (let i = 0; i < items.length; i++) {
        subtotal += items[i].producto.precio * items[i].cantidad;
    }

    return subtotal;
};

// Calcula el IVA
export const calcularIva = (
    subtotal: number,
    porcentajeIva: number
): number => {
    return subtotal * (porcentajeIva / 100);
};

// Calcula el total
export const calcularTotal = (
    subtotal: number,
    iva: number
): number => {
    return subtotal + iva;
};

// Agrega un producto al carrito
export const agregarProducto = (
    carrito: ItemCompra[],
    item: ItemCompra
): void => {

    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].producto.id === item.producto.id) {

            carrito[i].cantidad += item.cantidad;
            console.log("Cantidad actualizada.");
            return;
        }
    }

    carrito.push(item);
    console.log("Producto agregado correctamente.");
};

// Confirma la compra
export const confirmarCompra = (
    carrito: ItemCompra[]
): void => {

    if (carrito.length === 0) {

        console.log("No hay productos para confirmar.");
        return;
    }

    console.log("Compra confirmada con éxito.");
    carrito.length = 0;
};