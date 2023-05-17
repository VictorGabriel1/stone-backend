import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import putDB from "src/utils/putDB";
import putUserSchema from "./putUserSchema";

const createUser: ValidatedEventAPIGatewayProxyEvent<
  typeof putUserSchema
> = async (event) => {
  const { name, email, age } = event.body;

  return putDB({
    TableName: "usersTable",
    Item: {
      email,
      name,
      age,
    },
  })
    .then(() => {
      return formatJSONResponse({
        statusCode: 200,
        message: `User created!`,
      });
    })
    .catch((error) =>
      formatJSONResponse({
        statusCode: error.statusCode,
        message: error.message,
      })
    );
};

export const main = middyfy(createUser);
