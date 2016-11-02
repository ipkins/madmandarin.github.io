 = function(option) {
/* ---------------------------- begin view ----------------------------- */
	'use strict';

	var view = {
		
	};
/* ----------------------------- end view ------------------------------ */
	
/* ---------------------------- begin model ---------------------------- */
	
	var model = {
		
	};
/* ----------------------------- end model ----------------------------- */
/* -------------------------- begin controller ------------------------- */
	
	var controller = {
		
	};
/* --------------------------- end controller -------------------------- */
/* --------------------- anonymous initialize function ----------------- */
	(function() {
		var app = {
			init: function () {
				this.main();
				this.event();
			},
			main: function () {
			},
			event: function () {
				document.addEventListener("DOMContentLoaded", controller.start);
			}
		};
		
		app.init();
	}());
/* --------------------- anonymous initialize function ----------------- */
/* --------------------- returned object ----------------- */
	var obj = {
		scrollTo: controller.scrollingTo,
		start: controller.start,
	};
	return obj;
/* --------------------- end returned object ----------------- */
	
};