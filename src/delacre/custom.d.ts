import { NextApiRequest } from 'next';
import { Session } from 'next-iron-session'; // 根据您使用的会话库进行调整

declare module 'next' {
  interface NextApiRequest {
    session: Session; // 根据您使用的会话库进行调整
  }
}