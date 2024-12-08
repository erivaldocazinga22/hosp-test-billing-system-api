import { Router } from "express";

export const routers = Router();

routers.get("/", (request, response) => {
    response.send("<h1>Welcome in Billing Sistem API Test</h1>")
});


// Authentications routers
routers.post("/login", async (request, response) => {
    response.json({
        status: 200,
        message: "Authentication successful",
        data: {
            token: "test-de-token"
        }
    });
})

routers.post("/validate", async (request, response) => {
    response.json({
        status: 200,
        message: "Token is valid",
        data: {
            name: "faker user",
            email: "faker@example.com"
        }
    })
})

