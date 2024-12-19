import { Request, Response } from "express";

export const errorMiddleware = async (error: Error, request: Request, response: Response) => {
    const message = error.message || "Internal Server Error";
    
    response.status(500).json({
        status: 500,
        message,
    });
};