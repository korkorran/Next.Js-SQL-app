import { NextApiRequest} from 'next'
import ORM from './ORM'

type UserSession = {
  id : number,
  admin : boolean
}

export type ApiRequest = NextApiRequest & {
  session: {
    get ( user : string) : UserSession,
    set (user : string, session : UserSession) : void,
    save () : Promise<void>
  },
  ORM: ORM,
  file : {
    filename : string,
    path : string
  }
};


export type User = {
  id : number,
  email : string,
  passwordHash? : string,
  username : string,
  bio : string,
  profilePictureURL : string,
  created_at : string | Date,
  updated_at : string | Date,
  isEmailConfirmed : boolean
}

export type Post = {
  id : number,
  content : string,
  author : number,
  created_at : string | Date,
  updated_at : string | Date
}

export type PostWithAuthorInfo = Post & {
  author_username : string,
  author_pictureURL : string
}

export type LoginResponse = {
    response: string;
    authenticated : boolean;
    user? : User;
  }

export type SignupResponse = {
  response: string, 
  register : boolean,
  user? : User;
}

export type Response = {
  response: string, 
}

export type NewPostResponse = {
  response: string,
  post? : PostWithAuthorInfo
}

export type UpdatePictureResponse = Response & {
  pictureURL? : string
}

export type PostIndexResponse = PostWithAuthorInfo[]
