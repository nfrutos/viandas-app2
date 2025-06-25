import { NextRequest, NextResponse } from 'next/server';
import mercadopago from '@/lib/mercadopago';
import { Preference } from 'mercadopago';
import { saveOrder } from '@/services/orders';

type CartItem = {
    title: string;
    quantity: number;
    price: number;
};

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { cart, name, phone }: { cart: CartItem[]; name: string; phone: string } = body;

    console.log('[create-order] Recibido:', { cart, name, phone });

    type CartItem = {
        title: string;
        price: number;
        quantity: number;
    };

    const items = cart.map((item: CartItem, idx: number) => ({
        id: `${idx + 1}`, // id como string, requerido por MercadoPago
        title: item.title,
        quantity: item.quantity,
        unit_price: Number(item.price),
        currency_id: 'ARS',
    }));

    const total = cart.reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity,
        0
    );


    try {
        const preferenceClient = new Preference(mercadopago);
        const preference = await preferenceClient.create({
            body: {
                items,
                back_urls: {
                    success: 'https://viandas-app.vercel.app/orden-confirmada', // <-- actualizá con tu dominio real
                    failure: 'https://viandas-app.vercel.app/checkout?status=failure',
                    pending: 'https://viandas-app.vercel.app/checkout?status=pending',
                },
                auto_return: 'approved',
            },
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
