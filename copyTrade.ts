// import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from '../src';

// or
import { DefaultLogger, WS_KEY_MAP, WebsocketClient } from "bybit-api";

const logger = {
  ...DefaultLogger,
  silly: (...params: any[]) => console.log("silly", ...params),
};

const TESTNET_API_KEY = "VJifUlsQ3eAzNajnM3";
const TESTNET_API_SECRET = "kyD8TmjZ00mQ4dzaVsGIjZHmKCkskIV7kMyp";
const MAINNET_API_KEY = "ZMJwhkiz3z82ApfbUa";
const MAINNET_API_SECRET = "CDge14PpLLIMJpiOAi8bi4UoUd5v5irjHC15";

/**
 * Prepare an instance of the WebSocket client. This client handles all aspects of connectivity for you:
 * - Connections are opened when you subscribe to topics
 * - If key & secret are provided, authentication is handled automatically
 * - If you subscribe to topics from different v5 products (e.g. spot and linear perps),
 *    subscription events are automatically routed to the different ws endpoints on bybit's side
 * - Heartbeats/ping/pong/reconnects are all handled automatically.
 *    If a connection drops, the client will clean it up, respawn a fresh connection and resubscribe for you.
 */
const wsClient = new WebsocketClient(
  {
    key: MAINNET_API_KEY,
    secret: MAINNET_API_SECRET,
    market: "v5",
    pongTimeout: 100000,
  },
  logger
);

wsClient.on("update", (data) => {
  console.log("data", data);
  console.log("raw message received ", JSON.stringify(data));
  // console.log('raw message received ', JSON.stringify(data, null, 2));
});

wsClient.on("open", (data) => {
  console.log("connection opened open:", data.wsKey);
});
wsClient.on("response", (data) => {
  console.log("log response: ", JSON.stringify(data, null, 2));
});
wsClient.on("reconnect", ({ wsKey }) => {
  console.log("ws automatically reconnecting.... ", wsKey);
});
wsClient.on("reconnected", (data) => {
  console.log("ws has reconnected ", data?.wsKey);
});
wsClient.on("error", (data) => {
  console.error("ws exception: ", data);
});

/**
 * For public V5 topics, use the subscribeV5 method and include the API category this topic is for.
 * Category is required, since each category has a different websocket endpoint.
 */

// Linear v5
// -> Just one topic per call
// wsClient.subscribeV5('orderbook.50.BTCUSDT', 'linear');

// -> Or multiple topics in one call
// wsClient.subscribeV5(
//   ["orderbook.50.BTCUSDT", "orderbook.50.ETHUSDT"],
//   "linear"
// );

// Inverse v5
// wsClient.subscribeV5('orderbook.50.BTCUSD', 'inverse');

// Spot v5
// wsClient.subscribeV5('orderbook.50.BTCUSDT', 'spot');

// Option v5
wsClient.subscribeV5("publicTrade.BTCUSDT", "spot");

/**
 * For private V5 topics, just call the same subscribeV5() method on the ws client or use the original subscribe() method.
 *
 * Note: for private endpoints the "category" field is ignored since there is only one private endpoint
 * (compared to one public one per category)
 */

// wsClient.subscribeV5("position", "linear");
// wsClient.subscribeV5("execution", "linear");
// wsClient.subscribeV5(["order", "wallet", "greek"], "linear");

// Other example topics

// To unsubscribe from topics (after a 5 second delay, in this example):
// setTimeout(() => {
//   console.log('unsubscribing');
//   wsClient.unsubscribeV5('orderbook.50.BTCUSDT', 'linear);
// }, 5 * 1000);

// Topics are tracked per websocket type
// Get a list of subscribed topics (e.g. for public v3 spot topics) (after a 5 second delay)
setTimeout(() => {
  const activePrivateTopics = wsClient
    .getWsStore()
    .getTopics(WS_KEY_MAP.v5Private);

  console.log("Active private v5 topics: ", activePrivateTopics);

  const activePublicLinearTopics = wsClient
    .getWsStore()
    .getTopics(WS_KEY_MAP.v5LinearPublic);
  console.log("Active public linear v5 topics: ", activePublicLinearTopics);

  const activePublicSpotTopis = wsClient
    .getWsStore()
    .getTopics(WS_KEY_MAP.v5SpotPublic);
  console.log("Active public spot v5 topics: ", activePublicSpotTopis);

  const activePublicOptionsTopics = wsClient
    .getWsStore()
    .getTopics(WS_KEY_MAP.v5OptionPublic);
  console.log("Active public option v5 topics: ", activePublicOptionsTopics);
}, 5 * 1000);
