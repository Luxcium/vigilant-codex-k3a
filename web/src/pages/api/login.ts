import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).end('invalid');
  }
  const valid = await compare(password, user.password);
  if (!valid) {
    return res.status(401).end('invalid');
  }
  res.status(200).end('ok');
}
