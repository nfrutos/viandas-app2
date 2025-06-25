// src/services/getOrders.ts
import prisma from '@/lib/prisma';

export const getOrders = async () => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return orders;
};
