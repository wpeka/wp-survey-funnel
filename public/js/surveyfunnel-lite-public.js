(function( $ ) {
	'use strict';
	$(document).ready(function() {
		$(".iframewrapper").each(function(){
			let html = $(this).attr("data-content");
			let type = $(this).attr('survey-type');
			let iframe = '<iframe width="100%" height="100%" scrolling="no" id="surveyfunnel-lite-iframe" class="surveyfunnel-lite-iframe surveyfunnel-lite-sc-' + type + '" frameborder="0" src=""></iframe>';
			

			if ( type !== 'popup' ) {
				writeContentHtml(html, type, iframe, $(this));
			}
			else if ( type === 'popup' ){
				let shareSettings = JSON.parse($(this).attr('config-settings'));
				console.log(shareSettings);
				const { launchOptions } = shareSettings.popup.behaviourOptions;
				switch( launchOptions.launchWhen ) {
					case 'afterPageLoads':
						writeContentHtml(html, type, iframe, $(this));
						break;
					case 'afterTimeDelay':
						setTimeout(() => {
							writeContentHtml(html, type, iframe, $(this));
						}, launchOptions.afterTimeDelay * 1000)
						break;
					case 'afterScrollPercentage':
						showPopupOnScroll(launchOptions.afterScrollPercentage, html, type, iframe, $(this));
						break;
					case 'afterExitIntent':
						showPopupOnExitIntent( launchOptions.afterExitIntent, html, type, iframe, $(this));
						break;
				}
			}
			
		});

		function writeContentHtml(html, type, iframe, ele) {

			let iframee = document.createElement('iframe');
			iframee.setAttribute('width', '100%');
			iframee.setAttribute('height', '100%');
			iframee.setAttribute('scrolling', 'no');
			iframee.setAttribute('frameborder', '0');
			iframee.setAttribute( 'src', '' );
			iframee.classList.add( 'surveyfunnel-lite-sc-' + type );
			iframee.id = 'surveyfunnel-lite-iframe';
			$(ele).append( iframee );
			
			var context = iframee.contentDocument.write(html);
			iframee.contentWindow.document.close(); //without this line, page loading animations won't go away!

			function resizeIframe(iframe) {
				iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
			}

			$(iframee).on("load", function() {
				
				if ( type === 'responsive' ) {
					resizeIframe(this);
				}				
			})
		}

		window.addEventListener('surveyfunnel-lite-remove-event', function(e) {
			document.getElementById(e.detail.id).remove();
		})

		var flag = false;

		function showPopupOnScroll (scrollPercentage, html, type, iframe, ele) {
			function scrollEventFunction () {scrollEventListener( scrollPercentage, html, type, iframe, ele )}
			window.addEventListener('scroll', scrollEventFunction);

			function scrollEventListener(scrollPercentage, html, type, iframe, ele) {
				if ( flag ) {
					return;
				}
				let available = document.body.scrollHeight;
				
				let half_screen = available * scrollPercentage;
				let contentHeight = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
				let docHeight = window.innerHeight;
				var scrollPercent = (contentHeight) / (available - docHeight);
				var scrollPercentRounded = Math.round(scrollPercent*100);
				if ( scrollPercentRounded > scrollPercentage ) {
					writeContentHtml(html, type, iframe, ele);
					window.removeEventListener('scroll', scrollEventFunction);
				} else {}
			}
		}
	
		function showPopupOnExitIntent(exitIntent, html, type, iframe, ele) {
            window.addEventListener("mousemove", showPopupOnExitIntentFunction);

			function showPopupOnExitIntentFunction(e) { showPopupOnExitIntentListener(e, html, type, iframe, ele) }

			function showPopupOnExitIntentListener(e, html, type, iframe, ele) {
                let exitY = 999999;
                switch (exitIntent) {
                    case "high":
                        exitY = 100;
                        break;
                    case "medium":
                        exitY = 50;
                        break;
                    case "low":
                        exitY = 25;
                        break;
                }
                if (exitY > e.clientY) {
                    writeContentHtml(html, type, iframe, ele);
					window.removeEventListener("mousemove", showPopupOnExitIntentFunction);
                }
            }
        }
	})
})( jQuery );
