"""
@author Peter Marx

Start: 2017-03-09

Containing class and functions for employees
"""


class Employee(object):

    def __init__(self, EmpFirstName = None, EmpLastName = None, EmpType = None, EmpID = None):
        if EmpFirstName == None or EmpLastName == None:
            self.EmpFirstName = "John"
            self.EmpLastName = "Doe"
            self.EmpType = "Invisible"
            self.EmpID = 00000
        else:
            self.EmpFirstName = EmpFirstName
            self.EmpLastName = EmpLastName
            self.EmpType = EmpType
            self.EmpID = EmpID

    def __str__(self):
        return self.EmpLastName +" "+ self.EmpFirstName +": " + self.EmpType

    def addToDB(self):
        #TODO adding employee to database
        print 'logging'

if __name__ == '__main__':
    john = Employee()

    print john

    print 'employer'