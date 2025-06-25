import { NextRequest, NextResponse } from 'next/server';
import mercadopago from '@/lib/mercadopago';
import { Preference } from 'mercadopago';
import { saveOrder } from '@/services/orders';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { cart, name, phone } = body;

    console.log('[create-order] Recibido:', { cart, name, phone });

    const items = cart.map((item: any) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: Number(item.price),
        currency_id: 'ARS',
    }));

    const total = cart.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
    );

    try {
        const preferenceClient = new Preference(mercadopago);
        const preference = await preferenceClient.create({
            body: {
                items,
                back_urls: {
                    success: 'http://localhost:3000/checkout?status=success',
                    failure: 'http://localhost:3000/checkout?status=failure',
                    pending: 'http://localhost:3000/checkout?status=pending',
                },
                auto_return: 'approved',
            }
        });

        await saveOrder({
            status: 'pending',
            total,
            items: cart,
            name,
            phone,
        });

        return NextResponse.json({ init_point: preference.init_point });
    } catch (error) {
        console.error('[create-order] ERROR:', error);
        return NextResponse.json({ error: 'Error al crear orden' }, { status: 500 });
    }
}
