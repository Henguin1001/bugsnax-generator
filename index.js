const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const HTML = true;
const WIDTH = 1536;
const HEIGHT = 862;
const cell_width = 135;
const even_offset = 60;
const image_path = './img/';
const output_path = './output/';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const main = async function(){
  model = [];
  nunjucks.configure({ autoescape: true });
  // find all the image paths in the folder
  images = fs.readdirSync(image_path).map(filename=>`../img/${filename}`);
  for (var x = 0; x < WIDTH; x+=cell_width) {
    for (var y = 0; y < HEIGHT; y+=cell_width) {
      image_index = getRandomInt(0,images.length-1);
      model.push({
        x:x + (y%2)*even_offset,
        y:y,
        href:images[image_index],
        width:cell_width
      });
    }
  }
  // render the svg template
  var output = nunjucks.render('template.njs', { width:WIDTH, height:HEIGHT, grid:model, html:HTML });
  // if the we are exporting html output to an html file otherwise svg
  var output_path;
  if(HTML){
    output_path = './output/output.html';
  } else {
    output_path = './output/output.svg';
  }
  // save the data to the file
  fs.writeFileSync(output_path, output);

  // create a browser instance to take a screenshot of the svg
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT })
  await page.goto(`file:${path.join(__dirname, output_path)}`);
  await page.screenshot({path: './output/output.png'});

  await browser.close();
}

main()
  .then(()=>console.log("Success"))
  .catch(error=>console.error(error));
