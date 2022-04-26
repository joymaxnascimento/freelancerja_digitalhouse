module.exports = (sequelize, DataType) => {
  const Proposta = sequelize.define('Proposta', {
    idproposta: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataType.TEXT('long'),
      allowNull: false
    },
    valor_proposto_freelancer: {
      type: DataType.FLOAT(10, 2),
      allowNull: false
    },
    aceite_cliente: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    arq_trabalhos: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    pagamento_cliente: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'proposta',
    timestamps: false
  })

  Proposta.associate = (model) => {
    Proposta.belongsTo(model.Servico, {
      foreignKey: {
        name: 'idservico',
        allowNull: false,
        unique: 'unique_idservico_idusuariofreelancer'
      }
    })

    Proposta.belongsTo(model.Usuario, {
      foreignKey: {
        name: 'idusuario_freelancer',
        allowNull: false,
        unique: 'unique_idservico_idusuariofreelancer'
      }
    })

    Proposta.hasMany(model.Mensagem, {
      foreignKey: {
        name: 'idproposta',
        allowNull: false
      }
    })
  }

  return Proposta
}