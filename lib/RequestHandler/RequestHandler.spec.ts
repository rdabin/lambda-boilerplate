import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as Promise from "bluebird";
import * as sinon from "sinon";
import {Inject, Injector} from "ioc-container";
import {RequestHandler} from "./RequestHandler";
import {BadRequestException} from "../BadRequestException/BadRequestException";
import {RequestValidatorMock} from "../RequestValidator/RequestValidatorMock";


const expect = chai.expect;
chai.use(chaiAsPromised);

@Inject
class TestHandler extends RequestHandler {

    protected config = { cacheDbConnection: true };

    constructor() {

        super();
    }

    protected resolveRequest(request): Promise<any> {

        return Promise.resolve({ mock: "result" });
    }

    protected validateRequest(request) {

        if (!request.isValid) {

            // throw new BadRequestException("mock bad request")

            return Promise.reject(new BadRequestException("mock bad request"));

        }

        return Promise.resolve();
    }
}


const injector = new Injector([RequestValidatorMock]),
    testHandler = injector.get(TestHandler);


describe("RequestHandler", () => {

    describe("When asked to handle a request", () => {

        describe("when request is not valid", () => {

            it("should call callback with correct status code", () => {

                let responseSpy = sinon.spy();

                return testHandler.handle({ isValid: false }, {}, responseSpy).then(() => {

                    expect(responseSpy.calledWith(null, { "statusCode": 400, "body": "mock bad request" })).to.equal(true);

                });

            });

        });

        describe("when request is valid", () => {

            describe("when successful", () => {

                it("should ...", () => {

                    expect(false).to.equal(true);

                });

            });

        });

        describe("when asked to cache database connection", () => {

            it("should set callbackWaitsForEmptyEventLoop on context", () => {


            });

        });

    });

});