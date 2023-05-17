// import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";
import getDB from "src/utils/getDB";
// import getDB from "src/utils/getDB";
import updateDB from "src/utils/updateDB";

// import schema from "./schema";

const hit = async (_event: APIGatewayEvent) => {
  return getDB({
    TableName: "visitsTable",
    Key: {
      id: "1",
    },
  }).then(async ({ Item }) => {
    try {
      const { Attributes } = await updateDB({
        TableName: "visitsTable",
        Key: {
          id: "1",
        },
        UpdateExpression: "set visits = :x",
        ExpressionAttributeValues: {
          ":x": Item.visits + 1,
        },
        ReturnValues: "ALL_NEW",
      });
      console.log(Item);
      return formatJSONResponse({
        statusCode: 200,
        message: `+1! Your site has ${Attributes.visits} visits now!`,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  });
};

export const main = middyfy(hit);
