module.exports = (sequelize, DataType) => {
    const TipoServico = sequelize.define('TipoServico', {
        idtipo_servico: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        servico: {
            type: DataType.STRING,
            allowNull: false
        }
    }, {
        tableName: 'tipo_servico',
        timestamps: false,
        indexes: [
            {
                name: 'unique_servico',
                unique: true,
                fields: ['servico']

            }
        ]
    })

    TipoServico.associate = (model) => {
        TipoServico.hasMany(model.Servico, {
            foreignKey: {
                name: 'idtipo_servico',
                allowNull: false
            }
        })
    }

    return TipoServico
}