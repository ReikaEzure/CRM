export interface Team{
    idTeam?: number;
    project_idProject?: number;
    user_IdUser?: number;
}

export interface TeamLeader{
    teamLeaderId?: number;
    electedDate?: Date;
    updatedDate?: Date;
    team_idTeam?: number;
}