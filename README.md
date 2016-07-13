# browser-resource
A simple library for integrating with RESTful API's. It will seemlesly integrate with any RESTful API, as long as it follows the rules of such.

### Installation

```
npm install --save browser-resource
```
Then `require` the `Resrouce` into your project, like so:

```js
const Resource = require('browser-resource').Resource
```
or by using ES6 destructurizing syntax

```js
const { Resource } = require('browser-resource');
```

Or if you can use ES6 imports

```js
import { Resource } from 'browser-resource';
// all bellow examples will not be using this sytanx, but you can, if you want.
```

### Configuration
Currently `browser-resource` supports only two global config options, in order to achive them, get the `Config` function, like so:

```js
const { Config } = require('browser-resource');
Config(function (config) {
    // config is the object that you need to modify to setup the entire library
    // available options are listed below
});
```

**namespace**
* string that will be prepended to every url before an request has been made

For example:
```js
config.namespace = '/api/v1';
```

**headers**
* **headers has to be an array of arrays**
* those headers will be added to every request you send

For example:

```js
config.headers = [['Authorization', 'Bearer super-secret-token']];
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

### Error Handling
The returned `Promise` from any of the request methods is a **Bluebird** Promise. Meaning you can provide which errors you want to catch as a first argument of the `catch` function. I highly recommend doing so. If you will catch every error in this `catch` callback you will really have a hard time developing your application. `browser-resource` thankfuly exposes the Error klass which you can use to provide as the first agrugment

```js
const { ErrorResponse, Resource } = require('browser-resource');

const resource = new Resource('/users');
resource.list().then(function (res) {
  // do what you need to do when a successful response has been received
}).catch(ErrorResponse, fuction (err) {
   // do the error handling
   // the error response is under err.err
});
```

One thing about the `err` object - it will keep the `err` response under the `err` property of the thrown error, for example: `err.err`.
