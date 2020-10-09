
export type User = {
  id : number,
  email : string,
  passwordHash? : string,
  username : string,
  bio : string,
  profilePictureURL : string,
  created_at : string,
  updated_at : string,
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
