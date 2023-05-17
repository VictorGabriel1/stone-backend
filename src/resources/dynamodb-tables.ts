export default {
  visitsTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Delete",
    Properties: {
      TableName: "visitsTable",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: "1",
        WriteCapacityUnits: "1",
      },
    },
  },
  //   TasksTable: {
  //     Type: "AWS::DynamoDB::Table",
  //     DeletionPolicy: "Delete",
  //     Properties: {
  //       TableName: "${self:provider.environment.TASKS_TABLE}",
  //       AttributeDefinitions: [
  //         { AttributeName: "id", AttributeType: "S" },
  //         { AttributeName: "listId", AttributeType: "S" },
  //       ],
  //       KeySchema: [
  //         { AttributeName: "id", KeyType: "HASH" },
  //         { AttributeName: "listId", KeyType: "RANGE" },
  //       ],
  //       ProvisionedThroughput: {
  //         ReadCapacityUnits: "${self:custom.tableThroughput}",
  //         WriteCapacityUnits: "${self:custom.tableThroughput}",
  //       },
  //       GlobalSecondaryIndexes: [
  //         {
  //           IndexName: "list_index",
  //           KeySchema: [{ AttributeName: "listId", KeyType: "HASH" }],
  //           Projection: {
  //             // attributes to project into the index
  //             ProjectionType: "ALL", // (ALL | KEYS_ONLY | INCLUDE)
  //           },
  //           ProvisionedThroughput: {
  //             ReadCapacityUnits: "${self:custom.tableThroughput}",
  //             WriteCapacityUnits: "${self:custom.tableThroughput}",
  //           },
  //         },
  //       ],
  //     },
  //   },
};
