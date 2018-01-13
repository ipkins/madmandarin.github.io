(function($){
	var Renderer = function(canvas)
	{
		var canvas = $(canvas).get(0);
		var ctx = canvas.getContext("2d");
		var particleSystem;

		var that = {
			init:function(system){
				//начальная инициализация
				particleSystem = system;
				particleSystem.screenSize(canvas.width, canvas.height); 
				particleSystem.screenPadding(80);
				that.initMouseHandling();
			},
      
			redraw:function(){
				//действия при перересовке
				ctx.fillStyle = "white";	//белым цветом
				ctx.fillRect(0,0, canvas.width, canvas.height); //закрашиваем всю область
			
				particleSystem.eachEdge(	//отрисуем каждую грань
					function(edge, pt1, pt2){	//будем работать с гранями и точками её начала и конца
						ctx.strokeStyle = "rgba(0,0,0, .333)";	//грани будут чёрным цветом с некой прозрачностью
						ctx.lineWidth = 1;	//толщиной в один пиксель
						ctx.beginPath();		//начинаем рисовать
						ctx.moveTo(pt1.x, pt1.y); //от точки один
						ctx.lineTo(pt2.x, pt2.y); //до точки два
						ctx.stroke();
				});
	
				particleSystem.eachNode(	//теперь каждую вершину
					function(node, pt){		//получаем вершину и точку где она
						var w = 10;			//ширина квадрата
						ctx.fillStyle = "orange";	//с его цветом понятно
						ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);	//рисуем
						ctx.fillStyle = "black";	//цвет для шрифта
						ctx.font = 'italic 13px sans-serif'; //шрифт
						ctx.fillText (node.name, pt.x+8, pt.y+8); //пишем имя у каждой точки
				});    			
			},
		
			initMouseHandling:function(){	//события с мышью
				var dragged = null;			//вершина которую перемещают
				var handler = {
					clicked:function(e){	//нажали
						var pos = $(canvas).offset();	//получаем позицию canvas
						_mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top); //и позицию нажатия кнопки относительно canvas
						dragged = particleSystem.nearest(_mouseP);	//определяем ближайшую вершину к нажатию
						if (dragged && dragged.node !== null){
							dragged.node.fixed = true;	//фиксируем её
						}
						$(canvas).bind('mousemove', handler.dragged);	//слушаем события перемещения мыши
						$(window).bind('mouseup', handler.dropped);		//и отпускания кнопки
						return false;
					},
					dragged:function(e){	//перетаскиваем вершину
						var pos = $(canvas).offset();
						var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);
	
						if (dragged && dragged.node !== null){
							var p = particleSystem.fromScreen(s);
							dragged.node.p = p;	//тянем вершину за нажатой мышью
						}
	
						return false;
					},
					dropped:function(e){	//отпустили
						if (dragged===null || dragged.node===undefined) return;	//если не перемещали, то уходим
						if (dragged.node !== null) dragged.node.fixed = false;	//если перемещали - отпускаем
						dragged = null; //очищаем
						$(canvas).unbind('mousemove', handler.dragged); //перестаём слушать события
						$(window).unbind('mouseup', handler.dropped);
						_mouseP = null;
						return false;
					}
				}
				// слушаем события нажатия мыши
				$(canvas).mousedown(handler.clicked);
			},
      
		}
		return that;
	}    

	$(document).ready(function(){
		sys = arbor.ParticleSystem(1000); // создаём систему
		sys.parameters({gravity:true}); // гравитация вкл
		sys.renderer = Renderer("#viewport") //начинаем рисовать в выбраной области

		var data = {
			nodes: [
				{name: 'Александр Кудрявцев'},
				{name: 'Варя Вилюжанина'},
				{name: 'Дарья Вейдер-Аваддон'},
				{name: 'Илья Кац'},
				{name: 'Сергей Серёгин'},
				{name: 'Настя Лаврикова'},
				{name: 'Денис Шеремет'},
				{name: 'Ева Маркс'},
				{name: 'Влад Лободов'},
				{name: 'Александр Кошкин'},
				{name: 'Никита Тирлыч'},
				{name: 'Анна Шеремет'},
				{name: 'Бет'},
				{name: 'Миша Mikhail'},
				{name: 'Илья Наговицин'},
				{name: 'Черных'},
				{name: 'Влад Бусов'},
				{name: 'Лоллич'},
				{name: 'Денис Лавриков'},
				{name: 'Александр Сапожников'},
				{name: 'Max /b/'},
				{name: 'Здос'},
				{name: 'Яна К'},
				{name: 'Князев'},
				{name: 'Варя Кот'},
				{name: 'Лидия'},
				{name: 'Chinatsu Bot'},
				{name: 'Дмитрий Соколов'},
				{name: 'Миша Леон'},
			],
			edges: [
				 {src: "Александр Кудрявцев", dest: "Влад Лободов"},
				 {src: "Варя Вилюжанина", dest: "Александр Кудрявцев"},
				 {src: 'Дарья Вейдер-Аваддон', dest: "Варя Вилюжанина"},
				 {src: 'Илья Кац', dest: "Влад Лободов"},
				 {src: 'Сергей Серёгин', dest: "Варя Вилюжанина"},
				 {src: 'Настя Лаврикова', dest: "Денис Лавриков"},
				 {src: 'Дмитрий Соколов', dest: "Денис Шеремет"},
				 {src: 'Денис Шеремет', dest: "Влад Лободов"},
				 {src: 'Ева Маркс', dest: "Влад Лободов"},
				 {src: 'Влад Лободов', dest: "Денис Шеремет"},
				 {src: 'Александр Кошкин', dest: "Влад Лободов"},
				 {src: 'Никита Тирлыч', dest: "Влад Лободов"},
				 {src: 'Анна Шеремет', dest: "Денис Шеремет"},
				 {src: 'Бет', dest: "Анна Шеремет"},
				 {src: 'Миша Mikhail', dest: "Дмитрий Соколов"},
				 {src: 'Илья Наговицин', dest: "Дарья Вейдер-Аваддон"},
				 {src: 'Черных', dest: "Влад Лободов"},
				 {src: 'Влад Бусов', dest: "Илья Кац"},
				 {src: 'Лоллич', dest: "Влад Лободов"},
				 {src: 'Денис Лавриков', dest: "Денис Шеремет"},
				 {src: 'Александр Сапожников', dest: "Дарья Вейдер-Аваддон"},
				 {src: 'Max /b/', dest: "Бет"},
				 {src: 'Здос', dest: "Лоллич"},
				 {src: 'Яна К', dest: "Анна Шеремет"},
				 {src: 'Князев', dest: "Илья Кац"},
				 {src: 'Варя Кот', dest: "Варя Вилюжанина"},
				 {src: 'Лидия', dest: "Дмитрий Соколов"},
				 {src: 'Chinatsu Bot', dest: "Илья Кац"}, 
				 {src: 'Миша Леон', dest: "Денис Шеремет"}, 
			]
		}
		$.each(data.nodes, function(i,node){
			sys.addNode(node.name);	//добавляем вершину
		});
		
		$.each(data.edges, function(i,edge){
			sys.addEdge(sys.getNode(edge.src),sys.getNode(edge.dest));	//добавляем грань
		});
    
	})

})(this.jQuery)
