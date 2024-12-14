import { NextFunction, Request, Response } from "express";

export const errorMiddleware = async (error: Error, request: Request, response: Response, next: NextFunction) => {
    const statusCode = request.statusCode;
    response.status(statusCode as number).json({
        status: statusCode,
        message: error.message,
    });
}