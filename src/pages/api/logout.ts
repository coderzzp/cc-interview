import { withIronSession } from 'next-iron-session'
import { NextApiRequest, NextApiResponse } from 'next'

export const ironOptions={
  cookieName: 'siwe',
  password: 'complex_password_at_least_32_characters_long',

  cookieOptions: {

  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      req.session.destroy()
      res.send({ ok: true })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSession(handler, ironOptions)
