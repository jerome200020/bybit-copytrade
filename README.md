# Bybit Copytrade

## Table of contents

- [Installation](#installation)
- [Run scripts](#run-scripts)
- [Toubleshooting](#troubleshooting)
- [Strategy](#strategy)
- [Problems faced](#problems-faced)

## Installation

```
pnpm install
```

## Run scripts

### Streaming data for spot trading on USDTBTC

```
pnpm stream
```

This will create a websocket data stream that will receive push notifications from spot trading on the pair USDTBTC.

EXAMPLE RESPONSE

```
data {
  topic: 'publicTrade.BTCUSDT',
  ts: 1700374747800,
  type: 'snapshot',
  data: [
    {
      i: '2290000000083262324', // -----> trade ID
      T: 1700374747798,         // -----> trade timestamp
      p: '36559.5',             // -----> price of the trade
      v: '0.000055',            // -----> qty of trade
      S: 'Buy',                 // -----> trade side, BUY or SELL
      s: 'BTCUSDT',             // -----> pair symbol
      BT: false                 // -----> is block trade or not
    }
  ],
  wsKey: 'v5SpotPublic'
}
```

### Executing trades on testnet

```
pnpm execute
```

This will place a spot order on testnet for a set of hardcoded values. Only test of concept, will create a flexible helper function to create trades later on.

## Troubleshooting

### ETIMEDOUT error from bybit api calls

Choices of vpn for this project is Windscribe. Do download windscribe and connect to non-US server IPs if you encounter errors like ETIMEDOUT.

## Strategy

1. Listen to spot trading information through websockets.
2. Create a callback function to execute trades by copying trade info from a certain user.

## Problems faced

1. Do not understand how to uniquely identify user orders from pool, as far as I understand trades are uniquely indentified by trade ID. (which changes after a trade is completed)
2. Unable to place trades on testnet due to insufficient funds.
