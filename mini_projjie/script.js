console.log('connected');
import requests
import json
R = requests.post('http://nova.astrometry.net/api/login', data={'request-json': json.dumps({"apikey": "gvcwovvlvmrdzfpz"})})
print(R.text)
