import { NextApiRequest, NextApiResponse } from 'next'
import {main} from '../../models/user'

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
    if (req.method === 'GET') {
      await main()
      res.status(200).send(`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed non risus. 
      Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. 
      Cras elementum ultrices diam.
      Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
      `)
    }
  }