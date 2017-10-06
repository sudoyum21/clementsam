function getProducts() {
	$.get("http://localhost:8000/data/products.json", data => {
		$($.parseJSON(JSON.stringify(data))).each(data => {
			console.log(this.id);
		});
	});
}
getProducts();
