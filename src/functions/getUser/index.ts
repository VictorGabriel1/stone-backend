import getUserSchema from "./getUserSchema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "get-user/",
        request: {
          schemas: {
            "application/json": getUserSchema,
          },
        },
      },
    },
  ],
};
