(function( $ ) {
	'use strict';

	$(document).ready(function() {
		$('[data-search]').on('keyup', debounce(function() {
			let searchVal = $(this).val();
			let filterItems = $('[data-filter-item]');
		
			if ( searchVal != '' ) {
				filterItems.addClass('d-none');
				$('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('d-none');
			} else {
				filterItems.removeClass('d-none');
			}
		}, 250, false));

		function debounce(func, wait, immediate) {
			var timeout;
		  
			return function executedFunction() {
			  var context = this;
			  var args = arguments;
				  
			  var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			  };
		  
			  var callNow = immediate && !timeout;
			  
			  clearTimeout(timeout);
		  
			  timeout = setTimeout(later, wait);
			  
			  if (callNow) func.apply(context, args);
			};
		};
	});
})( jQuery );
