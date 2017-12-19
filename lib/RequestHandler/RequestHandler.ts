import * as Promise from "bluebird";
import {BadRequestException} from "../BadRequestException/BadRequestException";

export abstract class RequestHandler {

    protected abstract config;

    constructor() {


    };


    public handle(request, context, callback): Promise<any> {

        context.callbackWaitsForEmptyEventLoop = this.config.cacheDbConnection;

        return this.validateRequest(request).then(() => {

            return this.resolveRequest(request).then((result) => {

                return callback(null, { "statusCode": 200, "body": JSON.stringify(result) });

            });

        }).catch(BadRequestException, (error) => {

            return callback(null, { "statusCode": 400, "body": error.message });

        }).catch((error) => {

            return callback(null, { "statusCode": 500, "body": error.message });

        });

    }

    protected abstract resolveRequest(request: any): Promise<any>;

    // TODO: should be handled in resolveRequest? but maybe generic structure?
    // protected abstract parseResult(result): Map<any>;

    protected abstract validateRequest(request: any): Promise<void>;

}