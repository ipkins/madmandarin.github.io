var mmCryptoConvertor = function(option) {
/* ---------------------------- begin view ----------------------------- */
	'use strict';

	var view = {
		createOption: function(name, value, id, parent) {
			var option = document.createElement('option');

			option.innerHTML = name;
			option.value = value;
			option.id = id;
			option.className = 'mmOptionSelect';

			parent.appendChild(option);
		},
		prepareForm: function(currency, inputs) {
			inputs.select.forEach(function(select, i, arr) {
				currency.forEach(function(item, j, arr) {
					view.createOption(item, item, 'mmOption'+i+'Select'+item, select);
				});
			});

			var temp = document.getElementById('mmOption0SelectBTC');
			temp.setAttribute('selected', '');
			temp = document.getElementById('mmOption1SelectUSD');
			temp.setAttribute('selected', '');

			inputs.text[0].value = 1;
		}
	};
/* ----------------------------- end view ------------------------------ */
	
/* ---------------------------- begin model ---------------------------- */
	
	var model = {
		currentRates: null,

		updateRates: function(url, callback) {
			if (callback == undefined) {
				var callback = function() {}
			};
			var xhr = new XMLHttpRequest();
			xhr.open("get", url, true);
			xhr.responseType = "json";
			xhr.onload = function() {
				if (xhr.status == 200) {
					var res = xhr.response;
					var rates = null;
					if (typeof res.ticker.markets !== "undefined") {
						res.ticker.markets.forEach(function(item, i, arr) {
							if (item.market == "BTC-E") {
								rates = item.price;
							};
						});
					};
					if (rates == null) {
						rates = res.ticker.price;
					};
					model.currentRates = rates;
					callback();
				} else {
					console.error('Error server updates: ' + xhr.status);
				}
			};
			xhr.send();
		}

	};
/* ----------------------------- end model ----------------------------- */
/* -------------------------- begin controller ------------------------- */
	
	var controller = {
		inputs: {
			text: [],
			select: []
		},
		

		start: function() {
			this.inputs.text.push(document.getElementById(option.controlId.firstInput));
			this.inputs.text.push(document.getElementById(option.controlId.secondInput));
			this.inputs.select.push(document.getElementById(option.controlId.firstSelect));
			this.inputs.select.push(document.getElementById(option.controlId.secondSelect));

			view.prepareForm(option.currency, this.inputs);
			var forJsonCallback = function() {
				controller.update(0);
			}
			model.updateRates(option.urlUpdates + 'BTC-USD', forJsonCallback);
		},
		updateСurrency: function() {
			var forJsonCallback = function() {
				controller.update(0);
			}
			model.updateRates(option.urlUpdates + this.inputs.select[0].value + '-' + this.inputs.select[1].value, forJsonCallback);
		},

		update: function(num) {
			if (!num) {
				var res = this.inputs.text[0].value * model.currentRates; 
				res = Math.round(res * 100000000) / 100000000;
				this.inputs.text[1].value = res;
			} else {
				var res = this.inputs.text[1].value * (1 / model.currentRates);
				res = Math.round(res * 100000000) / 100000000;
				this.inputs.text[0].value = res;
			}
		}
	};
/* --------------------------- end controller -------------------------- */
/* --------------------- anonymous initialize function ----------------- */

	(function() {
		var app = {
			init: function () {
				if(document.getElementById(option.containerId) != null) {
					this.main();
					controller.start();
					this.event();
				};
			},
			main: function () {
			},
			event: function () {
				controller.inputs.text[0].oninput = function() {
					controller.update(0);
				}
				controller.inputs.text[1].oninput = function() {
					controller.update(1);
				}
				controller.inputs.select[0].oninput = function() {
					controller.updateСurrency();
				}
				controller.inputs.select[1].oninput = function() {
					controller.updateСurrency();
				}
			}
		};
		
		app.init();
	}());
/* --------------------- anonymous initialize function ----------------- */

/* --------------------- returned object ----------------- */
	var obj = {
		text: 'хуй'
	};

	return obj;

/* --------------------- end returned object ----------------- */
	
};

var option = {
	urlUpdates: 'https://api.cryptonator.com/api/full/',
	currency: ['BTC','LTC','ETH','DASH','XMR', 'USD', 'RUB', 'EUR'],
	containerId: 'cryptoConvertor',
	controlId: {
		firstInput: 'firstConvertorInput',
		secondInput: 'secondConvertorInput',
		firstSelect: 'firstConvertorSelect',
		secondSelect: 'secondConvertorSelect',
	}

}
var mmCryptoCourse = null;
document.addEventListener("DOMContentLoaded", function() {mmCryptoCourse = mmCryptoConvertor(option);});