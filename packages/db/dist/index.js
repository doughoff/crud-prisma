"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusEnum = exports.prisma = void 0;
const client_1 = require("@prisma/client");
Object.defineProperty(exports, "statusEnum", { enumerable: true, get: function () { return client_1.statusEnum; } });
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
