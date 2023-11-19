import { RestClientV5 } from "bybit-api";

const TESTNET_API_KEY = "VJifUlsQ3eAzNajnM3";
const TESTNET_API_SECRET = "kyD8TmjZ00mQ4dzaVsGIjZHmKCkskIV7kMyp";
const MAINNET_API_KEY = "ZMJwhkiz3z82ApfbUa";
const MAINNET_API_SECRET = "CDge14PpLLIMJpiOAi8bi4UoUd5v5irjHC15";

async function main() {
  const client = new RestClientV5({
    testnet: true,
    key: TESTNET_API_KEY,
    secret: TESTNET_API_SECRET,
  });

  client
    .submitOrder({
      category: "spot",
      symbol: "BTCUSDT",
      side: "Buy",
      orderType: "Limit",
      qty: "0.1",
      price: "15600",
      // timeInForce: "PostOnly",
      orderLinkId: "spot-test-postonly",
      isLeverage: 0,
      orderFilter: "Order",
    })
    .then((response) => {
      console.log(response);
    });
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
