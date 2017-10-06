
var getProducts = (function () {
	var rawData;
	
	function _getAsync(){
		$.get("./data/products.json", (data) => {
			rawData = data;
			trier(data);		
		});
	}
	function trier(data){
		//trier tableau avewc $
		var id = "";

		data.forEach((element) => {
			$("#products-list").append(
				'		<div class="product">	'+
				'		<a href="./product.html" title="En savoir plus...">	'+
				'	<h2>'+element.id+'</h2>		 '+
				'	<img alt="Manette Xbox 360" '+
				'src="./assets/img/xbox-controller.png">		 '+
				'<p><small>Prix</small> 29,99&thinsp;$</p>		'+
				'</a>'+
				'</div>')
			});
		



	
	}
	return {       
		getDatas: function () {
            _getAsync();
        },
    };
});

var test = getProducts();
test.getDatas();
console.log($.get("http://localhost:8000/data/products.json", (data) => {	
}))