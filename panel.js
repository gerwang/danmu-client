/// <reference path="typings/node/node.d.ts"/>
(function () {

	var windows = require('remote').getGlobal('windows');
	var coordinator = require('remote').getGlobal('coordinator');
	var controlButtons = window.document.querySelectorAll(".btn-control");
	var countQuitValue = 0;
	var isShow = true;
	var controlButtonClick = function () {
		coordinator.emit(this.getAttribute("data-top"), this.getAttribute("data-param"));
	};

	coordinator.on("fps", function (fps) {
		if (!isShow) return;
		document.getElementById("txt-fps").innerText = fps;
	});

	window.addEventListener("keydown", function (e) {
		if (e.keyCode == 123) { // F12
			windows.panelWindow.openDevTools({
				detach: true
			});
		}
	}, true);
	window.addEventListener('beforeunload', function (e) {
		e.returnValue = 'false';
		windows.panelWindow.hide();
		isShow = false;
	});

	document.querySelector("#btn-quit").addEventListener("click", function () {
		if (countQuitValue == 1) {
			coordinator.emit("exit");
		} else {
			setTimeout(function () {
				document.querySelector("#btn-quit").innerText = "退出程序";
				countQuitValue = 0;
			}, 5000);
			this.innerText = "5秒内再按一次退出";
			countQuitValue = 1;
		}
		return false;
	});
	for (var i = 0; i < controlButtons.length; i++) {
		controlButtons.item(i).addEventListener("click", controlButtonClick);
	}

	windows.panelWindow.on("fps", function (fps) {
		document.getElementById("txt-fps").innerText = fps;
	});
})();
