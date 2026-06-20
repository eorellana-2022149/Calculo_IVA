import PromptSync from "prompt-sync";
import { productos } from "./data/ProductoData";
import { ItemCompra } from "./models/ProductoModel";
import { agregarProducto, calcularSubtotal, calcularIva, calcularTotal, confirmarCompra } from "./services/CompraService";

const prompt = PromptSync();

const leerNumero = (mensaje: string): number => {
    return Number(prompt(mensaje));
};

const mostrarMenu = (): void => {
    console.log("\n---------- MENÚ ----------");
    console.log("1. Ver catálogo");
    console.log("2. Agregar producto");
    console.log("3. Ver resumen");
    console.log("4. Confirmar compra");
    console.log("5. Vaciar carrito");
    console.log("0. Salir");
};

const mostrarCatalogo = (): void => {
    console.log("\n------ CATÁLOGO ------");

    for (let i = 0; i < productos.length; i++) {
        console.log("[" + productos[i].id + "] " + productos[i].nombre + " Q" + productos[i].precio.toFixed(2));
    }
};

const mostrarResumen = (carrito: ItemCompra[]): void => {
    if (carrito.length === 0) {
        console.log("No hay productos en la compra.");
        return;
    }
    const subtotal = calcularSubtotal(carrito);
    const iva = calcularIva(subtotal, 12);
    const total = calcularTotal(subtotal, iva);
    console.log("\n------ RESUMEN ------");

    for (let i = 0; i < carrito.length; i++) {
        console.log( carrito[i].producto.nombre + " x" + carrito[i].cantidad);
    }

    console.log("Subtotal: Q" + subtotal.toFixed(2));
    console.log("IVA: Q" + iva.toFixed(2));
    console.log("Total: Q" + total.toFixed(2));
};

const carrito: ItemCompra[] = [];
let opcion = 1;
console.log("Bienvenido.");

while (opcion !== 0) {
    mostrarMenu();
    opcion = leerNumero("Escoge una opción: ");
    switch (opcion) {

        case 1:
            mostrarCatalogo();
            break;

        case 2:
            mostrarCatalogo();
            const id = leerNumero("Ingrese ID del producto: ");

            const producto = productos.find(p => p.id === id);
            if (!producto) {
                console.log("Producto no encontrado");
                break;
            }

            const cantidad = leerNumero("Ingrese la cantidad: ");
            if (cantidad <= 0) {
                console.log("Cantidad no valida");
                break;
            }

            agregarProducto(carrito, {producto, cantidad});
            break;

        case 3:
            mostrarResumen(carrito);
            break;

        case 4:
            confirmarCompra(carrito);
            break;

        case 5:
            carrito.length = 0;
            console.log("Carrito vaciado");
            break;

        case 0:
            console.log("Bye Bye");
            break;

        default:
            console.log("Opcion invalida");
    }
}