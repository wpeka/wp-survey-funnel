(function( $ ) {
	'use strict';
	$(document).ready(function() {
		$(".iframewrapper").each(function(){
			var html = $(this).attr("data-content");
			var type = $(this).attr('survey-type');
			var iframe = $(this).find('iframe');
			
			var context = iframe[0].contentDocument.write(html);
			iframe[0].contentWindow.document.close(); //without this line, page loading animations won't go away!
			function resizeIframe(iframe) {
				iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
			}

			iframe.on("load", function() {
				
				if ( type === 'responsive' ) {
					resizeIframe(this);
				}				
			})
		});

		window.addEventListener('wpsf-remove-event', function(e) {
			document.getElementById(e.detail.id).remove();
		})

	})
})( jQuery );
