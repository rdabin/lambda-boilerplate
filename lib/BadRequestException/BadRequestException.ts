export class BadRequestException extends Error {

    constructor(public message) {

        super(message);

        (this as any).__proto__ = BadRequestException.prototype;
    }
}