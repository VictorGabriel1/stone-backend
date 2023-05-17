import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import getUserSchema from "./getUserSchema";
import getDB from "src/utils/getDB";

const getUser: ValidatedEventAPIGatewayProxyEvent<
  typeof getUserSchema
> = async (event) => {
  const { email } = event.body;

  return getDB({
    TableName: "usersTable",
    Key: {
      email,
    },
  })
    .then(({ Item }) => {
      console.log(Item);
      return formatJSONResponse({
        statusCode: 200,
        message: JSON.stringify(Item),
      });
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const main = middyfy(getUser);
