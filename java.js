var opts = {
        count: 3, //Increases the spawn rate
        size: 50, //Minimal is one
        sizeRandom: 10, //Amount of pixels it can be randomed by
        sparkLife: 0.1, //Decreases the sparks life
        spawnOpacity: 1, //Sparks will spawn at this opacity
        hueRotationSpeed: 7, //Decreases the hue rotatio speed
        color: "hsl(hue, 100%, 50%)" //The color of sparks.
    },
    canvasBody = document.getElementById("canvas"),
    canvas = canvasBody.getContext("2d"),
    w = canvasBody.width = window.innerWidth,
    h = canvasBody.height = window.innerHeight,
    tick = 0,
    currentHue = 0,
 	linkText = "2x2.html",
	links = {
		first: link(100, 50, 50, 20, "2x2", "2x2.html"),
		second: link(170, 50, 50, 20, "3x3", "3x3.html"),
		third: link(240, 50, 50, 20, "sth", "sth.html")
	};

function anim() {
    setTimeout(function () {
        window.requestAnimationFrame(anim)
    }, 1000 / 30) //Setting the FPS by dividing the one second by <frames>
    step();

    ++tick;
    if (isNaturalNumber(tick / opts.hueRotationSpeed)) {
        currentHue++;
        console.log("change");
    }
    if (currentHue == 356) {
        currentHue = 0;
    }
}

anim(); //Calling the animation function

function step() {
    canvas.fillStyle = opts.color.replace("hue", currentHue);
    for (var i = 0; i < Math.round(opts.count); i++) {
        var random = Math.random() * opts.sizeRandom;
        canvas.fillRect(
        	-(opts.size / 2) + Math.random() * w, -
			(opts.size / 2) + Math.random() * h,
			opts.size + random,
			opts.size + random
		)
    }
    drawTxt();
}
function drawTxt() {
	canvas.fillStyle = "rgba(255,255,255," + opts.sparkLife + ")";
	canvas.fillRect(0, 0, w, h);
	canvas.font = "70px Arial";
	canvas.fillStyle = "black";
	canvas.textAlign = "center";
	canvas.fillText("KUBERSPACE", w / 2, h / 2);

	canvas.font = "30px Arial";
	canvas.textAlign = "start";
	canvas.fillText(links.first.txt, links.first.x, links.first.y);
	canvas.fillText(links.second.txt, links.second.x, links.second.y);
	canvas.fillText(links.third.txt, links.third.x, links.third.y);
}

function link(x, y, w, h, txt, url) {
	return {
		x: x,
		y: y,
		w: w,
		h: h,
		txt: txt,
		url: url
	};
}

canvasBody.addEventListener('click', checkStart);
canvasBody.addEventListener('mousemove', function(e) {
	console.log('move');
	var p = getMousePos(e),
		rect = findLinkByMousePosition(p);
	if (rect) {
		document.body.style.cursor = "pointer";
	} else {
		document.body.style.cursor = "";
	}
});

function checkStart(e) {
	var p = getMousePos(e),
	rect = findLinkByMousePosition(p);
	if (rect) {
		window.location.href = rect.url;
	}

	console.log(p);
}

function findLinkByMousePosition(p) {
	var linksToArr = Object.values(links);
	for (var i in linksToArr) {
		var rect = linksToArr[i];
		if (p.x >= rect.x && p.x <= rect.x + rect.w &&
			p.y <= rect.y && p.y >= rect.y - rect.h) {
			return rect;
		}
	}
	return false;
}

function getMousePos(e) {
	var r = canvasBody.getBoundingClientRect();
	return {
		x: e.clientX - r.left,
		y: e.clientY - r.top
	};
}

window.addEventListener("resize", function () { //Just in case someone resizes the window
    w = canvasBody.width = window.innerWidth;
    h = canvasBody.height = window.innerHeight;
});

function isNaturalNumber(n) {
    n = n.toString(); // force the value incase it is not
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}