export class Usuario {
    id: number;
    userName: string;
    password: string;
    perfil: string;
    foto: string;

    constructor(id?: number, userName?: string, password?: string, perfil?: string, foto?: string) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.perfil = perfil;
    }
}
