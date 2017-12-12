var main = function(option) {
/* ---------------------------- begin view ----------------------------- */
	'use strict';

	var view = {
		createCell: function(parent, text, classList, type = 'td', lisener = null) {
			var cell = document.createElement(type);
			if (typeof text == 'object') {
				var f = text.f;
				var name = f(text.obj);
				cell.appendChild(name);
			} else {
				cell.innerHTML = text;
			};
			if (lisener != null) {
				cell.addEventListener("click", function() {
					controller.fillTable(lisener);
				});
			}
			cell.className = classList;
			parent.appendChild(cell);
		},
		createCommandName: function(item) {
			var obj = document.createElement("div");
			if (item.flag_country == 'Италия') {
				var img = document.createElement("img");
				img.className = 'flag';
				img.setAttribute('src', 'flag.png');
				obj.appendChild(img);
			};
			var a = document.createElement("a");
			a.setAttribute('href', item.tag_url);
			a.innerHTML = item.name;
			obj.appendChild(a);
			return obj;
		},
		createTable: function(parent) {
			var table 	= document.createElement("table");
			var thead 	= document.createElement("thead");
			var tr 		= document.createElement("tr");
			view.createCell(tr, '', 'place', 'th');
			view.createCell(tr, 'Команда', 'name', 'th');
			view.createCell(tr, 'М', 'statistic cBlue pointer', 'th', 1);
			view.createCell(tr, 'В', 'statistic cBlue pointer win', 'th', 2);
			view.createCell(tr, 'Н', 'statistic cBlue pointer draw', 'th', 3);
			view.createCell(tr, 'П', 'statistic cBlue pointer lose', 'th', 4);
			view.createCell(tr, 'Заб', 'statistic cBlue pointer goals', 'th', 5);
			view.createCell(tr, 'Проп', 'statistic cBlue pointer conGoals', 'th', 6);
			view.createCell(tr, 'О', 'statistic cBlue pointer bgGray', 'th', 7);


			thead.appendChild(tr);
			table.appendChild(thead);
			var tbody 	= document.createElement("tbody");
			table.appendChild(tbody);


			var tfoot 	= document.createElement("tfoot");
			tr = document.createElement("tr");
			var td = document.createElement("td");
			td.innerHTML = '<strong>М</strong> – матчи, <strong>Вa</strong> – выигрыши, <strong>Н</strong> – ничьи, <strong>П</strong> – проигрыши, <strong>Заб</strong> – забитые голы, <strong>Проп</strong> – пропущенные голы, <strong>О</strong> – очки в турнире';
			td.setAttribute('colspan', '99')
			td.className = 'legend';
			tr.appendChild(td);
			tfoot.appendChild(tr);
			table.appendChild(tfoot);
			parent.appendChild(table);

			return table;
		},
		fillTable: function(table, data, sort) {
			if (sort != 0) {
				var revers = false;
				if (sort < 0) {
					revers = true;
					sort = -sort;
				};

				var sortFunction = {
					matches: function(a, b) {
						if (revers) {
							return a.matches - b.matches;
						} else {
							return b.matches - a.matches;
						}
					},
					win: function(a, b) {
						if (revers) {
							return a.win - b.win;
						} else {
							return b.win - a.win;
						}
					},
					draw: function(a, b) {
						if (revers) {
							return a.draw - b.draw;
						} else {
							return b.draw - a.draw;
						}
					},
					lose: function(a, b) {
						if (revers) {
							return a.lose - b.lose;
						} else {
							return b.lose - a.lose;
						}
					},
					goals: function(a, b) {
						if (revers) {
							return a.goals - b.goals;
						} else {
							return b.goals - a.goals;
						}
					},
					conGoals: function(a, b) {
						if (revers) {
							return a.conceded_goals - b.conceded_goals;
						} else {
							return b.conceded_goals - a.conceded_goals;
						}
					},
					score: function(a, b) {
						if (revers) {
							return a.score - b.score;
						} else {
							return b.score - a.score;
						}
					}
				}
				switch(sort) {
					case 1:
						data.teams.sort(sortFunction.matches);
						break;
					case 2:
						data.teams.sort(sortFunction.win);
						break;
					case 3:
						data.teams.sort(sortFunction.draw);
						break;
					case 4:
						data.teams.sort(sortFunction.lose);
						break;
					case 5:
						data.teams.sort(sortFunction.goals);
						break;
					case 6:
						data.teams.sort(sortFunction.conGoals);
						break;
					case 7:
						data.teams.sort(sortFunction.score);
						break;
				};
			}

			var tbody = document.getElementsByTagName('tbody');
			table.removeChild(tbody[0]);
			tbody = document.createElement("tbody");
			var createTr = function(item) {
				var tr 		= document.createElement("tr");
				var placeClass = 'place ';
				switch (item.color) {
					case '1':
						placeClass += 'bgGreen';
						break;
					case '2':
						placeClass += 'bgLightGreen';
						break;
					case '4':
						placeClass += 'bgRed';
						break;
				}
				view.createCell(tr, item.place, placeClass);
				view.createCell(tr, {f: view.createCommandName, obj: item}, 'name');
				view.createCell(tr, item.matches, 'statistic');
				view.createCell(tr, item.win, 'statistic win');
				view.createCell(tr, item.draw, 'statistic draw');
				view.createCell(tr, item.lose, 'statistic lose');
				view.createCell(tr, item.goals, 'statistic goals');
				view.createCell(tr, item.conceded_goals, 'statistic conGoals');
				view.createCell(tr, item.score, 'statistic bgGray');
				tbody.appendChild(tr);
			};
			data.teams.forEach(createTr);
			table.appendChild(tbody);
		}
	};
/* ----------------------------- end view ------------------------------ */

/* ---------------------------- begin model ---------------------------- */

	var model = {
		data: null,
		status: null,
		table: null,
		sort: null,

		getJSON: function(url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url, true);
			xhr.responseType = "json";
			xhr.onload = function() {
				model.status = xhr.status;
				if (model.status == 200) {
					model.data = xhr.response;
					callback();
				} else {
					callback();
				}
			};
			xhr.send();
		},
	};
/* ----------------------------- end model ----------------------------- */
/* -------------------------- begin controller ------------------------- */

	var controller = {
		start: function() {
			model.table = view.createTable(document.body, 'mainTable');
			model.getJSON('https://madmandarin.github.io/sport/seriea.json', controller.fillTable);
		},
		fillTable: function(sort = 7) {
			if (model.sort == sort) {
				var sort = -sort;
			}
			model.sort = sort;
			view.fillTable(model.table, model.data, sort);
		},
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

var tableControl = main();
