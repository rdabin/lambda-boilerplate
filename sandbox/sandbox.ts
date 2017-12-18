import {ExampleRequestHandler} from "./ExampleRequestHandler/ExampleRequestHandler";

// Example req handler w/ basic validation, db connection, api gateway -> lambda -> dynamo/rds/mongo/rekognition?
const exampleRequestHandler = new ExampleRequestHandler();//{ validate: () => {}});

export const handler = exampleRequestHandler.handle.bind(exampleRequestHandler);

// export function handler(event, context, callback) {
//
//     return callback(null, { "statusCode": 200, "body": JSON.stringify({ mock: "result" }) });
// }