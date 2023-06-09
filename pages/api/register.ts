import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
        totalXp: 0,
        //@ts-ignore console
        createdTaskIds: [],
        //@ts-ignore console
        taskIds: [],
        completedIds: []
      }
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}