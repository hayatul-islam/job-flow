"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationMeta = exports.getPagination = void 0;
const getPagination = (page, limit) => {
    const currentPage = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (currentPage - 1) * pageSize;
    return { currentPage, pageSize, skip };
};
exports.getPagination = getPagination;
const getPaginationMeta = (total, currentPage, pageSize) => {
    return {
        total,
        currentPage,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
        hasNextPage: currentPage < Math.ceil(total / pageSize),
        hasPrevPage: currentPage > 1,
    };
};
exports.getPaginationMeta = getPaginationMeta;
