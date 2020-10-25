
window.addEventListener('beforeunload', (e) => {
    window.scrollTo(0,0);
  });

var scroll_y = 0.5;
var line_width = 2;
var W;
var H;

const enable_interaction = true;
var scrolling = false;
var hold = false;

var t_purerate = .1;
var t = 0;
var fps = 25;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
    var c = canvas;
    var x = ctx;
}

function DwitterCode(t,z,h) {
    w=z
    g=Math.min(T(t/2),100)
    m=0|(9+50*w)
    s=W/m
    n=(H/s|0)+1
    for(k=m*n;a=[u=k%m*s,v=(k/m|0)*s,s,s],l=v-H/2-(u-W/2)*g+2*s,k--;)s<l&&l<h*s?x.fillRect(...a):x.strokeRect(...a)
}


startAnimating(fps);


function draw() {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(0,0,0, 1)';


    DwitterCode(t, scroll_y, line_width);


    t += t_purerate;
    
    if (hold) {
        line_width += .5;
        line_width = Math.min(2+6*scroll_y, line_width);
        t_purerate += .005;
        t_purerate = Math.min(1, t_purerate);
    }
    
    if(!hold && line_width > 2) {
        line_width -= .1;
        line_width = Math.max(2, line_width);
        t_purerate -= .03;
        t_purerate = Math.max(.1, t_purerate);
    }
       
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
}
 
function animate(newtime) {

    requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();         
    }

    if(enable_interaction) {

        window.addEventListener('scroll', function(e) {
        scroll_pos = window.scrollY;
        
        if (!scrolling) {
            window.requestAnimationFrame(function() {
            scroll_interaction(scroll_pos);
            scrolling = false;
            });
        
            scrolling = true;
        }
        });

        canvas.addEventListener('mousedown', e => {
            hold = true;
        });
        
        canvas.addEventListener('mouseup', e => {
            hold = false;
        });
    
        canvas.addEventListener('touchstart', function(e) {
            hold = true;
        }, false);
        
        canvas.addEventListener('touchend', function(e) {
            hold = false;
        }, false);   
    }

}
 

function scroll_interaction(scroll_pos) {
    y_scroll = scroll_pos/(5000 - H);
    scroll_y = y_scroll;
}