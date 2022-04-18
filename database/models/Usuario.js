module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define('Usuario', {
        idusuario: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        },
        senha: {
            type: DataType.STRING,
            allowNull: false
        },
        data_cadastro: {
            type: DataType.DATE,
            allowNull: false
        },
        data_atualizacao: {
            type: DataType.DATE,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        status: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        tableName: 'usuario',
        timestamps: false,
        indexes: [
            {
                name: 'unique_email',
                unique: true,
                fields: ['email']
            }
        ]
    })

    Usuario.associate = (model) => {
        Usuario.hasMany(model.Proposta, {
            foreignKey: {
                name: 'idusuario_freelancer',
                allowNull: false
            }
        })

        Usuario.hasMany(model.Servico, {
            foreignKey: {
                name: 'idusuario_cliente',
                allowNull: false
            }
        })

        Usuario.hasMany(model.Mensagem, {
            foreignKey: {
                name: 'idusuario_remetente',
                allowNull: false
            }
        })

        Usuario.hasMany(model.Mensagem, {
            foreignKey: {
                name: 'idusuario_destinatario',
                allowNull: false
            }
        })
    }

    return Usuario
}