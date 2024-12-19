import { describe, it, expect } from "vitest";
import { envSchema } from "@/core/lib/env";

// Mock das variáveis de ambiente
const validEnv = {
  PORT: "3000",
  JWT_SECRET_KEY: "supersecretkey",
  JWT_EXPIRATION_TIME: "60m",
  DATABASE_URL: "postgres://user:password@localhost:5432/mydatabase"
};

const invalidEnv = {
  PORT: "abc", // Invalido, não são 4 dígitos
  JWT_SECRET_KEY: "", // Invalido, chave secreta vazia
  JWT_EXPIRATION_TIME: "100y", // Invalido, 'y' não é permitido
  DATABASE_URL: "invalid-url" // Invalido, não é uma URL
};

describe("Validação das variáveis de ambiente", () => {
  it("deve validar corretamente as variáveis de ambiente válidas", () => {
    const result = envSchema.safeParse(validEnv);
    expect(result.success).toBe(true); // Espera-se que a validação passe
  });

  it("deve falhar quando as variáveis de ambiente são inválidas", () => {
    const result = envSchema.safeParse(invalidEnv);
    expect(result.success).toBe(false); // Espera-se que a validação falhe

    if (!result.success) {
      const errors = result.error.format();

      expect(errors.PORT?._errors[0]).toBe("A variável PORT deve ser um número de 4 dígitos. Exemplo: 3000.");
      expect(errors.JWT_SECRET_KEY?._errors[0]).toBe("A variável JWT_SECRET_KEY não pode estar vazia. Defina uma chave secreta.");
      expect(errors.JWT_EXPIRATION_TIME?._errors[0]).toBe("A variável JWT_EXPIRATION_TIME deve ter um tempo válido seguido por 's' (segundos), 'm' (minutos), 'h' (horas), ou 'd' (dias). Exemplo: '60s', '10m', '1h', '7d'.");
      expect(errors.DATABASE_URL?._errors[0]).toBe("A variável DATABASE_URL deve ser uma URL válida. Exemplo: 'postgres://user:password@localhost:5432/banco'.");
    }
  });
});
