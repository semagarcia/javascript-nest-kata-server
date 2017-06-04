import { SocketGateway, NestGateway, GatewayServer, SubscribeMessage } from 'nest.js/socket';

@SocketGateway({ port: 5000 /*, namespace: 'users' */ })
export class StreamingGateway implements NestGateway {
    @GatewayServer server: SocketIO.Server;

    afterInit(server) {}
    
    handleConnection(client) {}

    handleDisconnect(client) {}

    @SubscribeMessage({ value: 'msg' })
    onMsg(sender: SocketIO.Socket, data) {
        sender.emit('msg', { sender:sender.id, ts:new Date().toString(), who:'sender.emit' });
        this.server.emit('msg', { sender:sender.id, ts:new Date().toString(), who:'server.emit' });
    }

    @SubscribeMessage({ value: 'message' })
    onMessage(sender: SocketIO.Socket, data) {
        console.log('onMessage: ', data);
    }

    @SubscribeMessage({ value: 'challenge' })
    onUpdatedCodeInChallengeMode(sender: SocketIO.Socket, data) {
        if(data.event === 'joinToChallenge') {
            // Join user into "streaming" room
            sender.join(data.challengeId);
        } else if(data.event === 'codeUpdated') {
            sender.broadcast.to(data.challengeId).emit('challenge', {
                event: data.event,
                code: data.code,
                who: sender.id
            });
        } else if(data.event === 'playerReady') {
            sender.broadcast.to(data.challengeId).emit('challenge', {
                event: data.event,
                playerName: data.playerName,
                playerId: sender.id
            });
        }
        //this.server.in(data.challengeId).emit('challenge', {});
    }

    /*startSyncChallenge(challengeId, payload) {
        this.server.in(challengeId).emit(payload);
    }

    sendMessage(type, payload) {
        this.server.emit(type, payload);
    }*/

}