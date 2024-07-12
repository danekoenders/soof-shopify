// This shop app bridge will help me to connect the shopify app to the web application of Soof.

const createShop = async ({ shop, shopDomains }) => {
    const response = await fetch(`${process.env.SOOF_APP_DOMAIN}/api/appBridge/shop`, {
        method: 'POST',
        headers: {
            "Authorization": process.env.AUTHORIZATION,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: shop.id,
            customName: shop.name,
            domains: shopDomains,
            supportEmail: shop.email,
            shopifyState: shop.state,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

const updateShop = async ({ shop, shopDomains }) => {
    const response = await fetch(`${process.env.SOOF_APP_DOMAIN}/api/appBridge/shop`, {
        method: 'PUT',
        headers: {
            "Authorization": process.env.AUTHORIZATION,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: shop.id,
            customName: shop.name,
            domains: shopDomains,
            supportEmail: shop.email,
            shopifyState: shop.state,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

module.exports = {
    createShop,
    updateShop,
};