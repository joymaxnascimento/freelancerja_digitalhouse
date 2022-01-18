module.exports = (sequelize, DataType) => {
    const TipoServico = sequelize.define('TipoServico', {
        idtipo_servico:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        servico:{
            type: DataType.STRING,
            allowNull: false
        }
    },{
        tableName: 'tipo_servico',
        timestamps: false
    })

    return TipoServico
}