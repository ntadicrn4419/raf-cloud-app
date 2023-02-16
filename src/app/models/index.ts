export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  permissionList: Permission[];
}

export enum Permission {
  CAN_READ_USERS = 0,
  CAN_CREATE_USERS = 1,
  CAN_UPDATE_USERS = 2,
  CAN_DELETE_USERS = 3,
  CAN_SEARCH_MACHINES = 4,
  CAN_START_MACHINES = 5,
  CAN_STOP_MACHINES = 6,
  CAN_RESTART_MACHINES = 7,
  CAN_CREATE_MACHINES = 8,
  CAN_DESTROY_MACHINES = 9,
}
