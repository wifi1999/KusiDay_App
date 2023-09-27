from flask import Flask, request #import Flask class from the Flask library
app = Flask(__name__) #create instance of the Flask class, assign to var app, __name__ var used to define the root path for the application

@app.route('/') #decorator that specify the route for the application 
@app.route('/hello') #decorator that specify the route for the application 
def HelloWorld(): #define a python function named "HelloWorld", which will be executed when user access either route
    return "Hello World" #return the statement of 'HelloWorld' function

@app.route('/greet') # add a new route using the '@app.route('/greet')' that accept the name query parameter
def Greet():
    name = request.args.get('name', 'Guest') #get the 'name' query parameter from the URL using get request.args, if the name is not provided we will default to 'Guest'
    greeting = f"Hello, {name}"

    return greeting

if __name__ == '__main__':
    app.debug = True #set the app to debug mode, which provides details error message and automatically reloads when code changes are detected, helpful for development
    app.run(host = '0.0.0.0', port = 4000) #start a development server. 0.0.0.0 means server will listen to all available network interface, 4000 specify which port the server will listen to the incoming http request



    