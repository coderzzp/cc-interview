import { withIronSession } from 'next-iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateNonce } from 'siwe'
import { ironOptions } from './logout'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      console.log('req.session.nonce111',req.session.get('nonce'))
      const nonce = generateNonce()
      req.session.set("nonce",  nonce);
      await req.session.save()
      res.setHeader('Content-Type', 'text/plain')
      res.send(nonce)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSession(handler, ironOptions)
