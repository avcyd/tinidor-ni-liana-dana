import {serverTimestamp, Timestamp, FieldValue} from "firebase/firestore";

export type roles = 'ADMIN' | 'JOURNALIST' | 'READER';
export interface UserProps {
  id: string;
  email: string,
  role: roles,
  displayName: string,
  createdAt: Timestamp | FieldValue,
  modifiedAt: Timestamp | FieldValue,
}

export const transform = (id: string, data:Omit<UserProps, "id">):UserProps => {
  if(!id) throw new Error(`REQUIRED: Missing id`);
  if(!data.createdAt) throw new Error(`REQUIRED: missing createdAt`);
  if(!data.modifiedAt) throw new Error(`REQUIRED: missing modifiedAt`);

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
    displayName: data.displayName?.trim() || Array.from(data.email.split("@"))[0],
    createdAt: serverTimestamp(),
    modifiedAt: serverTimestamp()
  }
}




