# node-router
A node.js web server boilerplate using Fastify as server framework by default. In its current state, the project is ideal for serving APIs.

## Start

```javascript
npm start
```

### Development mode

A SSL certificate is not needed in this case, the server will run on HTTP.

```javascript
npm run dev
```

## Adding new routes
The default route path should be indicated in the config file `config.json`. An example route path shown in `config.json.example` points to `src/components/network/router/routes`. Note that the path listed in the config file is relative to the path of `Router.ts`. You can add subfolders in the `routes` folder as it will be read recursively by the router.

### Route structure

Each route has a property `route`, which returns a `RouteModel`. This defines all the attributes of the route. The route `schema` gets its components from Fastify.

#### Example route
```javascript
import { Route } from "../NetRoute";
import { RouteModel } from "../RouteModel";
import { Router } from "../Router";

class Index extends Route {

    private str: string = 'world';

    constructor() {
        super();

        this.initialise(this.route());
    }

    protected route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/',
            schema : null,
            handler: this.process.bind(this)
        });
    }

    public async process(request: any, reply: any) {
        await super.process(request, reply);

        const str = (
            `<p>hello <b>${this.str}</b>!</p>`
        );

        reply.send(str);
    }
}

module.exports = { Route: Index };
```

##### Post body
```javascript
protected route(): RouteModel {
    return new RouteModel({
        method: 'POST',
        endpoint: '/login',
        schema : {
          body {
            username: { type: 'string', required: true },
            password: { type: 'string', required: true },
            email: { type: 'string' } // 'required' is false by default
          }
        },
        handler: this.process.bind(this)
    });
}
```

#### Authentication
```javascript
protected route(): RouteModel {
    return new RouteModel({
        method: 'POST',
        endpoint: '/publish',
        auth: true,
        schema : {
          body {
            title: { type: 'string', required: true },
            content: { type: 'string', required: true }
          }
        },
        handler: this.process.bind(this)
    });
}
```

Authentication is handled in `NetRoute.ts` under the method `isAuthenticated`. You should examine the request and define if the user is authenticated (e.g using tokens) and return a corresponding boolean.
```javascript
static isAuthenticated(route: RouteModel, request: any): boolean {
  if (request.headers['token'] == null)
    return false;

  return Token.validate(request.headers['token']);
}
```
