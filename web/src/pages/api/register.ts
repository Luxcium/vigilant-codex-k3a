import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { email, password } = req.body;
  const hashed = await hash(password, 10);
  await prisma.user.create({ data: { email, password: hashed } });
  res.status(200).end('ok');
}
