module.exports = (sequelize, DataType) => {
    const FaleConosco = sequelize.define('FaleConosco', {
        idmensagem: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        },
        data: {
            type: DataType.DATE,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        mensagem: {
            type: DataType.TEXT('long'),
            allowNull: false
        },
    }, {
        tableName: 'fale_conosco',
        timestamps: false
    })

    return FaleConosco
}