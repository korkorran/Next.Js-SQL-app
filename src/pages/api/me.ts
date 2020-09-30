import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions, NextIronApiRequest} from '../../utils/ironSession'
import {UserData} from '../../utils/types'


async function handler (req: NextIronApiRequest, res: NextApiResponse<UserData>) {
  if (req.method === 'GET') {
    const user = req.session.get("user");
    
    if(user) {
      res.status(200).json({
        id: user.id, 
        username:"Dounia",
        profilePictureURL:"https://image.ibb.co/fa2YRF/dounia.jpg",
        createdAt:"September 16th, 2020",
        isConfirmed:true
      })
    }
    else {
      res.status(401).end()
    }
  } else {
    // Handle any other HTTP method
    res.status(400).end()
  }
}

export default withIronSession(handler, ironSessionOptions)