var c = document.getElementById("canv");
c.width = window.innerWidth;
c.height = window.innerHeight;
$ = c.getContext("2d");
var num = 80;
var arr = [];
var u = 0;

var rnd = function(min, max) {
  return Math.random() * (max - min) + min;
}

var create = function() {
  for (var i = 0; i < num; i++) {
    var p = {
      sz: rnd(5, 20),
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 4 - 2,
      ang: Math.random() * (Math.PI * 2)
    }
    arr.push(p);
  }
}

window.addEventListener('resize', function() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}, false);

var update = function() {
  $.fillStyle = 'hsla(0,0%,2%,1)';
  $.fillRect(0, 0, c.width, c.height);

  for (var i = 0; i < num; i++) {
    var p = arr[i];
    p.x += p.vx;
    p.y += p.vy;
    p.ang += 0.1;

    if (p.x > c.width - p.sz || p.x < p.sz) {
      p.vx *= -1;
    } else if (p.y > c.height - p.sz || p.y < p.sz) {
      p.vy *= -1;
    }
    u -= .5;
    $.shadowBlur = 2;
    $.shadowColor = 'hsla(' + u / i + 2 + ',95%,50%,.6)';
    $.beginPath();
    $.fillStyle = 'hsla(' + u / i + 5 + i + ',95%,50%,1)';
    $.arc(p.x, p.y, p.sz + 1 * (Math.sin(p.ang) + 1), 0, Math.PI * 2, false);
    $.fill();
    $.beginPath();
    $.fillStyle = 'hsla(0,0%,0%,1)';
    $.arc(p.x, p.y, p.sz * (Math.sin(p.ang) + 1), 0, Math.PI * 2, false);
    $.fill();

  }
  var t1 = "alla".split("").join(String.fromCharCode(0x2004));
  $.font = "5em Poiret One";
  $.fillStyle = 'hsla(' + u / i + ',95%,50%,.5)';
  $.fillText(t1, p.x - $.measureText(t1).width / 2, c.height / 2);
  var t2 = "доброе утро".split("").join(String.fromCharCode(0x2004));
  $.font = "3em Poiret One";
  $.fillStyle = 'hsla(' + u / i + ',95%,50%,.5)';
  $.fillText(t2, p.x - $.measureText(t2).width / 2, c.height / 1.5);
}
window.requestAnimFrame = (function() {
return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();
function run() {
  window.requestAnimFrame(run);
  update();

}
create();
run();