
export interface IConfig {
  port: number
  apiPrefix: string
  debug: boolean
  jwtSecret: string
  issuer: string
  databaseUrl: string
  tinyhost: string
}

const config: IConfig = {
  port: +process.env.PORT || 3000,
  apiPrefix: 'api',
  debug: process.env.NODE_ENV !== 'production',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  issuer: 'tinyurl',
  databaseUrl: process.env.DATABASE_URL || 'mysql://tinyurl:tinyurl@db.tinyurl:3306/tinyurl',
  tinyhost:  process.env.TINY_HOST || 'http://localhost:8000',
}

export default config
