import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prisma";
import serverAuth from "../../libs/serverAuth";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { title, description, experience, type } = req.body;
    const { currentUser } = await serverAuth(req);

    const session = await getSession({ req });

    if (!session?.user?.email) {
      throw new Error("Not signed in");
    }

    let user = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    const tasks = user.tasks;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        type,
        experience,
        //@ts-ignore console
        creator: user,
      },
    });

    const updatedUser = await prismadb.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        //@ts-ignore console
        tasks: [...tasks, task.id],
      },
    });

    return res.status(200).json({ task, updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
