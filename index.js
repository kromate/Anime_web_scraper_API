// THIS IS THE CURRENT VERSION OF THE ANIME WEB SCRAPER, THE SCRAPING IS DONE FROM GOGOANIME AND QUITE LIMITED, OPEN INDEX.JS TO FIND THE CURRENT VERSION
const express = require('express');
const quest = require('request');
const cheerio = require('cheerio');
const cors = require('cors');
let port = process.env.PORT || 3000

const app = express();
app.listen(port)

app.use(cors())

//ROUTES


//list by Letter for anime endpoint
// http://localhost:3000/letters/?name=p ================= Exp
app.get('/letters', (request, response) => {
  quest(`https://www1.gogoanime.ai/anime-list-${request.query.name}`, (error, _response, html) => {
  if (!error && _response.statusCode == 200) {
        const $ = cheerio.load(html);
        const searchArray = [];

        $('.anime_list_body ul li a').each((i,el) => {
          const title = $(el).text();
          const link = $(el).attr('href');
          searchArray.push({name:title, link:link})
        });
        response.set('Access-Control-Allow-Origin', '*');
        response.send(searchArray)
      }
    });
});

//list by genre for anime endpoint
// http://localhost:3000/gl/?link=/genre/ecchi ============= exp
app.get('/gl', (request, response) => {
  quest(`https://www1.gogoanime.ai/${request.query.link}`, (error, _response, html) => {
  if (!error && _response.statusCode == 200) {
        const $ = cheerio.load(html);
        const searchArray = [];

        $('ul.items li').each((i,el) => {
          const title = $(el).find('p.name a').text();
          const link = $(el).find('p.name a').attr('href');
          const img = $(el).find('.img img').attr('src');
          const release = $(el).find('p.released').text();
          searchArray.push({name:title, link:link, image:img , release:release})
        });
        response.set('Access-Control-Allow-Origin', '*');
        response.send(searchArray)
      }
    });
});

//Genre list for anime endpoint ========================================================== WIP
// http://localhost:3000/genres =====================
app.get('/genres', (request, response) => {
  console.log(request.query.page);
    quest(`https://www1.gogoanime.ai/`, (error, _response, html) => {
    if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const searchArray = [];

          $('nav.menu_top ul li ul li a').each((i,el) => {
            const title = $(el).text();
            const link = $(el).attr('href');
            searchArray.push({name:title, link:link })
          });
          response.set('Access-Control-Allow-Origin', '*');
          response.send(searchArray)
        }
      });
});

//Popular for anime endpoint ========================================================== WIP
// http://localhost:3000/popular/?page=2 =========== EX
app.get('/popular', (request, response) => {
  console.log(request.query.page);
    quest(`https://ajax.gogo-load.com/ajax/page-recent-release-ongoing.html?page=${request.query.page}`, (error, _response, html) => {
    if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const searchArray = [];

          $('.added_series_body > ul li').each((i,el) => {
            const title = $(el).find('a').toArray()[0].attribs.title;
            const link = $(el).find('a').attr('href');
            const genre = $(el).find('p.genres').text().split(':')[1];
            const img = $(el).find('.thumbnail-popular').css('background').split("'")[1]
            const Numlatest = $(el).find('a').text().trim().split(',').length
            const last_latest = $(el).find('a').text().trim().split(',')[Numlatest-1]
            const latest = $(el).find('a').text().trim().split(',')[Numlatest-1].substring(last_latest.length - 9)



            searchArray.push({name:title, link:link, image:img , latest:latest, genre:genre})
          });
          response.set('Access-Control-Allow-Origin', '*');
          response.send(searchArray)
        }
      });
});

//Recent for anime endpoint ================================================== WIP
// the link here is for direct download only not details
// http://localhost:3000/recent/?page=2 ============= EX

