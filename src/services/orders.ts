import prisma from '@/lib/prisma';

type CartItem = {
    title: string;
    quantity: number;
    price: number;
};

export const saveOrder = async (data: {
    status: string;
    total: number;
    items: CartItem[];
    name: string;
    phone: string;
}) => {
    return await prisma.order.create({ data });
};
