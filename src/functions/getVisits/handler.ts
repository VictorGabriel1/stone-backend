import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";
import getDB from "src/utils/getDB";

const getVisits = async (_event: APIGatewayEvent) => {
  return getDB({
    TableName: "visitsTable",
    Key: {
      id: "1",
    },
  })
    .then(({ Item }) => {
      console.log(Item);
      return formatJSONResponse({
        statusCode: 200,
        message: `Your site has ${Item.visits} visits!`,
      });
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const main = middyfy(getVisits);
