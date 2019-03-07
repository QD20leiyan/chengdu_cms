
var map = function (opts) {
	this.id = opts.id;
	this.data = opts.data;
	this.obj;
	this.init();
}
map.prototype = {
	init : function(){
		var box = document.getElementById(this.id);
		var p1 = [[50,31.7],[100,31.7],[125,75],[100,118.3],[50,118.3],[25,75]];
		var p2 = [[58.5,46.5],[91.5,46.5],[108,75],[91.5,103.5],[58.5,103.5],[42,75]];
		var p3 = [[66.75,60.75],[83.25,60.75],[91.5,75],[83.25,89.25],[66.75,89.25],[58.5,75]];
		var data = this.data;
		var w1 = 1,w2 = 2,w3 = 3;
		var c = '#747982';
		var c1 = '#ffc33a';
		this.obj = box.getContext('2d');
		this.clear();
		this.drawCir(w3,c,p1);
		this.drawCir(w2,c,p2);
		this.drawCir(w1,c,p3);
		this.draw(w3,c1,data.path);
		this.drawLine();
		this.text();
	},
	clear : function(){
		var obj = this.obj;
		obj.clearRect(0,0,150,150);
	},
	drawCir : function(w,c,p){
		var obj = this.obj;
		obj.beginPath();
		obj.lineWidth = w;
		obj.strokeStyle = c;
		obj.moveTo(p[0][0],p[0][1]);
		for (var i =1;i < p.length;i++) {
			obj.lineTo(p[i][0],p[i][1])
		}
		obj.closePath();
		obj.stroke();
	},
	drawLine : function(){
		var obj = this.obj;
		obj.beginPath();
		obj.lineWidth = 1;
		obj.strokeStyle = '#4f555f';
		obj.moveTo(50,31.7);
		obj.lineTo(100,118.3);
		obj.moveTo(100,31.7);
		obj.lineTo(50,118.3);
		obj.moveTo(50,75);
		obj.lineTo(125,75);
		obj.closePath();
		obj.stroke();
	},
	draw : function(w,c,ps){
		var obj = this.obj;
		var p = this.toPath(ps);
		obj.beginPath();
		obj.lineWidth = w;
		obj.strokeStyle = c;
		obj.lineJoin = 'round';
		obj.moveTo(p[0][0],p[0][1]);
		for (var i =1;i < p.length;i++) {
			obj.lineTo(p[i][0],p[i][1])
		}
		obj.closePath();
		obj.stroke();

		obj.globalAlpha = 0.2;
		obj.fillStyle = '#a89465';
		obj.fill();
	},
	toPath : function(p){
		var path = [];

		for (var i = 0;i < p.length;i++) {
			var a = [];
			var b,c;
			switch (i) {
				case 0 :
					b = 75 - p[0]*Math.sin(Math.PI/6)*10;
					c = 75 - p[0]*Math.sin(Math.PI/3)*10;
					break;
				case 1 :
					b = 75 + p[1]*Math.sin(Math.PI/6)*10;
					c = 75 - p[1]*Math.sin(Math.PI/3)*10;
					break;
				case 2 :
					b = 75 + p[2]*10;
					c = 75;
					break;
				case 3 :
					b = 75 + p[3]*Math.sin(Math.PI/6)*10;
					c = 75 + p[3]*Math.sin(Math.PI/3)*10;
					break;
				case 4 :
					b = 75 - p[4]*Math.sin(Math.PI/6)*10;
					c = 75 + p[4]*Math.sin(Math.PI/3)*10;
					break;
				case 5 :
					b = 75 - p[5]*10;
					c = 75;
					break;
			}
			a.push(b);
			a.push(c);
			path.push(a);
		}
		return path;
	},
	text : function(){
		var obj = this.obj;
		var data = this.data;
		obj.beginPath();
		obj.font = '12px 微软雅黑';
		obj.fillStyle = '#fff';
		obj.globalAlpha = 1;
		obj.fillText(data.name[0],25,25);
		obj.fillText(data.name[1],100,25);
		obj.fillText(data.name[2],126,78);
		obj.fillText(data.name[3],90,135);
		obj.fillText(data.name[4],38,135);
		obj.fillText(data.name[5],0,78);
		obj.closePath();
	}
}

var num = 200;
var w = window.innerWidth;
var h = window.innerHeight;
var max = 100;
var _x = 0;
var _y = 0;
var _z = 150;
var dtr = function(d) {
  return d * Math.PI / 180;
};

var rnd = function() {
  return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
};
var dist = function(p1, p2, p3) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
};

