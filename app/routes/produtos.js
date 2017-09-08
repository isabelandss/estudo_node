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
                    response.render(result);
                }
            });
        });
        connection.end();
    });

    app.get("/produtos/form", function(req, response) {
        response.render("produtos/form");
    });
    
    app.post("/produtos", function(req, response) {
        var connection = app.infra.connectionFactory();
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);

        var produto = req.body;

        ProdutosDAO.salva(produto, function(erros, resultados) {
            response.redirect("/produtos");
        });
    });
}
