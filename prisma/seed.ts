import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
        data: {
            email: 'admin@viandas.com',
            password: hashedPassword,
        },
    });
    console.log('Admin creado ✅');
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
