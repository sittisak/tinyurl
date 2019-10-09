import { Sequelize } from 'sequelize'
import conf from '../../config'


const options = {
  logging: conf.debug,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
}

export default new Sequelize(conf.databaseUrl, options)
