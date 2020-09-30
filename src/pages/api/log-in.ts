import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions, NextIronApiRequest} from '../../utils/ironSession'
import {UserData, LoginResponse} from '../../utils/types'



async function handler (req: NextIronApiRequest, res: NextApiResponse<LoginResponse>) {
  if (req.method === 'POST') {
    const {email, password} = req.body
    if (email == "test@123.fr" && password == "123") {
      req.session.set("user", {
        id: 2,
        admin: true,
      });
      await req.session.save();
      res.status(200).json({ 
        response : "OK", 
        authenticated: true,
        user: {
          id: 1, 
          username:"John", 
          profilePictureURL:"https://image.ibb.co/fa2YRF/dounia.jpg",
          isConfirmed: true,
          createdAt : "September 16th, 2020"
        }
      })
    }
    else {
      res.status(400).json({response :"Bad email or password", authenticated:false})
    }
  } else res.status(400).end()
}


export default withIronSession(handler, ironSessionOptions)