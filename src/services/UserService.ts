import {collection, setDoc, getDocs, getDoc, doc} from 'firebase/firestore';
import {db, auth} from './firebase';
import {createUser, transform} from '../models/User';
import type {UserProps} from '../models/User'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {getAuthErrorMessage} from './AuthService'

const ref = collection(db, "users");

export async function setUser(data: Partial<UserProps>, password: string): Promise<string>{
  if (!password || password.length < 8) throw new Error(`Password must be at least 8 characters.`);
  if (password.length > 128) throw new Error(`Password must not exceed 128 characters.`);
  const validated = createUser({...data});

  try{
    const credentials = await createUserWithEmailAndPassword(auth, validated.email!, password);
    const id = credentials.user.uid;
    await setDoc(doc(ref, id), validated);
    return id;

  }catch(e){
    throw new Error(getAuthErrorMessage(e));
  }
}

export async function getUserById(id:string):Promise<UserProps> {
  const snapshot = await getDoc(doc(db, "users", id));
  if (!snapshot.exists()) throw new Error(`User with ID ${id} not found.`);
  return transform(snapshot.id, {...snapshot.data() as UserProps})
}

export async function getAllUsers(){
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => transform(doc.id, {...doc.data() as UserProps}));

}
