import 'dotenv/config';
import { httpServer } from './http_server';
import { launchWS } from './server/server';

httpServer.listen(process.env.HTTP_PORT, () => {
  console.log(`HTTP server running on http://localhost:${process.env.HTTP_PORT}`);
})

launchWS();