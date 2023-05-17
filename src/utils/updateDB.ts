import { formatJSONResponse } from "@libs/api-gateway";
import * as AWS from "aws-sdk";

interface updateDBParams {
  TableName: string;
  Key: {
    [key: string]: any;
  };
  UpdateExpression: string;
  ExpressionAttributeValues: {
    [key: string]: any;
  };
  ReturnValues: "ALL_NEW";
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default async function updateDB(params: updateDBParams) {
  try {
    const response = await dynamoDb.update(params).promise();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw formatJSONResponse({
      message: error.message,
      statusCode: error.statusCode,
    });
  }
}
