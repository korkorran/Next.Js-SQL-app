import { NextApiRequest, NextApiResponse } from 'next'
import {SignupResponse} from '../../utils/types'

export default (req: NextApiRequest, res: NextApiResponse<SignupResponse>) => {
    if (req.method === 'POST') {
      // Process a POST request
      const {email, username, password, passwordConfirm} = req.body
      if (email == "try@123.fr") {
        res.status(400).json({ response : "Email already exists", register: false })
      }
      else if (username == "try") {
        res.status(400).json({ response : "Username already exists", register: false })
      }
      else if (password.length < 7 || password.length > 20 ) {
        res.status(400).json({ response : "Password must contains between 7 and 20 characters", register: false })
      }
      else if (password != passwordConfirm) {
        res.status(400).json({ response : "Confirmation does not match password", register: false })
      }
      else if (email == "test@123.fr" && username == "test" && password == "123" && passwordConfirm == "123") {
        res.status(200).json({ response : "OK", register: true })
      }
      else {
        res.status(400).json({response :"Bad inputs", register:false})
      }
    } else {
      // Handle any other HTTP method
      res.status(400).json({response : "bad request", register:false})
    }
  }