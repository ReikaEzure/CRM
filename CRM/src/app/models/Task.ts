export interface Task{
    idTask?: number;
    createdDate?: Date;
    description?: String;
    dueDate?: Date;
    actualCompletionDate?: Date;
    type?: String;
    status?: number;
    projectId?: number;
}