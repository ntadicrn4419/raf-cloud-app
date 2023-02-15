export interface User {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    permissionList: Permission[];
}

export enum Permission {
    CAN_READ_USERS, CAN_CREATE_USERS, CAN_UPDATE_USERS, CAN_DELETE_USERS
}