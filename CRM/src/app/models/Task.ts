export interface Task{
    idTask?: number;
    createdDate?: Date;
    description?: String;
    dueDate?: Date;
    actualCompletionDate?: Date;
    taskName?: String;
    status?: number;
    project_idProject?: number;
}