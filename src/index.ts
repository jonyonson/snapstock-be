import * as dotenv from 'dotenv';
dotenv.config();
import config from './config';

import server from './app';

server.listen(config.port, () => {
  console.log(`Server is listening on http://localhost:${config.port}`);
});
