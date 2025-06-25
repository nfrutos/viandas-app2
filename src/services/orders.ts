// src/services/orders.ts
import prisma from '@/lib/prisma';

export const saveOrder = async (data: {
    status: string;
    total: number;
    items: any;
    name: string;
    phone: string;

}) => {
    return await prisma.order.create({
        data,
    });
};
