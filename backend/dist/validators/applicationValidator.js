"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.updateApplicationSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(client_1.ApplicationStatus),
});
