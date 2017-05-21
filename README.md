# Hello Service (microservice chaining)

This example illustrates microservice chaining / proxying where one microservice uses another 
microservice as part of its implementation. 

This package defined two services:

* PublicHelloService: which defines a simple ```/hello``` endpoint that delegates to our PrivateHelloService
* PrivateHelloService: which defines a simple ```/hello``` endpoint that returns ```{ msg: "Hello world!" }```

**Flow**

```
Client                       PublicHelloService                 PrivateHelloService
  |                          
  |        GET /hello            
  | ---------------------------> /hello
                                    |           GET /hello
                                    | -----------------------------> /hello
                                                                       |
                                        200: { msg: "Hello world!" }   |
                                    <----------------------------------|
                                    |
      200: { msg: "Hello world!" }  |
  |<--------------------------------|
```

## Installing the service

We encourage you to clone the git repository so you can play around
with the code. 

```
% git clone git@github.com:carbon-io/example__hello-world-service-advanced-chaining.git
% cd example__hello-world-service-advanced-chaining
% npm install
```

## Running the services

Start the private service:

```sh
% node lib/PrivateHelloService
```

Start the public service (order does not matter):

```sh
% node lib/PublicHelloService
```

For cmdline help:

```sh
% node lib/PublicHelloService -h
```

or 

```sh
% node lib/PrivateHelloService -h
```

## Accessing the service

To access the ```/hello``` endpoint on the public service:

```
% curl localhost:8888/hello 
{ msg: "Hello world!" }
```

## Running the unit tests

This example comes with a simple unit test written in Carbon.io's test framework called TestTube. It is located in the ```test``` directory. 

```
% node test/HelloServiceTest
```

or 

```
% npm test
```

## Generating API documentation (aglio flavor)

```sh
% node lib/PrivateHelloService gen-static-docs --flavor aglio --out docs/private-api.html
```

```sh
% node lib/PublicHelloService gen-static-docs --flavor aglio --out docs/public-api.html
```

View current documentation
* [Private service](
http://htmlpreview.github.io/?https://raw.githubusercontent.com/carbon-io/example__hello-world-service-chaining/master/docs/private-api.html)
* [Public service](
http://htmlpreview.github.io/?https://raw.githubusercontent.com/carbon-io/example__hello-world-service-chaining/master/docs/private-api.html)
