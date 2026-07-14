import { prisma } from '../lib/prisma.js';

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@test.com",
            passwordHash: "dummy",
        },
    });

    console.log(user);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });