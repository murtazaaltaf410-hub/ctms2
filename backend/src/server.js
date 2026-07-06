import app from './app.js';
import config from './config/index.js';

const port = config.port;

app.listen(port, () => {
  console.log(`CTMS Backend running on port ${port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Client URL: ${config.clientUrl}`);
});

export default app;
