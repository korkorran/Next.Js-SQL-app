import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions, NextIronApiRequest} from '../../../utils/ironSession'
import {Response} from '../../../utils/types'
import { updateBio } from '../../../models/user'


async function handler (req: NextIronApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    const {bio} = req.body
    const userSession = req.session.get("user");
    await updateBio(userSession.id, bio);
    res.status(200).json({response : 'bio has been updated'});
  } else res.status(400).end()
}


export default withIronSession(handler, ironSessionOptions)
