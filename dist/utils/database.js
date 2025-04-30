"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../generated/prisma");
// we have used let
let prisma = new prisma_1.PrismaClient();
exports.default = prisma;
