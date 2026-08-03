
//This file its jobs is to collect all the enviroment varibles (.env) into organized objects

export default () => ({
 port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    uri: process.env.MONGODB_URI,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  mail: {
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT, 10) || 587,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
  from: process.env.MAIL_FROM,
},
});