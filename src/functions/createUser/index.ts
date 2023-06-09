import putUserSchema from "./putUserSchema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "create-user",
        request: {
          schemas: {
            "application/json": putUserSchema,
          },
        },
      },
    },
  ],
};
