import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions, NextIronApiRequest} from '../../utils/ironSession'
import {list} from '../../models/user'


async function handler (req: NextIronApiRequest, res: NextApiResponse<string>) {
  if (req.method === 'GET') {
    const user = req.session.get("user");
    console.log(await list())
    if(user) {
      res.status(200).json(` 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed non risus. 
      Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. 
      Cras elementum ultrices diam.
      Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
      `)
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