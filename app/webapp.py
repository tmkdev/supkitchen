import logging
from flask import Flask, render_template, jsonify, request, send_from_directory
from supkitchen.config import *
from supkitchen.xmlrpcutils import SupervisorRPC

app = Flask(__name__)

config = readconfig()

@app.route('/')
def index_static():
    return send_from_directory('static', 'index.html')

@app.route('/api/servers')
def getservers():
    servers = jsonify(config.sections())

    return servers

@app.route('/api/serverstatus/<string:servername>')
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
    try:
        srpc = SupervisorRPC(**dict(config.items(servername)))
        allprocesses = srpc.getAllProcesses()

        return jsonify(allprocesses)

    except:
        return jsonify([{'name': 'Unknown', 'requestetedserver': 'servername', 'error': 'Unknown Server'}])


@app.route('/api/processinfo/<string:servername>/<string:processname>')
def getprocessinfo(servername, processname):
    srpc = SupervisorRPC(**dict(config.items(servername)))
    processinfo = srpc.getProcessInfo(processname)

    return jsonify(processinfo)

@app.route('/api/tailprocess/<string:servername>/<string:processname>')
def taillog(servername, processname):
    taillength = request.args.get('length', '3072')

    srpc = SupervisorRPC(**dict(config.items(servername)))
    tail = srpc.tailLog(processname, length=taillength)

    return jsonify(tail)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9000)

