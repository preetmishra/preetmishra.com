import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const route = req.query.route.toString();

    if (req.method === "POST") {
      const view = await prisma.view.upsert({
        where: { route },
        create: {
          route,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({
        total: view.count.toString(),
      });
    }

    if (req.method === "GET") {
      const view = await prisma.view.findUnique({
        where: {
          route,
        },
      });

      return res
        .status(200)
        .json({ total: view ? view.count.toString() : 0 });
    }
  } catch (e) {
    console.error("Could not perform the operation", e);
    return res.status(500).json({ message: "Internal server error" });
  }
}
