export class Convertir {

        cantidad: number;
        dolar: boolean;
        peso: boolean;
        valor: string;
        precio: number;
       
    
        Convertir(cantidad: number, dolar: boolean, peso: boolean, valor?: string,  precio?: number){
            this.cantidad = cantidad;
            this.dolar = dolar;
            this.peso = peso;
            this.valor = valor;
            this.precio = precio;
    }
}
