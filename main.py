#!/usr/bin/env -S python

import asyncio
import logging
import websockets

logging.basicConfig(level=logging.INFO)


class Server:
    clients = set()

    async def register(self, ws) -> None:
        self.clients.add(ws)
        logging.info(f'{ws.remote_address} connects.')

    async def unregister(self, ws) -> None:
        self.clients.remove(ws)
        logging.info(f'{ws.remote_address} disconnects.')

    async def send_to_clients(self, message: str) -> None:
        if self.clients:
            await asyncio.wait([client.send(message) for client in self.clients])

    async def ws_handler(self, ws, uri: str) -> None:
        await self.register(ws)
        try:
            await self.distribute(ws)
        finally:
            await self.unregister(ws)

    async def distribute(self, ws) -> None:
        async for message in ws:
            await self.send_to_clients(message)


server = Server()
start_server = websockets.serve(server.ws_handler, '0.0.0.0', 4000)
loop = asyncio.get_event_loop()
loop.run_until_complete(start_server)
loop.run_forever()
