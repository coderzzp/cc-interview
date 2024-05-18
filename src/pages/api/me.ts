import { withIronSession } from 'next-iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { ironOptions } from './logout' 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      res.send({ address: req.session.get('siwe')?.data.address })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default withIronSession(handler, ironOptions)