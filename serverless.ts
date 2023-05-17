import getVisits from "@functions/getVisits";
import type { AWS } from "@serverless/typescript";
import dynamodbTables from "src/resources/dynamodb-tables";

const serverlessConfiguration: AWS = {
  service: "stone-backend",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DescribeTable",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: [{ "Fn::GetAtt": ["visitsTable", "Arn"] }],
      },
    ],
  },
  // import the function via paths
  functions: { getVisits },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      ...dynamodbTables,
    },
  },
};

module.exports = serverlessConfiguration;
