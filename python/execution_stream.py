"""
To see which WebSocket topics are available, check the Bybit API documentation:
https://bybit-exchange.github.io/docs/v5/websocket/public/orderbook
"""

from time import sleep
from dotenv import dotenv_values
from place_order import placePosition
# import json
import ast 

# Import WebSocket from the unified_trading module.
from pybit.unified_trading import WebSocket

# API KEYS
env_vars = dotenv_values(".env")

master_api_key = env_vars.get("MASTER_ACCOUNT_KEY")
master_api_secret = env_vars.get("MASTER_ACCOUNT_SECRET")
follow_api_key = env_vars.get("FOLLOW_ACCOUNT_KEY")
follow_api_secret = env_vars.get("FOLLOW_ACCOUNT_SECRET")


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
    api_key=master_api_key,
    api_secret=master_api_secret,
    # trace_logging=True,
)

# To subscribe to private data, the process is the same:
def handle_execution(message):
    # I will be called every time there is new position data!   
    placePosition(follow_api_key, follow_api_secret, message['data'][0])
    #     dict = json.loads(message['data'])
    #     print('message ', message['data'][0].category)
    #     print(dict, ":", dict['symbol'], dict.category)
    # except Exception as e:
    #     print('early', e)

ws_private.execution_stream(callback=handle_execution)


while True:
    # This while loop is required for the program to run. You may execute
    # additional code for your trading logic here.
    sleep(1)