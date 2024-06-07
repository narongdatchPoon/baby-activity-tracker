import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { activity, tag, amount, note } = req.body;
    const newActivity = await prisma.activity.create({
      data: { activity, tag, amount: amount ? parseFloat(amount) : null, note },
    });
    res.status(201).json(newActivity);
  } else if (req.method === 'GET') {
    const activities = await prisma.activity.findMany();
    res.status(200).json(activities);
  } else {
    res.status(405).end();
  }
}
