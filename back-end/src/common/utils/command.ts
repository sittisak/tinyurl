import program from 'commander'
import shell from 'shelljs'
import conf from '../../config'


program
  .command('migrate')
  .action(async (env, options) => {
    shell.exec(`npx sequelize db:migrate --url ${conf.databaseUrl}`)
  })

program.parse(process.argv)
