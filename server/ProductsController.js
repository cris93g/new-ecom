module.exports = {
	addToProducts(req, res, next) {
		const db = req.app.get("db");
		const { item_id, name, price, description, img_url, quantity } = req.params;
		db.addToProducts([item_id, name, price, description, img_url, quantity])
			.then(response => {
				res.status(200).send(response);
			})
			.catch(err => res.status(500).send(err));
	}
};
