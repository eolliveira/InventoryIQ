import { Role } from "./Role"

//tipo token qu e sera decodificado
export type TokenData = {
    exp: number,
    user_name: string,
    authorities: Role[]
}