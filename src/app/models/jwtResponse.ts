export interface jwtResponse{
    dataUser:
    {
        ID:number;
        Nombre:string;
        Area:string;
        Rol:string;
        Usuario:string;
        Password:string;
        conectado:number;
        accessToken:string;
        expire:string;
    }
}