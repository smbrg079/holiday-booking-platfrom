const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function fixAdmin() {
    const prisma = new PrismaClient();
    try {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await prisma.user.update({
            where: { email: 'admin@holidaysync.com' },
            data: {
                password: hashedPassword,
                role: 'ADMIN' // Ensure role is ADMIN
            }
        });
        console.log('Fixed admin user:', admin.email);
    } catch (error) {
        console.error('Error fixing admin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fixAdmin();
