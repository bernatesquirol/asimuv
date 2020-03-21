try:
    import unzip_requirements
except ImportError:
    pass
import simplejson as json
import numpy as np
import pandas as pd
import networkx as nx

from algorithm import utils, main


def protocol(body, code=200):
    response = {
        "statusCode": code,
         "headers": {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*'
        },
        "body": json.dumps(body, indent=2, ignore_nan=True)
    }
    return response


def route(event, context):
    try:
        if event['queryStringParameters']['number']:
            return protocol(main.get_route(int(event['queryStringParameters']['number'])))
    except Exception as e:
        body = {
            "message": "Terrible mistake: {}".format(str(e)),
            "input": event
        }
        return protocol(body, 422)

# ### Test

# +
# event_try = {'queryStringParameters':{'number':2}}
# recommended = route(event_try, None)

# +
# recommended
# -


