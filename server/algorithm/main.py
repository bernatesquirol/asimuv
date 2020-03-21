import pandas as pd
import numpy as np
try:
    import utils
except:
    from . import utils



def get_route(number):
    return utils.suma(number,3)
