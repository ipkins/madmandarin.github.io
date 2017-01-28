var mmCryptoCourseCreater = function(option) {
/* ---------------------------- begin view ----------------------------- */
	'use strict';

	var view = {
		update: function(item, name) {
			var block = document.getElementById(name);
			var oldVal = block.innerHTML;
			block.innerHTML = item.price;
			if (oldVal > item.price) {
				block.className = "red";
			} else if (oldVal < item.price) {
				block.className = "green";
			} else {
				block.className = "";
			}
			
			console.log(item)
		}
	};
/* ----------------------------- end view ------------------------------ */
	
/* ---------------------------- begin model ---------------------------- */
	
	var model = {
		urlUpdates: 'https://api.cryptonator.com/api/full/',

		course: {
			'BTC': {
				market: 'BTC-E',
				price: null,
				json: null
			},
			'LTC': {
				market: 'BTC-E',
				price: null,
				json: null
			},
			'DSH': {
				market: 'BTC-E',
				price: null,
				json: null
			},
			'ETH': {
				market: 'BTC-E',
				price: null,
				json: null
			},
			'XMR': {
				market: 'Poloniex',
				price: null,
				json: null
			}
		},

		courseBtcUsd: null,

		getJSON: function(url, callback, toCallback) {
			if (callback == undefined) {
				var callback = function() {}
			};

			var res = null;
			var xhr = new XMLHttpRequest();
			xhr.open("get", url, true);
			xhr.responseType = "json";
			xhr.onload = function() {
				if (xhr.status == 200) {
					res = xhr.response;
					callback(res, toCallback);
				} else {
					res = 'error'
					console.error('Error server updates: ' + xhr.status)
					callback(res, toCallback);
				}
			};
			xhr.send();
		},

		getCourse: function(para, marketNeed, name, callback) {
			var iMarkets = null;
			var course = null;
			var findMarket = function(market) {
				var statusMarket = false;
				market.forEach(function(item, i, arr) {
					if (item.market == marketNeed) {
						statusMarket = true;
						iMarkets = i;
					}
				});
				return statusMarket;
			};
			var parseJson = function(res, callback) {
				model.course[name].json = res;
				if (findMarket(model.course[name].json.ticker.markets)) {
					model.course[name].price = model.course[name].json.ticker.markets[iMarkets].price;
				} else {
					model.course[name].price = model.course[name].json.ticker.price;
				}
				callback(model.course[name], name);
			};
			var link = this.urlUpdates + para;
			this.getJSON(link, parseJson, callback);
		},

		updateCourse: function(callBack) {
			for (var item in this.course) {
				model.getCourse(item + '-usd', this.course[item].market, item, callBack)
			}
			
		},

	};
/* ----------------------------- end model ----------------------------- */
/* -------------------------- begin controller ------------------------- */
	
	var controller = {
		timer: null,

		start: function() {
			model.updateCourse(view.update);
			this.timer = setInterval(function() {
				model.updateCourse(view.update);
			}, 2000)
		}
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

	};

	return obj;

/* --------------------- end returned object ----------------- */
	
};

var mmCryptoCourse = mmCryptoCourseCreater();