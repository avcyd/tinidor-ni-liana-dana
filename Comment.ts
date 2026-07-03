import {Timestamp} from "firebase/firestore";

interface ArticleProps {
  uid: string,
  title: string,
  content: string,
  tags: string[],
  status: 'PUBLISHED' | 'DRAFT',
  imageURL: string
  createdAt: Timestamp

}

export const transform = (uid: string, data:Omit<ArticleProps, "uid">):ArticleProps => {
  if(!uid) throw new Error(`Article ID is missing.`);
  if(!data.createdAt) throw new Error(`Article creation date is missing.`);

  return {
    uid: uid,
    ...data
  }
}

export const createUser = (data:Partial<ArticleProps>) => {
  if(!data.title?.trim()) throw new Error(`Please enter a title.`);
  if(!data.content?.trim()) throw new Error(`Please enter the content.`);

  return{
    title: data.title,
    content: data.content,
    tags: data.tags,
    status: data.status || 'DRAFT',
    imageURL: data.imageURL,
  }
}
