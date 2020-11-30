export interface Invoice{
    idInvoice?: number;
    issueDate?: Date;
    createdDate?: Date;
    updatedDate?: Date;
    total?: number;
    subtotal?: number;
    neto?: number;
    iva?: number;
    irpf?: number;
    project_idProject?: number;
}