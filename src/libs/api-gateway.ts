import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};

type formatJSONResponseParams = {
  message: string;
  statusCode: number;
};

export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = ({
  message,
  statusCode,
}: formatJSONResponseParams) => {
  return {
    statusCode,
    body: JSON.stringify({ message }),
  };
};
