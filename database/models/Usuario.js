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
            allowNull: false,
            unique: 'email'
        },
        status: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        tableName: 'usuario',
        timestamps: false
    })

    Usuario.associate = (model) => {
        Usuario.hasMany(model.Proposta, {
            foreignKey: 'idusuario_freelancer',
            as: 'propostas'
        })
    }

    Usuario.associate = (model) => {
        Usuario.hasMany(model.Servico, {
            foreignKey: 'idusuario_cliente',
            as: 'servicos'
        })
    }
    
    return Usuario
}