//registerAs():Think of it as giving a name to a configuration.
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.MONGODB_URI,
}));