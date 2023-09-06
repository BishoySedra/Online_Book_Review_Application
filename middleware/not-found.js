function notFoundHandler(req, res) {
    return res.status(404).send(`<h1>Page Not Found!</h1>`);
}

export default notFoundHandler;