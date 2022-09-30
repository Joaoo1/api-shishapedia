import { app } from './main';

const port = process.env.API_PORT ?? '';

app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
