(function( $ ) {
	'use strict';

	// on document ready function.
	$(document).ready(function() {
		// on filtering the survey.
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

		// debouncing function.
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

		$('.surveyfunnel-lite-modal-content-card').on('click', function(e) {
			
			if(e.target.tagName.toUpperCase() === 'INPUT') return;
			
			$(this).find('input[type="radio"]').click();
		});

		$('#content-title').on('focus', function() {
			$('#content-title-warning').css('display','none');
		});

		$('#surveyfunnel-lite-modal-submit').on('click', function() {
			
			let contentTitle = $('#content-title').val();

			if ( ! contentTitle ) {
				$('#content-title-warning').css('display','block');
				return;
			}
			
			let contentType = $("input:radio[name ='content-type']:checked").val();
			// check for validations.

			// send ajax request.
			$.ajax({
				type: 'POST',
				url: ajax.ajaxURL,
				data: {
					action: 'surveyfunnel_lite_new_survey',
					security: ajax.ajaxSecurity,
					title: contentTitle,
					type: contentType,
				}
			}).done(data => {
				if ( data?.success && data.success ) {
					window.location = data.data.url_to_redirect;
				}
				else {
					// show error alert.
				}
			});
		});

		$( '.surveyfunnel-lite-content:first-child' ).on( 'click', function() {
			$('.surveyfunnel-lite-modal').css('display', 'flex');
		} );

		$( '.surveyfunnel-lite-dismiss' ).on('click', function() {
			$('.surveyfunnel-lite-modal').css('display', 'none');
		})

		$( '.deleteIcon' ).on('click', function() {
			// send ajax request.
			$.ajax({
				type: 'POST',
				url: ajax.ajaxURL,
				data: {
					action: 'surveyfunnel_lite_delete_survey',
					security: ajax.ajaxSecurity,
					id: $(this).attr('delete-id'),
				}
			}).done(data => {
				if ( data?.success && data.success ) {
					location.reload();
				}
			});
		})
	});
})( jQuery );
