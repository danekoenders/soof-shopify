import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopConnection" model, go to https://soof-shopify.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "RJUpHNJh4uGC",
  fields: {
    shopifyShop: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "shopifyShop" },
      storageKey: "tygc8eJkXWP6",
    },
    token: {
      type: "string",
      validations: { required: true, unique: true },
      storageKey: "qe2sMKDty0Q7",
    },
  },
};
