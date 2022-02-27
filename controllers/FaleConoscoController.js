const FaleConoscoController = {
    viewForm: (req, res) => {
        return res.render('fale_conosco', { title: 'Fale Conosco' })
    }
}

module.exports = FaleConoscoController