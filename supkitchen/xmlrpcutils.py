import xmlrpclib
import logging

class SupervisorRPC(object):
    def __init__(self, host, port=80, user=None, password=None):
        self.host = host
        self.port = port
        self.user = user
        self.password = password

        if self.user is not None:
            self.server = xmlrpclib.Server('http://{0}:{1}@{2}:{3}/RPC2'.format(self.user,
                                                                                self.password,
                                                                                self.host,
                                                                                self.port))
        else:
            self.server = xmlrpclib.Server('http://{0}:{1}@{2}:{3}/RPC2'.format(self.user,
                                                                                self.password,
                                                                                self.host,
                                                                                self.port))

    def getServerStatus(self):
        return self.server.supervisor.getState()


    def getAllProcesses(self):
        return self.server.supervisor.getAllProcessInfo()

    def getProcessInfo(self, processname):
        return self.server.supervisor.getProcessInfo(processname)

    def tailLog(self, processname, length=8096):
        return self.server.supervisor.tailProcessStdoutLog(processname, 0, length)