export class Escribania {
    id: number;
    nombre: string;
    direccion: string;
    localidad: string;
    telefono: string;

    constructor(id?: number, nombre?: string, direccion?: string, localidad?: string, telefono?: string) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.localidad = localidad;
        this.telefono = telefono;
    }
}
