import { Client } from "@gadget-client/soof-shopify";

export const api = new Client({ environment: window.gadgetConfig.environment });
