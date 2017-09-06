module.exports = function(app) {
    app.get("/produtos", function(req, response) {
        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);

        produtosBanco.lista(function(err, result){
            response.render("produtos/lista", {lista: result});
        });
        connection.end();
    });
}
