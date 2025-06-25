import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extraer el ID manualmente

    const { status } = await req.json();

    if (!id || !status) {
        return NextResponse.json({ error: 'ID o estado faltante' }, { status: 400 });
    }

    try {
        const updated = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('[PATCH ERROR]', error);
        return NextResponse.json({ error: 'Error al actualizar pedido' }, { status: 500 });
    }
}
