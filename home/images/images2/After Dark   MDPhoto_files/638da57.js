$(function(){
	
	$(document)
	
	/**
	 * This event is triggered when an image is selected
	 */
	.on("image-selected", function (event, index, photo) {
		// Do we have a single add/remove favourites button? ie. in JS galleries
		var btn = $("#btn-favorites");
		
		if(btn.length > 0) {
			// Update the button's data elements to reflect the data of the source image
			btn.data('favourite-page-label', photo["favourite-page-label"]);
			btn.data('add-favourite-target', photo["add-favourite-target"]);
			btn.data('remove-favourite-target', photo["remove-favourite-target"]);
			btn.data('remove-favourite-text', photo["remove-favourite-text"]);
			btn.data('add-favourite-text', photo["add-favourite-text"]);
			btn.data('image-uid', photo["image-uid"]);
			btn.data('photo', photo);

			// Has the image already been added to favourites?
			// Toggle the classes associated with add/remove favourites on the global button
			if(photo["is-favourite"])
				btn.removeClass('add').addClass('remove');
			else
				btn.removeClass('remove').addClass('add');
			
			// Update the button's contents to reflect the source image data
			updateFavouriteButton(btn);
		}
	})
	
	/**
	 * This event is triggered when the global add/remove favourites button is clicked
	 * or the indivdual add/remove favourites links associated with an image
	 */
	.on('click', '#btn-favorites, .btn-favourites', function (e) {
		e.preventDefault();
		
		var self = $(this)
			url = null;
		
		// Has the button already been disabled?
		if(self.attr('disabled') == 'disabled')
			return;
		
		// Disable the button just in case
		self.attr('disabled', 'disabled');
		
		// Figure out which URL we're going to target
		if(self.hasClass('remove'))
			url = self.data('remove-favourite-target')
		else
			url = self.data('add-favourite-target');
		
		$.ajax(url, { 
			cache: false,
			success: function(result){
				var response = JSON.parse(result),
					image = $("#"+response.imageUid);
				
				// Update the favourite state of the source image
				if(image)
					image.data('is-favourite', !image.data('is-favourite'));
				
				// Trigger that favourites has been updated
				$(document).trigger('fm.favouritesupdated', [response]);
			},
			complete: function() {
				
				// Remove the disabled safeguard
				self.removeAttr('disabled');
				
				// Find all the global fav button or individual fav buttons
				var allInstancesOfFavourites = $('#btn-favorites, a[data-image-uid="'+self.data('image-uid')+'"]')
				
				allInstancesOfFavourites.each(function(i, e) {
					var $e = $(e),
						photo = $e.data('photo');
					
					// Update the status of the photo element in a JS gallery
					if(photo)
						photo['is-favourite'] = !photo['is-favourite'];
					
					// Toggle the element classes
					if($e.hasClass('remove'))
						$e.removeClass('remove').addClass('add');
					else
						$e.removeClass('add').addClass('remove');
					
					// Update the button's contents to reflect the source image data
					updateFavouriteButton($e);
				});
				
				// Fire the appropriate event for this action
				if(self.hasClass('add'))
					$(document).trigger('fm.favouriteremoved', [ self ]);
				else
					$(document).trigger('fm.favouriteadded', [ self ]);
			}
		});
	});
	
	return;
	
	function updateFavouriteButton(favouriteButton) {
		var heart = heart = '<i class="fa fa-heart"></i> ';
		
		if(favouriteButton.hasClass('btn')) {
			if(favouriteButton.hasClass('remove')) {
				favouriteButton.html(heart + favouriteButton.data("remove-favourite-text"));
				favouriteButton.attr("title", favouriteButton.data("remove-favourite-text"));
			}
			else {
				favouriteButton.html(heart + favouriteButton.data("add-favourite-text"));
				favouriteButton.attr("title", favouriteButton.data("add-favourite-text"));
			}
		} 
		else {
			if(favouriteButton.hasClass('remove')) {
				if(favouriteButton.data("remove-favourite-html").length > 0)
					favouriteButton.html(favouriteButton.data("remove-favourite-html"));
				else
					favouriteButton.text(favouriteButton.data("remove-favourite-text"));
				favouriteButton.attr("title", favouriteButton.data("remove-favourite-text"));
			}
			else {
				if(favouriteButton.data("remove-favourite-html").length > 0)
					favouriteButton.html(favouriteButton.data("add-favourite-html"));
				else
					favouriteButton.text(favouriteButton.data("add-favourite-text"));
				favouriteButton.attr("title", favouriteButton.data("add-favourite-text"));
			}
		}
	}
});
