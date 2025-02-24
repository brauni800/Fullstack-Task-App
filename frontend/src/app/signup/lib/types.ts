export enum ReducerActionKind {
  CHANGE_USERNAME = 'CHANGE_USERNAME',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  CHANGE_EMAIL = 'CHANGE_EMAIL'
}

export interface FormState {
  username: string
  password: string
  email: string
}

export interface ReducerAction {
  type: ReducerActionKind
  payload: string
}

export interface CreateUsersResponse {
  id:         string;
  username:   string;
  email:      string;
  created_at: Date;
}

export interface Notification {
  success: boolean
  message: string
}
