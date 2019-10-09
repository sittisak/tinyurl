import { Model, DataTypes } from 'sequelize'
import { Auth } from '../common/models'
import sequelize from '../common/utils/connection'


class Tinyurl extends Model {
  public slug!: string
  public auth!: string
  public originalUrl!: string
  public createdAt!: string

  static async slugify(slugInput: string) {
    const checkExistSlug = async (slug, fill=0) => {
      const checkSlug = `${slug}${fill || ''}` 
      const findSlug = await this.findByPk(checkSlug)
      if (findSlug) {
        const useSlug = await checkExistSlug(slug, fill+1)
        return useSlug
      }
      return checkSlug
    }
    const slug = await checkExistSlug(slugInput)
    return slug
  }
}
Tinyurl.init({
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  auth: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'common_auth',
      key: 'username',
    },
  },
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
}, {
  sequelize,
  freezeTableName: true,
  tableName: 'tinyurl_tinyurl',
  timestamps: true,
  updatedAt: false,
})

Tinyurl.belongsTo(Auth, { foreignKey: 'auth' })

export { Tinyurl }
