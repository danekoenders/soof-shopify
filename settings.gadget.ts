import type { GadgetSettings } from "gadget-server";

export const settings: GadgetSettings = {
  type: "gadget/settings/v1",
  frameworkVersion: "v1.1.0",
  plugins: {
    connections: {
      shopify: {
        apiVersion: "2024-01",
        enabledModels: [
          "shopifyCollection",
          "shopifyDomain",
          "shopifyProduct",
          "shopifyProductImage",
          "shopifyProductOption",
          "shopifyProductVariant",
        ],
        type: "partner",
        scopes: [
          "read_customers",
          "read_products",
          "read_inventory",
          "read_shipping",
          "read_orders",
          "write_products",
        ],
      },
      sentry: true,
    },
  },
};
