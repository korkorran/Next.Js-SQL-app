
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
