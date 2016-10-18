import logging

from flask import Flask, render_template, json, jsonify
from supkitchen.config import *
from supkitchen.xmlrpcutils import SupervisorRPC

app = Flask(__name__)

config = readconfig()

@app.route('/')
def hello_world():
    return render_template('main.html')

@app.route('/api/servers')
def getservers():
    servers = jsonify(config.sections())

    return servers

@app.route('/api/serverstatus/<servername>')
def getserverstatus(servername):
    serverstatus = {}
    try:
        srpc = SupervisorRPC(**dict(config.items(servername)))
        serverstatus = srpc.getServerStatus()
    except:
        logging.error('Something Failed..')

    return jsonify(serverstatus)

@app.route('/api/serverprocesses/<string:servername>')
def getallserverprocesses(servername):
    srpc = SupervisorRPC(**dict(config.items(servername)))
    allprocesses = srpc.getAllProcesses()

    return jsonify(allprocesses)

@app.route('/api/processinfo/<string:servername>/<string:processname>')
def getprocessinfo(servername, processname):
    srpc = SupervisorRPC(**dict(config.items(servername)))
    processinfo = srpc.getProcessInfo(processname)

    return jsonify(processinfo)

@app.route('/api/tailprocess/<string:servername>/<string:processname>')
def taillog(servername, processname):
    srpc = SupervisorRPC(**dict(config.items(servername)))
    tail = srpc.tailLog(processname)

    return jsonify(tail)


if __name__ == '__main__':
    app.run()

