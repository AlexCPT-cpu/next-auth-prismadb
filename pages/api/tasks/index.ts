import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '../../../libs/prisma';
import serverAuth from "../../../libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req);

    const tasks = await prismadb.task.findMany();

    return res.status(200).json(tasks);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}