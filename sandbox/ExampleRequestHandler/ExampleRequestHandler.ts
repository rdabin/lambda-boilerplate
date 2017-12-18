import {RequestHandler} from "../../lib/RequestHandler/RequestHandler";
import {Configure} from "@homeoffice/configurator";
import {BadRequestException} from "../../lib/BadRequestException/BadRequestException";


export class ExampleRequestHandler extends RequestHandler {

    @Configure("ExampleRequestHandler")
    protected config;

//     constructor() {
//
//         super();
//     }



    protected resolveRequest(request): Promise<any> {

        return Promise.resolve({ mock: "result" });
    }

    protected validateRequest(request): Promise<void> {

        const result = revalidator.validate(request, {

            properties: {
                data: {
                    type: 'string',
                    maxLength: 2,
                    required: true
                }
            }

        });

        if (!result.valid) {

            return Promise.reject(new BadRequestException(result.errors));
        }

        return Promise.resolve();
    }

}