module.exports = {
	addToProducts(req, res, next) {
		const db = req.app.get("db");
		console.log(req.body);
		const { item_id, name, price, description, img_url, quantity } = req.body;

		db.addToProducts([item_id, name, price, description, img_url, quantity])
			.then(response => {
				res.status(200).send(response);
			})
			.catch(err => res.status(500).send(err));
	},
	getProducts(req, res) {
		const db = req.app.get("db");
		db.getProducts()
			.then(products => res.status(200).json(products))
			.catch(console.log);
	}
};
