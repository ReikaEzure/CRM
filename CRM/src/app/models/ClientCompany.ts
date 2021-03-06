export interface ClientCompany{
    idClient?: number;
    companyName?: String;
    nif?: String;
    industry?: String;
    email?: String;
    createdDate?: Date;
    updatedDate?: Date;
    preference?: String;
    clientType_idClientType?: number;
    phone?: Array<Phone>;
    address?: Address;
    sns?: Array<Sns>;
}

export interface Phone{
    client_idClient?: number;
    phoneNumber?: String;
}

export interface Address{
    client_idClient?: number;
    addressLine?: String;
    city?: String;
    state?: String;
    country?: String;
    postalCode?: String;
}

export interface Sns{
    client_idClient?: number;
    sns?: String;
    url?: String;
}

export interface ClientType{
    idClientType?: number;
    type?: String;
    description?: String;
}
