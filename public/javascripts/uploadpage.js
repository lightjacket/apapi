(function() {
	$( document ).ready(function() {
		$(".dropdown-menu li a").click(function(){
		  	var selText = $(this).text();
		  	$(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>'); 
		  	var menuType = $(this).data().menuType;
		  	var text;
		  	switch(menuType) {
		  		case 1: text = "Upload a zip file with a csv file containing paths to your images and the expected text result";
		  		$(".hidden-type-input").attr('value', 1);
		  		break;
		  		case 2: text = "Upload a zip file with a csv file containing paths to your audio and the expected text result";
		  		$(".hidden-type-input").attr('value', 2);
		  		break;
		  		case 3: text = "Not supported";
		  		$(".hidden-type-input").attr('value', 3);
		  		break;
		  	}
		  	$(".upload-section-container").show();
		  	$(".upload-instructions").text(text);

		});
	});
}());