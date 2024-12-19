import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = (error as any).status || 500; // Use 'error.status' se estiver configurado
  const message = error.message || "Internal Server Error";

  response.status(status).json({
    status,
    message,
  });
};
