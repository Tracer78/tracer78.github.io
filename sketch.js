// 2024-09-13

// Pre-populated date
let PRE_PERIOD_COLOR;
let PERIOD_DAY_COLOR;
let POST_PERIOD_COLOR;
let NORMAL_DAY_COLOR;
const MCs = [
  new Date(2024, 8, 16),
  new Date(2024, 9, 16),
  new Date(2024,10, 15),
];
let g_img_preperiod;
let g_img_periodday;
let g_img_postperiod;
let g_img_normalday;

function preload() {
  g_img_preperiod = loadImage('https://i.imgur.com/292WSS3.jpeg');
  g_img_periodday = loadImage('https://i.imgur.com/pmsH5QW.jpeg');
  g_img_postperiod = loadImage('https://i.imgur.com/Ykd2l9l.jpeg');
  g_img_normalday = loadImage('https://i.imgur.com/5wdbXKj.jpeg');
}

function setup() {
  PRE_PERIOD_COLOR = color(203,24,29);
  POST_PERIOD_COLOR = color(106,81,163);
  PERIOD_DAY_COLOR = color(253,224,221);
  NORMAL_DAY_COLOR = color(198,219,239);
  createCanvas(400, 720);
  frameRate(30);
}

function GetDayType(d) {
  for (let i=0; i<MCs.length; i++) {
    let mc = MCs[i];
    const dd = Math.floor((d - mc) / 86400000);
    if (dd >= -7 && dd < 0) {
      return ["Pre-period", PRE_PERIOD_COLOR,
             "Take a breather,\nno big moves yet.",
             g_img_preperiod];
    } else if (dd == 0) {
      return ["Period day", PERIOD_DAY_COLOR,
             "Chill out, sip something warm,\nskip the heavy stuff.",
             g_img_periodday];
    } else if (dd > 0 && dd <= 7) {
      return ["Post-period", POST_PERIOD_COLOR,
             "Stay cool, eat good, and\ncatch those zzz's.",
             g_img_postperiod];
    }
  }
  return ["Normal day", NORMAL_DAY_COLOR,
          "You got this, run, kick & crush it!",
         g_img_normalday];
}

function Screen1() {
  push();
  noStroke();
  fill(32);
  translate(72, 96);
  textAlign(LEFT, TOP);
  const FONT_SIZE = 20;
  const X = FONT_SIZE * 1.8;
  const Y = FONT_SIZE + 4;
  textSize(FONT_SIZE);
  fill(160);
  for (let i=0; i<7; i++) {
    text("SMTWTFS".substr(i, 1), (i)*X, 0);
  }
  let dy = 0;
  
  fill(32);
  textSize(FONT_SIZE-4);
  DAYS = {
    "8": 30,
    "9": 31,
    "10":30,
  };
  for (let m=8; m<=10; m++) {
    for (let i=1; i<=DAYS[m]; i++) {
      if (i == 1) {
        push();
        fill(128);
        textAlign(RIGHT, TOP);
        text(m+1, -5, dy*Y+Y+2);
        pop();
      }
      const d = new Date(2024, m, i);
      let dist = undefined;  // Days
      MCs.forEach((mc) => {
        const dd = (d - mc) / 86400000;
        if (abs(dd) <= 7) {
          if (dist == undefined || dd < dist) { dist = dd; }
        }
      });
      const day = d.getDay();
      push();
      let col;
      if (dist != undefined) {
        const col1 = PRE_PERIOD_COLOR;
        const col2 = POST_PERIOD_COLOR;
        col = lerpColor(col1, col2, (dist+7)/15.0);
        if (dist < 0) {
          col = col1;
        } else if (dist > 0) {
          col = col2;
        } else if (dist == 0) col = PERIOD_DAY_COLOR;
      } else {
        col = NORMAL_DAY_COLOR;
      }
      fill(col);
      if (d.getDate() == g_date.getDate() && d.getMonth() == g_date.getMonth()) {
        strokeWeight(3);
        stroke(252, 14, 200);
      } else { noStroke(); }
      rect(day*X-1, dy*Y+Y-1, X-2, Y-2);

      pop();
      textAlign(LEFT, TOP);
      text(i+"", (day)*X, dy*Y+Y+2);
      if (day == 6) { dy++; }
    }
    //dy++;
  }
  pop();
  
  textSize(40);
  textAlign(CENTER, TOP);
  text((g_date.getMonth()+1) + "/" + g_date.getDate(), width/2, 40);
}

function Screen2() {
  push();
  const d = g_date;
  textSize(40);
  textAlign(CENTER, TOP);
  fill(128);
  text("Today is " + (d.getMonth()+1) + "/" + d.getDate(), width/2, 80);
  let x = GetDayType(d);
  fill(x[1]);
  stroke(128);
  text(x[0], width/2, 80+50);
  noStroke();
  fill(128);
  textSize(24);
  text(x[2], width/2, 80+50*2);
  const SCALE = 0.7;
  image(x[3], width/2-x[3].width*SCALE/2, 80+50*4, x[3].width * SCALE, x[3].height * SCALE);
  pop();
}

let g_screen_id = 2
let g_date = new Date();

function draw() {
  background(235);
  
  if (g_screen_id == 1) {
    Screen1();
  } else if (g_screen_id == 2) {
    Screen2();
  }
  
  push();
  noStroke();
  textSize(20);
  textAlign(CENTER, BOTTOM);
  
  if (g_screen_id == 1) { fill(32, 32, 192); }
  else fill(32);
  text("Screen 1", width*0.25, height-8);
  
  if (g_screen_id == 2) { fill(32, 32, 192); }
  else fill(32);
  text("Screen 2", width*0.75, height-8);
  
  pop();
}

function keyPressed() {
  if (key === '1') {
    g_screen_id = 1;
  } else if (key === '2') {
    g_screen_id = 2;
  } else if (keyCode == UP_ARROW) {
    g_date.setDate(g_date.getDate()+1);
  } else if (keyCode == DOWN_ARROW) {
    g_date.setDate(g_date.getDate()-1);
  }
}

function mousePressed() {
  
}