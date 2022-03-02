module.exports = (sequelize, DataType) => {
    const Servico = sequelize.define('Servico', {
        idservico:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao:{
            type: DataType.TEXT('long'),
            allowNull: false
        },
        valor_a_pagar:{
            type: DataType.FLOAT(10, 2),
            allowNull: false
        },
        data_entrega:{
            type: DataType.DATE,
            allowNull: false
        }
    },{
        tableName: 'servico',
        timestamps: false
    })

    Servico.associate = (model) => {
        Servico.belongsTo(model.TipoServico, {
          foreignKey: 'idtipo_servico',
          as: 'tipo_servico'
        })
      }

    Servico.associate = (model) => {
        Servico.belongsTo(model.Usuario, {
          foreignKey: 'idusuario_cliente',
          as: 'usuario'
        })
      }

      Servico.associate = (model) => {
        Servico.hasMany(model.Proposta, {
          foreignKey: 'idservico'
        })
      }

    return Servico
}