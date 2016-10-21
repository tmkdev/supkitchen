import xmlrpclib
import logging
import sys

class SupervisorRPC(object):
    def __init__(self, host, user=None, password=None):
        self.host = host
        self.user = user
        self.password = password

        if self.user is not None:
            serverstring='http://{0}:{1}@{2}/RPC2'.format(self.user, self.password, self.host)
        else:
            serverstring='http://{0}/RPC2'.format(self.host)

        self.server = xmlrpclib.Server(serverstring)

    def getServerStatus(self):
        try:
            status = self.server.supervisor.getState()
        except:
            logging.critical(sys.exc_info()[0])
            logging.critical(sys.exc_info()[1])

        return status

    def getAllProcesses(self):
        return self.server.supervisor.getAllProcessInfo()

    def getProcessInfo(self, processname):
        return self.server.supervisor.getProcessInfo(processname)

    def tailLog(self, processname, length=4096):
        return self.server.supervisor.tailProcessStdoutLog(processname, 0, length)