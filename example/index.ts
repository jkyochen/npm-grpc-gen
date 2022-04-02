import {
    Server,
    ChannelCredentials,
    ServerCredentials,
} from '@grpc/grpc-js';
import { promisify } from 'util';
import { GreeterServer, GreeterClient, GreeterService, HelloReply } from 'npm-grpc-gen';

const server = new Server();

const impl: GreeterServer = {
    sayHello(call, callback) {
        callback(null, HelloReply.fromPartial({
            message: `Hello World ${call.request.name}`,
        }));
    },
};

server.addService(GreeterService, impl);

(async function () {

    try {
        const port = await promisify(server.bindAsync.bind(server))('localhost:0', ServerCredentials.createInsecure())
        server.start();
        const client = new GreeterClient(`localhost:${port}`, ChannelCredentials.createInsecure());
        const res = await promisify(client.sayHello.bind(client))({ name: "Lan" });
        console.log(res);
    } catch (error) {
        console.error(error);
    }

})()
