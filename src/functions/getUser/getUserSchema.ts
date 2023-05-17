export default {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["email"],
} as const;
