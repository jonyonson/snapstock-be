import * as dotenv from 'dotenv';
dotenv.config();

import server from './app';

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
