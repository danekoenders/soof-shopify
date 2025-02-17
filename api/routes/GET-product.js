import { RouteContext } from "gadget-server";

export default async function route({ request, reply, api, logger, connections }) {
  // Extract the product title from query parameters
  const type = request.query.type;
  const title = request.query.title;
  const searchTerm = request.query.searchTerm;

  if (!isAuthorized(reply, request, logger)) {
    return await reply.status(403).send({ error: "Unauthorized" });
  }

  if (type === "productRecommendation") {
    const response = await productRecommendation({ api, logger, request, searchTerm });
    return await reply.type("application/json").send(response);
  } else if (type === "productByTitle") {
    const response = await productByTitle({ api, logger, request, title });
    logger.info(response)
    return await reply.type("application/json").send(response);
  } else {
    return reply.status(400).send({ error: "Incorrect query (url parameter) provided" });
  }
}

async function productRecommendation({ api, logger, request, searchTerm }) {
  try {
    const currentShopId = request.headers["x-shopify-shop-id"];

    const products = await api.shopifyProduct.findMany({
      search: searchTerm,
      filter: {
        shop: {
          equals: currentShopId,
        },
      },
      first: 5,
      select: {
        title: true,
        handle: true,
        variants: {
          edges: {
            node: {
              position: true,
              price: true,
            },
          },
        },
        images: {
          edges: {
            node: {
              position: true,
              source: true,
            },
          },
        },
      },
    });

    if (products.length < 1) {
      const response = {
        status: "failed",
        message: "No products found on this search term",
      };

      return response;
    }

    if (products.length > 0) {
      let response = {
        status: "success",
        amount: products.length,
        products: products.map((product) => {
          return {
            title: product.title,
            images: product.images?.edges.filter(image => image.node.position === 1),
            variants: product.variants?.edges.filter(variant => variant.node.position === Math.min(...product.variants.edges.map(variant => variant.node.position))),
            handle: product.handle,
          };
        }),
      };

      return response;
    }
  } catch (error) {
    return error;
  }
}

async function productByTitle({ api, logger, request, title }) {
  try {
    const currentShopId = request.headers["x-shopify-shop-id"];
    const products = await api.shopifyProduct.findMany({
      search: title,
      filter: {
        shop: {
          equals: currentShopId,
        },
      },
    });

    if (products.length < 1) {
      const response = {
        status: "No product found by this title"
      };

      return response;
    }

    if (products.length > 0) {
      let response = {
        status: "success",
        title: products[0].title,
        body: products[0].body,
        productCategory: products[0].productCategory?.productTaxonomyNode.fullName,
      };

      return response;
    }
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

function isAuthorized(reply, request, logger) {
  const allowedOrigin = process.env.SOOF_APP_DOMAIN;
  const authorization = request.headers.authorization;

  if (!authorization === process.env.AUTHORIZATION) {
    logger.error('Acces denied');
    return false;
  }

  // Set CORS headers
  reply.headers({
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Authorization, X-Shopify-Shop-Id",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  return true;
}