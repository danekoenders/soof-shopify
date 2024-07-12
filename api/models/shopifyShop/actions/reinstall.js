import { transitionState, applyParams, preventCrossShopDataAccess, save, ActionOptions, ShopifyShopState, ReinstallShopifyShopActionContext } from "gadget-server";
import { identifyShop } from '../../../services/mantle';
import { updateShop } from '../../../utils/appBridge/shop';

/**
 * @param { ReinstallShopifyShopActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  transitionState(record, {from: ShopifyShopState.Uninstalled, to: ShopifyShopState.Installed});
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

/**
 * @param { ReinstallShopifyShopActionContext } context
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
    
    const shop = await updateShop({ shop: record, shopDomains: shopDomains });
  } catch (error) {
    throw new Error(error);
  }
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
  triggers: { api: false },
};
