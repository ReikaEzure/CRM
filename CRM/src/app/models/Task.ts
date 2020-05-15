export interface Task{
    id?: number;
    createdDate?: Date;
    description?: String;
    dueDate?: Date;
    actualCompletionDate?: Date;
    type?: String;
    status?: number;
    projectId?: number;
}