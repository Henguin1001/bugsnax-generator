const nunjucks = require('nunjucks');
const fs = require('fs');
const sharp = require('sharp')
var svg2img = require('svg2img');
var btoa = require('btoa');

nunjucks.configure({ autoescape: true });
const HTML = false
const WIDTH = 1536;
const HEIGHT = 862;
const cell_width = 135;
const even_offset = 60;


model = [];
var paths = fs.readdirSync('./img/').map(file => {
  return `./img/${file}`;
});

for (var x = 0; x < WIDTH; x+=cell_width) {
  for (var y = 0; y < HEIGHT; y+=cell_width) {
    image_index = getRandomInt(0,paths.length-1);
    console.log(image_index);
    model.push({
      x:x + (y%2)*even_offset,
      y:y,
      href:paths[image_index],
      width:cell_width
    });
  }
}

var output = nunjucks.render('template.njs', { width:1536, height:862, grid:model, html:HTML });
if(HTML){
  fs.writeFileSync('./output/output.html', output);
} else {

  fs.writeFileSync('./output/output.svg', output);

  //1. convert from svg string
  svg2img(output, function(error, buffer) {
      //returns a Buffer
      fs.writeFileSync('./output/output.png', buffer);
  });



}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
