function getProducts() {
	$.get("http://localhost:8000/data/products.json", (data) => {
		alert("data loaded: " + data);
	});
}

getProducts();