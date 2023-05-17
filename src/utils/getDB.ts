import { formatJSONResponse } from "@libs/api-gateway";
import * as AWS from "aws-sdk";

interface getDBParams {
  TableName: string;
  Key: {
    [key: string]: string | number;
  };
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default async function getDB(params: getDBParams) {
  try {
    const response = await dynamoDb.get(params).promise();
    if (response.Item === undefined) {
      throw formatJSONResponse({
        message: "Not found in DB!",
        statusCode: 404,
      });
    }
    return response;
  } catch (error) {
    console.log(error);
    throw formatJSONResponse({
      message: error.message,
      statusCode: error.statusCode,
    });
  }
}
