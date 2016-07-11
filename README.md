# browser-resource
A simple library for integrating with RESTful API's. It will seemlesly integrate with any RESTful API, as long as it follows the rules of such.

# Installation

```
npm install --save browser-resource
```
Then `require` the `Resrouce` into your project, like so:

```
const Resource = require('browser-resource').Resource
```
or by using ES6 destructurizing syntax

```
const { Resource } = require('browser-resource');
```

### API
Instance of `Resource` has the following methods.
Please note, that below methods return a **Bluebird** promise, for you to easily handle any async requests.

**list(params: Object)**
* makes an `GET` request to the server for fetching a list of resources, the server should respond with an array of objectcs
* `params` are optional query parameters that will be added to the request.

**create(params: Object)**
* makes an `POST` request to the server
* `params` is an object that will be send in the `body` of the request

**update(params: Object)**
* makes an `PATCH` request to the server, in order to make ` PUT` request please take a look at **`insert`** method
* params will be sent as the `body` of the request. The `id` of the params object should be provided, this will be added to the url of the request. However, it will **NOT** be sent in the `body` of the request.

**insert(params: Object)**
* makes an `PUT` request to the server, this can theoretically create an entire resource on the server (along with an id), if it is allowed by the server.
* the `id` from `params` object will be added to the URL, but it will not be removed from the `body` of the request.

**destroy(params: Object)**
* makes an `DELETE` request to the server. 
* `params.id` needs to be provided in order to make sure which resource should be deleted. `id` won't be added to the request `body`

**action(name: String, params: Object, method = 'post')**
Somtimes an custom *action* is defined on a resource. This will send any type of request and any action on any resource.
For example:
*Resource* url is `/users` and we want to send an `POST` request to `email` action on the server that sends email to all the users in the system. To do this we simply write:

```
resource.action('email', { message: 'Hi' }).then(function (res) {
  // handle response
}).catch(ErrorResponse, function (err) {
  console.error(err);
});
```

