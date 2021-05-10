## GetAnime_API

This API scrapes the web for anime and returns a variety of results depending on the endpoint called.
API URL = https://anime-web-scraper.herokuapp.com

### EndPoints

/search with query parameter 'name':
  
  This call returns a JSON object in the format {name: ##, link: ##, image: ##, release: ##}
  
  Example: https://anime-web-scraper.herokuapp.com/search?name=world-trigger
  
  One of the results returned by the query
  
  ````JSON
  {
    "name": "World Trigger",
    "link": "/category/world-trigger",
    "image": "https://gogocdn.net/images/upload/161762.jpg",
    "release": "\n                                                                                    Released: 2014                                                                            "
  }
  ````

/desc with query parameter 'link':
  
  This call returns a JSON object in the format {id: ##, name: ##, type: ##, summary: ##, genre: ##, release: ##, status: ##, otherNames: ##, episodes: [{start: ##, end: ##}]}
  
  Example: https://anime-web-scraper.herokuapp.com/desc?link=/category/world-trigger-dub
  
  Result
  
  ````JSON
  {
  "id": "8933",
  "name": "world-trigger-dub",
  "type": " \n\t\t\t\t    Fall 2014 Anime\n\t\t\t\t",
  "summary": " When a gate to another world suddenly opens on Earth, Mikado City is invaded by strange creatures known as \"Neighbors,\" malicious beings impervious to traditional weaponry. In response to their arrival, an organization called the Border Defense Agency has been established to combat the Neighbor menace through special weapons called \"Triggers.\" Even though several years have passed after the gate first opened, Neighbors are still a threat and members of Border remain on guard to ensure the safety of the planet.\n\nDespite this delicate situation, members-in-training, such as Osamu Mikumo, are not permitted to use their Triggers outside of headquarters. But when the mysterious new student in his class is dragged into a forbidden area by bullies, they are attacked by Neighbors, and Osamu has no choice but to do what he believes is right. Much to his surprise, however, the transfer student Yuuma Kuga makes short work of the aliens, revealing that he is a humanoid Neighbor in disguise.\nNoted",
  "genre": " \n\t\t\t         Action, School, Sci-Fi, Shounen, Supernatural\t\t\t\t",
  "release": " 2014",
  "status": " \n                                      Completed\n                                  ",
  "otherNames": " ワールドトリガー",
  "episodes": [
    {
      "start": "\n                                0",
      "end": "73\n                            "
    }
  ]
}
  ````

/episodes with query parameter 'start'. 'end', 'id', 'name':

This call returns a JSON object in the format {name: ##, link: ##}

Example: https://anime-web-scraper.herokuapp.com/episodes?start=1&end=2&id=8933&name=world-trigger-dub

Result
````JSON
[
  {
    "name": "\n\t\t\t\tEP 2\n                \n                DUB\n              ",
    "link": " /world-trigger-dub-episode-2"
  },
  {
    "name": "\n\t\t\t\tEP 1\n                \n                DUB\n              ",
    "link": " /world-trigger-dub-episode-1"
  }
]
````

/downloadLink with query parameter 'link': 

This call returns a JSON object in the format {name: ##, link: ##}

Example: https://anime-web-scraper.herokuapp.com/downloadLink?link=/world-trigger-dub-episode-2

Result

````JSON
{
    "name": "Download\n            (HDP - mp4)",
    "link": "https://storage.googleapis.com/river-data-311609/WF6EZJFJ9B/22a_1620636671_136382.mp4"
  }
````
