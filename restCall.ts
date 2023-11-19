import axios from "axios";
import { createHmac, createSign } from "crypto";
import https from "https";

async function main() {
  const key = "VJifUlsQ3eAzNajnM3";
  const secret = "kyD8TmjZ00mQ4dzaVsGIjZHmKCkskIV7kMyp";

  const timestamp = Date.now().toString();
  console.log("🚀 ~ timestamp:", timestamp);
  const recv_window = "20000";
  const queryString = "category=linear&symbol=USDTETH&limit=5";

  const signingPayload = `${timestamp}${key}${recv_window}${queryString}`;
  // ============= RSA-SHA256 =============
  // const dataBytes = Buffer.from(signingPayload, "utf8");
  // const sign = createSign("RSA-SHA256");
  // sign.update(dataBytes);
  // const signature = sign.sign(secret, "base64");

  // ============= HMAC-SHA256 =============
  const secretBytes = Buffer.from(secret, "utf-8");
  const dataBytes = Buffer.from(signingPayload, "utf-8");
  const signature = createHmac("sha256", secretBytes)
    .update(dataBytes)
    .digest("hex");

  let config = {
    method: "get",
    url: "https://api-testnet.bybit.com/v5/order/realtime",
    // timeout: 60000,
    // httpsAgent: new https.Agent({ keepAlive: true }),
    headers: {
      "X-BAPI-API-KEY": key,
      "X-BAPI-TIMESTAMP": timestamp,
      "X-BAPI-RECV-WINDOW": recv_window,
      "X-BAPI-SIGN": signature,
    },
  };

  const result = await axios(config);
  console.log("🚀 ~ file: restCall.ts:17 ~ main ~ result:", result.data);
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
