import { Usuario } from './usuario';
import { Escribania } from './escribania';

export class Escribano {
    id: number;
    dni: number;
    apellido: string;
    nombre: string;
    fechaNacimiento: Date;
    direccion: string;
    matricula: number;
    cargo: string;
    usuario: Usuario;
    escribania: Escribania;
    estado: string;

    constructor(id?: number, dni?: number, apellido?: string, nombre?: string, fechaNacimiento?: Date,
        direccion?: string, matricula?: number, cargo?: string, usuario?: Usuario, escribania?: Escribania, estado?: string) {

        this.id = id;
        this.dni = dni;
        this.apellido = apellido;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.direccion = direccion;
        this.estado = "Habilitado";
        this.matricula = matricula;
        this.cargo = cargo;
        this.usuario = new Usuario();
        this.usuario.perfil = "socio";
        this.escribania = new Escribania();
    }

}
