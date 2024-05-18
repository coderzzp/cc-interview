import { withIronSession } from 'next-iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
import { ironOptions } from './logout'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body
        const siweMessage = new SiweMessage(message)
        console.log('req.session.nonce2222',req.session.get('nonce'))

        const fields = await siweMessage.verify({signature})
        console.log('req.session',req.session)
        if (fields.data.nonce !== req.session.get('nonce'))
          return res.status(422).json({ message: 'Invalid nonce.' })

        req.session.set('siwe',fields)
        await req.session.save()
        res.json({ ok: true })
      } catch (_error) {
        res.json({ ok: false })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSession(handler, ironOptions)
