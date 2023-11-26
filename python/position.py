"""
To see which WebSocket topics are available, check the Bybit API documentation:
https://bybit-exchange.github.io/docs/v5/websocket/public/orderbook
"""

from time import sleep
from dotenv import dotenv_values

# Import WebSocket from the unified_trading module.
from pybit.unified_trading import WebSocket

# API KEYS
env_vars = dotenv_values(".env")

api_key = env_vars.get("MASTER_ACCOUNT_KEY")
api_secret = env_vars.get("MASTER_ACCOUNT_SECRET")
print("api_key",api_key)
print("api_secret",api_secret)

# Set up logging (optional)
import logging
logging.basicConfig(filename="pybit.log", level=logging.DEBUG,
                    format="%(asctime)s %(levelname)s %(message)s")


# Connect with authentication!
# Here, we are connecting to the "linear" WebSocket, which will deliver public
# market data for the linear (USDT) perpetuals.
# The available channel types are, for public market data:
#    inverse – Inverse Contracts;
#    linear  – USDT Perpetual, USDC Contracts;
#    spot    – Spot Trading;
#    option  – USDC Options;
# and for private data:
#    private – Private account data for all markets.

ws = WebSocket(
    testnet=True,
    channel_type="linear",
)

ws_private = WebSocket(
    testnet=True,
    channel_type="private",
    api_key=api_key,
    api_secret=api_secret,
    # trace_logging=True,
)


# Let's fetch the orderbook for BTCUSDT. First, we'll define a function.
def handle_orderbook(message):
    # I will be called every time there is new orderbook data!
    print(message)
    orderbook_data = message["data"]

# Now, we can subscribe to the orderbook stream and pass our arguments:
# our depth, symbol, and callback function.
# ws.orderbook_stream(50, "BTCUSDT", handle_orderbook)


# To subscribe to private data, the process is the same:
def handle_position(message):
    # I will be called every time there is new position data!
    print('message detected')
    print(message)

ws_private.position_stream(callback=handle_position)


while True:
    # This while loop is required for the program to run. You may execute
    # additional code for your trading logic here.
    sleep(1)