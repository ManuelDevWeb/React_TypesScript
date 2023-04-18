// Tipando la libreria lodash que no tiene tipado

// Asignando el tipo de dato de retorno de la función random
declare module "lodash"{
    export function random(lower:number, upper:number): number;
}
