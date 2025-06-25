import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
        return NextResponse.json({ error: 'Email no registrado' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Retornar token simple
    return NextResponse.json({ token: 'admin-session-ok' });
}
