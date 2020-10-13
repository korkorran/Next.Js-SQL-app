import { getDatabaseConnector } from './dbInjector';
import ORM from './ORM'
import {ApiRequest} from './types'
import { NextApiResponse} from 'next'
const connector = getDatabaseConnector();


export default (...args) => {
  return (fn : Function) => async (req : ApiRequest, res: NextApiResponse) => {
    const db = connector();
    req.ORM = new ORM(db)
    await fn(req, res);
    await db.destroy();
    return;
  };
};
