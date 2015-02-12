function select_image(index) {
	var thumbnails = $("img[data-target]"), 
		img = thumbnails.addClass('inactive').eq(index).removeClass('inactive'),
		photo = {
			'label': img.data('label'),
			'description': img.data('description'),
			'source': img.data('source'),
			'favourite-page-label': img.data('favourite-page-label'),
			'is-favourite': img.data("is-favourite"),
			'add-favourite-target': img.data("add-favourite-target"),
			'remove-favourite-target': img.data("remove-favourite-target"),
			'remove-favourite-text': img.data("remove-favourite-text"),
			'add-favourite-text': img.data("add-favourite-text"),
			'image-uid': img.data("image-uid"),
			'product': img.data("product"),
			'unique-href': img.data("unique-href"),
			'show-add-to-cart': img.data("show-add-to-cart"),
			'tags': img.data('tags')
		};

	if(img.length > 0) {
		$(document).trigger("image-selected", [index, photo]);
	}
}

$(function () {
	$(document)
	.bind("image-selected", function (event, index, photo) {
		var details = $("#image-details"),
			actions = $("#image-actions");

		// Update the basic image details
		$.each(['label', 'description', 'tags'], function (index, property) {
			details.find("#img-" + property).html(photo[property]);
		});

		details.find('#img-unique-href').attr('href', photo["unique-href"]);

		// Add out product id to the "Add to cart" button. NOTE: attr is used because data does not update the dom.
		var btn_cart = actions.find("#btn-cart");

		if(photo['show-add-to-cart'] == false) {
			btn_cart.addClass('hide');
		}
		else {
			btn_cart.attr("data-cart-product", photo["product"]);
			btn_cart.data("cart-product", photo["product"]);
			btn_cart.removeClass('hide');
		}

		$('.social').addClass('hide');

		if($('.social').length > 0) {
			$('#social-' + photo["product"]).removeClass('hide');
			$('#social-' + photo["product"]).social();
		}
	});
});