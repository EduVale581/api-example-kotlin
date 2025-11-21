import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export function swaggerDocs(app: Express) {
  const spec = swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: { title: "Users API TS", version: "1.0.0" },
    },
    apis: ["./src/routes/*.ts"],
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
}
