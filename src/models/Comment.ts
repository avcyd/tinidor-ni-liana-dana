import {serverTimestamp, Timestamp} from "firebase/firestore";
import type { FieldValue } from "firebase/firestore/lite";

export interface CommentProps {
  id: string,
  articleId: string,
  userId: string,
  creatorDisplayName:string,
  replyTargetId?: string,
  content: string
  createdAt: Timestamp | FieldValue,
  modifiedAt: Timestamp | FieldValue
}

export const transform = (id: string, data:Omit<CommentProps, "id">):CommentProps => {
  if(!id) throw new Error(`Comment ID is missing.`);
  if(!data.createdAt) throw new Error(`Comment creation date is missing.`);

  return {
    id: id,
    ...data
  }
}

const CONTENT_MAX = 500;

export const validateComment = (data:Partial<CommentProps>): Partial<CommentProps> => {
  if(!data.articleId) throw new Error(`Article reference is missing.`);
  if(!data.userId) throw new Error(`User reference is missing.`);
  if(!data.creatorDisplayName) throw new Error(`Your display name is required.`);
  if(!data.content?.trim()) throw new Error(`Please enter a comment.`);
  if(data.content.length >= CONTENT_MAX) throw new Error(`Comment must be ${CONTENT_MAX} characters or fewer.`);

  return{
    articleId: data.articleId,
    userId: data.userId,
    creatorDisplayName: data.creatorDisplayName || "",
    ...(data.replyTargetId ? { replyTargetId: data.replyTargetId } : {}),
    content: data.content,
    modifiedAt: serverTimestamp(),
    createdAt: serverTimestamp()
  }
}
