import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import randToken from 'rand-token'
import { Model, DataTypes } from 'sequelize'
import conf from '../config'
import sequelize from './utils/connection'


class Auth extends Model {
  public username!: string
  public password!: string
  public refreshToken: any
  public readonly createdAt!: Date

  static async createUser({
    username,
    password,
  }): Promise<Auth> {
    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync())
    const [user, created] = await this.findOrCreate({
      where: { username },
      defaults: { username, password: passwordHash },
    })
    if (!created) {
      throw `username ${username} is already exist`
    }
    return user
  }

  static async authenticate(username, password): Promise<Auth> {
    const user: Auth = await this.findByPk(username)
    if (!user) {
      throw 'username or password incorrect'
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
      throw 'username or password incorrect'
    }
    return user
  }

  async signIn(request): Promise<string> {
    const refreshToken: string = randToken.generate(128)
    this.refreshToken = [...this.refreshToken, {
      token: refreshToken,
      time: new Date(),
      userAgent: request.headers['user-agent'],
    }]
    await this.save()
    return refreshToken
  }

  async signOut(refreshToken: string): Promise<void> {
    this.refreshToken = this.refreshToken.filter((refreshTokens) => {
      return refreshTokens.token !== refreshToken
    })
    await this.save()
  }

  getAccessToken(refreshToken: string): any {
    if (this.refreshToken
        .findIndex(refreshTokens => refreshTokens.token === refreshToken) === -1) {
      throw `not found refresh token: ${refreshToken}`
    }
    const accessToken = jwt.sign(
      this.getJWTData(),
      conf.jwtSecret,
      { issuer: conf.issuer, expiresIn:  '1h'},
    )
    return { refreshToken, accessToken, username: this.username }
  }

  getJWTData(): any {
    return { username: this.username }
  }

  getProfile(): any {
    return { username: this.username, createdAt: this.createdAt }
  }
}
Auth.init({
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.JSON,
    field: 'refresh_token',
    defaultValue: [],
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
}, {
  sequelize,
  freezeTableName: true,
  tableName: 'common_auth',
  timestamps: true,
  updatedAt: false,
})

export { Auth }
