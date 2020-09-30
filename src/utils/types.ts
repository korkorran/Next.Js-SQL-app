export type UserData = {
    id : number;
    username : string;
    profilePictureURL : string;
    createdAt: string;
    isConfirmed: boolean;
  }
  
export type LoginResponse = {
    response: string;
    authenticated : boolean;
    user? : UserData;
  }

export type SignupResponse = {
  response: string, 
  register : boolean
}