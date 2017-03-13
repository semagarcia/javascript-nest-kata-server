import { Middleware, NestMiddleware } from 'nest.js';

@Middleware()
export class CorsMiddleware implements NestMiddleware {

    resolve() {
        return (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        }
    }

}