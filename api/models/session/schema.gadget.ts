import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "session" model, go to https://soof-shopify.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-ne-jAIHSyIB_",
  fields: {
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey:
        "ModelField-TZjtmuZbbauu::FieldStorageEpoch-Tv-2qhJqIu3k",
    },
  },
  shopify: { fields: ["shop", "shopifySID"] },
};
