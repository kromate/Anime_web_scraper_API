const express = require('express');
const quest = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let port = process.env.PORT || 3000

const app = express();

//ROUTES

//search for anime endpoint
app.get('/search', (request, response) => {
    console.log(request.query.name);

    quest(`https://www.animeout.xyz/?s=${request.query.name}`, (error, _response, html) => {
    if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const searchArray = [];
          const imageArray = [];


    $('img.attachment-kleo-post-grid.size-kleo-post-grid.wp-post-image').each((i,el)=>{
        const img = $(el).attr('src');
        imageArray.push(img)

    })

        
          $('h3 > a').each((i,el) => {
            const title = $(el).text()
            const link = $(el).attr('href');
            const img = $(el).find('img')
            searchArray.push({name:title, link:link, image:imageArray[i]})
          });
          response.send(searchArray) 
        }
      });
});

//search for anime endpoint
app.get('/episode', (request, response) => {
    // get the episodes in the anime by parsing all links that are videos
    console.log(request.query.link);

    quest(request.query.link, (error, _response, html) => {
    if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const episodeArr = [];
          $('a').each((i,el) => {
              if($(el).attr('href').includes('.mkv' || '.mp4')>-1){
                const title = $(el).text()
                const link = $(el).attr('href');
                episodeArr.push({name:title, link:link})
              }
         
          });
          response.send(episodeArr) 
        }
      });
});



app.listen(port)
