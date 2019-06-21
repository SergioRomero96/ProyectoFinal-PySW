import { Escribano } from './escribano';

export class Novedad {
    id:number;
    asunto: string;
    descripcion: string;
    escribano: Escribano;

    constructor(id?: number, asunto?:string, descripcion?: string, escribano?: Escribano){
        this.id = id;
        this.asunto = asunto;
        this.descripcion = descripcion;
        this.escribano = new Escribano();
    }
}
