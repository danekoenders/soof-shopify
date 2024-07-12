import { deleteRecord, ActionOptions, DeleteShopConnectionActionContext } from "gadget-server";

/**
 * @param { DeleteShopConnectionActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await deleteRecord(record);
};

/**
 * @param { DeleteShopConnectionActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
