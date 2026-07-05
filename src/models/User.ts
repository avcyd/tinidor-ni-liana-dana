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

const RFC_5321_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const transform = (id: string, data:Omit<UserProps, "id">):UserProps => {
  if(!id) throw new Error(`User ID is missing.`);
  if(!data.createdAt) throw new Error(`User creation date is missing.`);
  if(!data.modifiedAt) throw new Error(`User modification date is missing.`);

  return {
    id: id,
    ...data
  }
}

function deriveDisplayName(email: string): string {
  const localPart = email.split("@")[0] || "";
  const withSpaces = localPart.replace(/[._-]/g, " ");
  const capitalized = withSpaces
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  return capitalized.slice(0, 50);
}

export const createUser = (data:Partial<UserProps>): Partial<UserProps> => {
  if(!data.email?.trim()) throw new Error(`Please enter a valid email address.`);
  const email = data.email.trim();
  if(email.length > 254) throw new Error(`Email must not exceed 254 characters.`);
  if(!RFC_5321_EMAIL.test(email)) throw new Error(`Email format is invalid.`);
  const localPart = email.split("@")[0];
  if(localPart.length > 64) throw new Error(`The part before @ must not exceed 64 characters.`);

  return{
    email: email,
    role: data.role ?? 'READER',
    displayName: data.displayName?.trim() || deriveDisplayName(email),
    createdAt: serverTimestamp(),
    modifiedAt: serverTimestamp()
  }
}




