import { SocketGateway, NestGateway, GatewayServer, SubscribeMessage } from 'nest.js/socket';

@SocketGateway({ port: 5000 })
//@SocketGateway({ port: 81, namespace: 'users' })
export class StreamingGateway implements NestGateway {
    @GatewayServer server: SocketIO.Server;

    afterInit(server) {}
    
    handleConnection(client) {}

    handleDisconnect(client) {}

    @SubscribeMessage({ value: 'msg' })
    onMsg(sender: SocketIO.Socket, data) {
        console.log('Data (msg): ', data);

        sender.emit('msg', { sender:sender.id, ts:new Date().toString(), who:'sender.emit' });
        this.server.emit('msg', { sender:sender.id, ts:new Date().toString(), who:'server.emit' });
        this.server.send('msg', { sender:sender.id, ts:new Date().toString(), who:'server.emit' });
        this.server.emit('msg2', { who:'onMsg - msg2' });
    }

    @SubscribeMessage({ value: 'message' })
    onMessage(sender: SocketIO.Socket, data) {}

    @SubscribeMessage({ value: 'start-streaming' })
    onStartStreaming(sender: SocketIO.Socket, data) {
        sender.join(data);  // ---> Use //@SocketGateway({ port: 5000, namespace: 'users' })
    }

    @SubscribeMessage({ value: 'code' })
    onUpdatedCodeInChallengeMode(sender: SocketIO.Socket, data) {
        sender.broadcast.to(data.challengeId).emit('code', {
            code: data.code,
            who: data.player
        });




        // Llamar al servicio donde están todos los challenges (inject dependency)
        // Recuperar el elemento i-ésimo en función del challengeId
        // Recuperar la lista de subscribers (socket viendo el streaming)
        // Enviar a cada uno de ellos el código actualizado indicando si es el playerA o el playerB

        
    }

    sendMessage(type, payload) {
        this.server.emit(type, payload);
    }

}