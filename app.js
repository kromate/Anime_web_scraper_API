const express = require('express');
const quest = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
let port = process.env.PORT || 3000

const app = express();

//ROUTES

//search
app.get('/search', (request, response) => {
    console.log(request.query.name);
    quest(`https://b-ok.africa/s/${request.query.name}`, (error, _response, html) => {
        if (!error && _response.statusCode == 200) {
          const $ = cheerio.load(html);
          const bookArray = [];
          $('h3 > a').each((i,el) => {
            const title = $(el).text()
            const link = $(el).attr('href');
         bookArray.push({name:title, link:link})
          });
          response.send(bookArray) 
        }
      });
});

// Details
app.get('/details', (request, response) => {
    console.log(request.query.link);
    getdetails(request.query.link).then((data)=>{
        response.send(data) 
    }).catch(console.error);
});

// Download
app.get('/download', (request, response) => {
    console.log(request.query.link);
    DownloadBook(request.query.link).then((data)=>{
        console.log(data);
        response.redirect(data) 
    }).catch(console.error);
});

app.listen(port)

//FUNCTIONS
function getdetails (link) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                args: [
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                ],
              });
            const page = await browser.newPage();
            await page.goto(`https://b-ok.africa${link}`, {waitUntil: 'networkidle2'});
            await page.waitForSelector('.details-book-cover > img',{visible: true})
            let urls = await page.evaluate(() => {
                let results = [];
                if(document.querySelector('#bookDescriptionBox')){
                    let text = document.querySelector('#bookDescriptionBox').innerText;
                    let img = document.querySelector('.details-book-cover > img').getAttribute('src')
                    let size = document.querySelector('a.btn.btn-primary.dlButton.addDownloadedBook').innerText;
                    results.push({description:text, image:img, size:size})
                }else{
                    let img = document.querySelector('.details-book-cover > img').getAttribute('src')
                    let size = document.querySelector('a.btn.btn-primary.dlButton.addDownloadedBook').innerText;
                    results.push({image:img, size:size})
                }
                
               
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}

function DownloadBook (link) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                args: [
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                ],
              });
            const page = await browser.newPage();
            await page.goto(`https://b-ok.africa${link}`, {waitUntil: 'networkidle2'});
            console.log('Clicking on "Download PDF" button');
            await page.on('response', response => {
                console.log(response.url());
                if (response.url().indexOf('dtoken') > -1){
                    console.log("response code: ", response.status(), response.url());
                    urls = response.url()
                    return resolve(urls);
                }
                  
              });
             
            await page.click('a.btn.btn-primary.dlButton.addDownloadedBook')
            await page.waitForNavigation({waitUntil: 'networkidle2'})
            browser.close();
            
            
        } catch (e) {
            return reject(e);
        }
    })
}