function ProdutosDAO(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback) {
    this._connection.query("SELECT * FROM LIVROS", callback);
}

ProdutosDAO.prototype.salva = function(produto, callback) {
    this._connection.query("INSERT INTO LIVROS SET ?", produto, callback);
}

module.exports = function() {
    return ProdutosDAO;
}