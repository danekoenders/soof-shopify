import { transitionState, applyParams, save, ActionOptions, ShopifyShopState, InstallShopifyShopActionContext } from "gadget-server";
import { identifyShop } from '../../../services/mantle';
import { createShop } from '../../../utils/appBridge/shop';

/**
 * @param { InstallShopifyShopActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  transitionState(record, { to: ShopifyShopState.Installed });
  applyParams(params, record);
  await save(record);
};

/**
 * @param { InstallShopifyShopActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  await identifyShop({
    shop: record,
    api,
  });

  try {
    const shopDomains = await api.shopifyDomain.findMany({
      filter: {
        shop: {
          equals: record.id,
        },
      },
      select: {
        url: true,
      }
    });
    const shop = await createShop({ shop: record, shopDomains: shopDomains });
    const shopConnection = await api.shopConnection.create(shop.connectionToken);
  } catch (error) {
    throw new Error(error);
  }
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
  triggers: { api: false },
};
