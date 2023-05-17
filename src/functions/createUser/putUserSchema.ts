export default {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    age: { type: "number" },
  },
  required: ["name", "email", "age"],
} as const;
