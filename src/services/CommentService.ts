import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'
import { createComment } from '../models/Comment'

const ref = collection(db, "comments")

export const addComment = async (data: { articleId: string; userId: string; replyTargetId: string; content: string }) => {
  const complete = createComment(data)
  await addDoc(ref, complete)
}
