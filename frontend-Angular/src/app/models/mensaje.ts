import { Empresa } from './empresa';

export class Mensaje {
    desde: number;
    para: number;
    fecha: Date;
    texto: String;
    empresa: Empresa;
   
    
    Mensaje(desde?: number,para?: number, fecha?: Date ,texto?:string, empresa?:Empresa) {
        this.desde= desde;
        this.para = para;
        this.fecha = fecha;
        this.texto = texto;
        this.empresa = empresa;
        
    }
}
