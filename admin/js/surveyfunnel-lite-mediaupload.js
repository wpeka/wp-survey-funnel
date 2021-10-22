(function ($) {
    "use strict";

	$('#wpss_upload_image_button').click(function() {
		var formfield = $('#wpss_upload_image').attr('name');
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		return false;
	});
	
	window.send_to_editor = function(html) {
		var doc = new DOMParser().parseFromString(html, "text/xml");
		let imgurl = doc.firstChild.getAttribute('src');
		$('#wpss_upload_image').val(imgurl);
		tb_remove();
		$('#wpss_upload_image_thumb').html("<img height='65' src='"+imgurl+"'/>");
	}
})(jQuery);
