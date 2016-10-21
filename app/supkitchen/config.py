import ConfigParser
import logging

def readconfig(configfile='./supervisors.cfg'):
    config = ConfigParser.RawConfigParser()
    config.read(configfile)

    return config