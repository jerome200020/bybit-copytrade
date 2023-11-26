from unicodedata import category
from pybit.unified_trading import HTTP

def placePosition(api_key, api_secret, data):
	try: 
		session = HTTP(
			testnet=True,
			api_key=api_key,
			api_secret=api_secret,
		)
		print('apikey', api_key)
		print('secret', api_secret)
		print('data', data)
		print(session.place_order(
			category=data['category'],
			symbol=data['symbol'],
			side=data['side'],
			orderType=data['orderType'],
			qty=data['execValue'],
			price=data['execPrice'],
			isLeverage=data['isLeverage'],
		))
	except Exception as e:
		print('error', e)