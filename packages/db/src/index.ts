import { PrismaClient, statusEnum } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma, statusEnum };
