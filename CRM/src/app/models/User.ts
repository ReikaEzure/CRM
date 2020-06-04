export interface User{
    idUser?: number;
    firstName?: String;
    lastName?: String;
    birthDate?: Date;
    phone?: String;
    joinedDate?: Date;
    lastLogin?: Date;
    id?: String;
    idType?: String;
    avatar?;
    role?: number;
    status?: number;
    login_idLogin?:number;

}


export interface UserRole{
    idUserRole?: number;
    role?: String;
    description?: String;
}

export interface UserStatus{
    idUserStatus?: number;
    status?: String;
}
