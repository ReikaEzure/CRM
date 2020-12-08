export interface Project{
    idProject?: number;
    title?: String;
    description?:　String;
    dueDate?: Date;
    createdDate?: Date;
    updatedDate?: Date;
    actualCompletionDate?: Date;
    budget?: number;
    price?: number;
    documentation?: String;
    feedback?: String;
    quantityOfChange?: number;
    status?: number;
    promotion_idPromotion?: number;
    client_idClient?: number;
}