app.get('/recent', (request, response) => {
    quest(`https://ajax.gogo-load.com/ajax/page-recent-release.html?page=${request.query.page}`, (error, _response, html) => {
    if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const searchArray = [];

          $('ul.items li').each((i,el) => {
            const title = $(el).find('p.name a').text();
            const episode = $(el).find('p.episode').text();
            const link = $(el).find('p.name a').attr('href');
            const img = $(el).find('.img img').attr('src');
            searchArray.push({name:title, link:link, image:img, episode:episode })
          });
          response.set('Access-Control-Allow-Origin', '*');
          response.send(searchArray)
        }
      });
});


//search for anime endpoint
app.get('/search', (request, response) => {
    quest(`https://gogoanime.so//search.html?keyword=${request.query.name}`, (error, _response, html) => {
    if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const searchArray = [];

          $('ul.items li').each((i,el) => {
            const title = $(el).find('p.name a').text();
            const link = $(el).find('p.name a').attr('href');
            const img = $(el).find('.img img').attr('src');
            const release = $(el).find('p.released').text();
            searchArray.push({name:title, link:link, image:img , release:release})
          });
          response.set('Access-Control-Allow-Origin', '*');
          response.send(searchArray)
        }
      });
});

app.use(cors())
//GET Anime details
app.get('/desc', (request, response) => {
    quest(`https://gogoanime.so${request.query.link}`, (error, _response, html) => {
    if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const availableepisodes = [];
          const infoArray = [];
            const name= (request.query.link).split('/')[2]
            const id = $('input#movie_id').attr('value')
        // infoArray details
        // [0] = type
        // [1] = summary
        // [2] = genre
        // [3] = release
        // [4] = status
        // [5] = other name

          $('.anime_info_body p.type').each((i,el) => {
            const det = $(el).text().split(':')[1]
            infoArray.push({i:det})
          })

          $('ul#episode_page li').each((i,el) => {
            const start = $(el).text().split('-')[0]
            const end = $(el).text().split('-')[1]
            availableepisodes.push({start:start, end:end})
          })

         let searchArray=   {
             id:id,
            name:name,
            type:infoArray[0].i,
                summary:infoArray[1].i,
                genre:infoArray[2].i,
                release:infoArray[3].i,
                status:infoArray[4].i,
                otherNames:infoArray[5].i,
                 episodes:availableepisodes}

                 response.set('Access-Control-Allow-Origin', '*');
          response.send(searchArray)
        }
      });
});

app.use(cors())
//get Episode for anime endpoint
app.get('/episodes', (request, response) => {
    // get the episodes in the anime by parsing all links that are videos
    quest(`https://ajax.gogocdn.net/ajax/load-list-episode?ep_start=${request.query.start}&ep_end=${request.query.end}&id=${request.query.id}&default_ep=0&alias=${request.query.name}`, (error, _response, html) => {
        if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const episodeArr = [];
          $('a').each((i,el) => {
                const title = $(el).text()
                const link = $(el).attr('href');
                episodeArr.push({name:title, link:link})

          });
          response.set('Access-Control-Allow-Origin', '*');
          response.send(episodeArr)
        }
      });
});

app.use(cors())
//get Description for an for anime endpoint
app.get('/downloadLink', (request, response) => {

    quest(`https://gogoanime.so/${request.query.link}`, (error, _response, html) => {
    if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const Dlink = $('li.dowloads > a').attr('href');
          DownloadLink(Dlink).then((data)=>{
            response.set('Access-Control-Allow-Origin', '*');
            response.send(data)
        }).catch(console.error);

        }
      });
});


function DownloadLink (link) {
    return new Promise((resolve, reject) => {
        try {

            quest(link, (error, _response, html) => {
                if (!error && _response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const DlinkTypes =[]
                    $('.dowload>a').each((i,el) => {
                        if(i < 12){
                            const title = $(el).text()
                            const link = $(el).attr('href');
                            DlinkTypes.push({name:title, link:link})
                        }

                    })

                    return resolve(DlinkTypes);
                }
            })
        } catch (e) {
            return reject(e);
        }
    })
}



setInterval(function() {
  quest("https://anime-web-scraper.herokuapp.com/popular/?page=1");
}, 300000); // every 5 minutes (300000)