import {Provide} from "ioc-container";
import * as revalidator from "revalidator";
import {RequestValidator} from "../../sandbox/RequestValidator";
import {BadRequestException} from "../BadRequestException/BadRequestException";

// @Provide(RequestValidator)
export class RequestValidatorMock implements RequestValidator {

    public validate(request: any): void {

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

            throw new BadRequestException("mock error");//result.errors);
        }
    }

}
