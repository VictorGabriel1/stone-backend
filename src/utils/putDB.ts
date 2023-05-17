import { formatJSONResponse } from "@libs/api-gateway";
import * as AWS from "aws-sdk";

interface getDBParams {
  TableName: string;
  Item: {
    [key: string]: any;
  };
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default async function getDB(params: getDBParams) {
  try {
    const response = await dynamoDb.put(params).promise();
    return response;
  } catch (error) {
    console.log(error);
    throw formatJSONResponse({
      message: error.message,
      statusCode: error.statusCode,
    });
  }
}
