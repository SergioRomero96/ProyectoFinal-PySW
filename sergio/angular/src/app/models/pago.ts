import { Escribano } from './escribano';

export class Pago {
    id:number;
    fecha:Date;
    importe:number;
    escribano: Escribano;

    constructor(id?:number, fecha?:Date, importe?:number, escribano?:Escribano){
        this.id = id;
        this.fecha = new Date();
        this.importe = importe;
        this.escribano = new Escribano();
    }
}
