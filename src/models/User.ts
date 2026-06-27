import {Timestamp} from "firebase/firestore";

export interface UserProps {
  id: string;
  email: string,
  role: 'ADMIN' | 'JOURNALIST' | 'READER',
  displayName: string,
  createdAt: Timestamp,
}

export const transform = (id: string, data:Omit<UserProps, "id">):UserProps => {
  if(!id) throw new Error(`REQUIRED: Missing id`);
  if(!data.createdAt) throw new Error(`REQUIRED: missing createdAt`);

  return {
    id: id,
    ...data
  }
}

export const createUser = (data:Partial<UserProps>): Partial<UserProps> => {
  if(!data.email?.trim()) throw new Error(`REQUIRED: Missing email`);

  return{
    email: data.email,
    role: data.role ?? 'READER',
    displayName: data.displayName?.trim() || data.email,
  }
}




