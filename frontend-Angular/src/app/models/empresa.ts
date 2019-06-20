export class Empresa {
    nombre: string;
    razonSocial: string;
    urlWebsite: string;

    Empresa(nombre?:string, razonSocial?:string, urlWebsite?:string) {
        this.nombre = nombre;
        this.razonSocial = razonSocial;
        this.urlWebsite = urlWebsite;
    }
}