var cam = {
  obj: {
    x: _x,
    y: _y,
    z: _z
  },
  dest: {
    x: 0,
    y: 0,
    z: 1
  },
  dist: {
    x: 0,
    y: 0,
    z: 200
  },
  ang: {
    cplane: 0,
    splane: 0,
    ctheta: 0,
    stheta: 0
  },
  zoom: 1,
  disp: {
    x: w / 2,
    y: h / 2,
    z: 0
  },
  upd: function() {
    cam.dist.x = cam.dest.x - cam.obj.x;
    cam.dist.y = cam.dest.y - cam.obj.y;
    cam.dist.z = cam.dest.z - cam.obj.z;
    cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
    cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
    cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
    cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
  }
};

var trans = {
  parts: {
    sz: function(p, sz) {
      return {
        x: p.x * sz.x,
        y: p.y * sz.y,
        z: p.z * sz.z
      };
    },
    rot: {
      x: function(p, rot) {
        return {
          x: p.x,
          y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
          z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
        };
      },
      y: function(p, rot) {
        return {
          x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
          y: p.y,
          z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
        };
      },
      z: function(p, rot) {
        return {
          x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
          y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
          z: p.z
        };
      }
    },
    pos: function(p, pos) {
      return {
        x: p.x + pos.x,
        y: p.y + pos.y,
        z: p.z + pos.z
      };
    }
  },
  pov: {
    plane: function(p) {
      return {
        x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
        y: p.y,
        z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
      };
    },
    theta: function(p) {
      return {
        x: p.x,
        y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
        z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
      };
    },
    set: function(p) {
      return {
        x: p.x - cam.obj.x,
        y: p.y - cam.obj.y,
        z: p.z - cam.obj.z
      };
    }
  },
  persp: function(p) {
    return {
      x: p.x * cam.dist.z / p.z * cam.zoom,
      y: p.y * cam.dist.z / p.z * cam.zoom,
      z: p.z * cam.zoom,
      p: cam.dist.z / p.z
    };
  },
  disp: function(p, disp) {
    return {
      x: p.x + disp.x,
      y: -p.y + disp.y,
      z: p.z + disp.z,
      p: p.p
    };
  },
  steps: function(_obj_, sz, rot, pos, disp) {
    var _args = trans.parts.sz(_obj_, sz);
    _args = trans.parts.rot.x(_args, rot);
    _args = trans.parts.rot.y(_args, rot);
    _args = trans.parts.rot.z(_args, rot);
    _args = trans.parts.pos(_args, pos);
    _args = trans.pov.plane(_args);
    _args = trans.pov.theta(_args);
    _args = trans.pov.set(_args);
    _args = trans.persp(_args);
    _args = trans.disp(_args, disp);
    return _args;
  }
};

//leave
const NUMBER_OF_LEAVES = 30;
function init()
{
    var container = document.getElementById('leafContainer');
    /* Fill the empty container with new leaves */
    for (var i = 0; i < NUMBER_OF_LEAVES; i++)
    {
        container.appendChild(createALeaf());
    }
}
function randomInteger(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}
function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}
function pixelValue(value)
{
    return value + 'px';
}
function durationValue(value)
{
    return value + 's';
}
function createALeaf()
{
    /* Start by creating a wrapper div, and an empty img element */
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');
    /* Randomly choose a leaf image and assign it to the newly created element */
    image.src = 'http://dev.static.yingxiong.com/zhs/1.0/images/realLeaf' + randomInteger(1, 5) + '.png';
    leafDiv.style.top = "-100px";
    /* Position the leaf at a random location along the screen */
    leafDiv.style.left = pixelValue(randomInteger(0, 1800));

    /* Randomly choose a spin animation */
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';

    /* Set the -webkit-animation-name property with these values */
    leafDiv.style.webkitAnimationName = 'fade_leavf, drop';
    image.style.webkitAnimationName = spinAnimationName;

    /* Figure out a random duration for the fade and drop animations */
    var fadeAndDropDuration = durationValue(randomFloat(5, 11));

    /* Figure out another random duration for the spin animation */
    var spinDuration = durationValue(randomFloat(4, 8));
    /* Set the -webkit-animation-duration property with these values */
    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var leafDelay = durationValue(randomFloat(0, 5));
    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

    image.style.webkitAnimationDuration = spinDuration;

    // add the <img> to the <div>
    leafDiv.appendChild(image);

    /* Return this img element so it can be added to the document */
    return leafDiv;
}


/* Calls the init function when the "Falling Leaves" page is full loaded */
window.addEventListener('load', init, false);
