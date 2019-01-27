import dgram from 'dgram';

import { NetInterfaceModule } from './NetInterfaceModule';

/**
 * Not started. This will be mainly used for listening to Databse hooks and
 * transmit events to clients.
 */
class WebsocketModule extends NetInterfaceModule {

    constructor() {
        super();
    }
}

export { WebsocketModule };