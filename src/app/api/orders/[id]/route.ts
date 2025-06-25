import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const { status } = await req.json();

    if (!status) {
        return NextResponse.json({ error: 'Estado requerido' }, { status: 400 });
    }

    try {
        const updated = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error al actualizar pedido' }, { status: 500 });
    }
}
