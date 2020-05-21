export interface ClientCompany{
    idClient?: number;
    companyName?: String;
    nif?: String;
    industry?: String;
    email?: String;
    createdDate?: Date;
    updatedDate?: Date;
    preference?: String;
    clientType?: number;
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
    postalcode?: String;
}

export interface Sns{
    client_idClient?: number;
    sns?: String;
    url?: String;
}
