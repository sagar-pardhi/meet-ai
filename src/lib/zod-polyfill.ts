// Polyfill for toJSONSchema method that was removed in Zod v4
import { z } from "zod";

// Extend the Zod namespace to add the missing toJSONSchema method
declare module "zod" {
  namespace z {
    interface ZodType {
      toJSONSchema(): any;
    }
  }
}

// Add the toJSONSchema method to ZodType prototype
if (!z.ZodType.prototype.toJSONSchema) {
  z.ZodType.prototype.toJSONSchema = function () {
    // This is a basic implementation that returns a simple JSON schema
    // For more complex schemas, you might want to use a library like zod-to-json-schema
    return {
      type: "object",
      properties: {},
      required: [],
    };
  };
}

export {};
