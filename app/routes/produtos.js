module.exports = function(app) {

    var listaProdutos = function(req, response) {
        var connection = app.infra.connectionFactory();
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);

        ProdutosDAO.lista(function(err, result){
            response.render("produtos/lista", {lista: result});
        });
        connection.end();
    }

    app.get("/produtos", function(req, response) {
        var connection = app.infra.connectionFactory();
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);

        ProdutosDAO.lista(function(err, result){
            response.format({
                html: function() {
                    response.render("produtos/lista", {lista: result});
                },
                json: function() {
                    response.json(result);
                }
            });
        });
        connection.end();
    });

    app.get("/produtos/form", function(req, response) {
        response.render("produtos/form", {errosValidacao: {}, produto: {}});
    });
    
    app.post("/produtos", function(req, response) {
        var connection = app.infra.connectionFactory();
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);

        var produto = req.body;

        req.assert('nome', 'O título é obrigatório').notEmpty();
        req.assert('preco', 'Formato inválido').isFloat();

        var erros = req.validationErrors();

        if(erros) {
            response.format({
                html: function() {
                    response.status(400).render("produtos/form", {errosValidacao: erros, produto: produto});
                },
                json: function() {
                    response.status(400).json(erros);
                }
            });
            
            return;
        }

        ProdutosDAO.salva(produto, function(erros, resultados) {
            response.redirect("/produtos");
        });
    });
}
