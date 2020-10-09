import { NextApiRequest} from 'next'

type UserSession = {
  id : number,
  admin : boolean
}

export type NextIronApiRequest = NextApiRequest & {
  session: {
    get ( user : string) : UserSession,
    set (user : string, session : UserSession) : void,
    save () : Promise<void>
  }
};

export const ironSessionOptions = {
    password: process.env.IRON_PASSWORD,
    cookieName: "next-auth-starter",
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly : false
    }
}
