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

export interface Machine {
  id: number;
  status: MachineStatus;
  user: User;
  active: boolean;
  name: string;
  runningPeriods: MachineRunningPeriod[];
}

export enum MachineStatus {
  RUNNING = 0,
  STOPPED = 1,
}

export interface MachineRunningPeriod {
  id: number;
  dateStarted: Date;
  dateStopped: Date;
}
