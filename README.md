# GetAnime_API 🍕🤗

This API scrapes the web for anime and returns a variety of results depending on the endpoint called.
API URL = https://anime-web-scraper.herokuapp.com

# EndPoints

## /letters, query parameter 'name'

This call returns a list of JSON objects in the format {name: ##, link:##}

Example: https://anime-web-scraper.herokuapp.com/letters/?name=a

Result 

````JSON
[
  {
    "name": "A Channel",
    "link": "/category/a-channel"
  },
  {
    "name": "A Channel Ova ",
    "link": "/category/-a-channel-ova-"
  },
  {
    "name": "A Channel Special ",
    "link": "/category/a-channel-special-"
  },
  {
    "name": "A Day Before Us",
    "link": "/category/a-day-before-us"
  },
  {
    "name": "A Letter to Momo (Dub)",
    "link": "/category/a-letter-to-momo-dub"
  },
  {
    "name": "A Little Snow Fairy Sugar",
    "link": "/category/a-little-snow-fairy-sugar"
  },
  {
    "name": "A Little Snow Fairy Sugar (Dub)",
    "link": "/category/a-little-snow-fairy-sugar-dub"
  }
]
````

## /genres, query parameter 'none'

  This call returns a list of JSON objects in the format {name: ##, link: ##}
  
  Example: https://anime-web-scraper.herokuapp.com/genres
  
  Result
  
````JSON
[
  {
    "name": "Action",
    "link": "/genre/action"
  },
  {
    "name": "Adventure",
    "link": "/genre/adventure"
  },
  {
    "name": "Cars",
    "link": "/genre/cars"
  },
  {
    "name": "Comedy",
    "link": "/genre/comedy"
  },
  {
    "name": "Dementia",
    "link": "/genre/dementia"
  },
  {
    "name": "Demons",
    "link": "/genre/demons"
  }
]
````

## /gl, query parameter 'link'

This call returns a list of JSON objects in the format {name: ##, link: ##, image: ##, release: ##}

Example: https://anime-web-scraper.herokuapp.com/gl?link=/genre/comedy

Results
````JSON
[
  {
    "name": "Soredemo Ayumu wa Yosetekuru",
    "link": "/category/soredemo-ayumu-wa-yosetekuru",
    "image": "https://gogocdn.net/cover/soredemo-ayumu-wa-yosetekuru.png",
    "release": "\n                                                                                    Released: 2022                                                                            "
  },
  {
    "name": "Kakkou no Iinazuke",
    "link": "/category/kakkou-no-iinazuke",
    "image": "https://gogocdn.net/cover/kakkou-no-iinazuke.png",
    "release": "\n                                                                                    Released: 2022                                                                            "
  },
  {
    "name": "Machikado Mazoku 2nd Season",
    "link": "/category/machikado-mazoku-2nd-season",
    "image": "https://gogocdn.net/cover/machikado-mazoku-2nd-season.png",
    "release": "\n                                                                                    Released: 2022                                                                            "
  }
]
````

## /popular, query parameter 'none'

This call returns a list of JSON objects in the format {name: ##, link: ##, image: ##, latest: ##, genre: ##}

Example: https://anime-web-scraper.herokuapp.com/popular

Result

````JSON
[
  {
    "name": "Kyuukyoku Shinka shita Full Dive RPG ga Genjitsu yori mo Kusoge Dattara",
    "link": "/category/kyuukyoku-shinka-shita-full-dive-rpg-ga-genjitsu-yori-mo-kusoge-dattara",
    "image": "https://cdnimg.xyz/cover/kyuukyoku-shinka-shita-full-dive-rpg-ga-genjitsu-yori-mo-kusoge-dattara.png",
    "latest": "Episode 9",
    "genre": " Action, Comedy, Fantasy, Game                                        "
  },
  {
    "name": "Tokyo Revengers",
    "link": "/category/tokyo-revengers",
    "image": "https://cdnimg.xyz/cover/tokyo-revengers.png",
    "latest": "Episode 9",
    "genre": " Action, Drama, School, Shounen                                        "
  },
  {
    "name": "Zombieland Saga: Revenge",
    "link": "/category/zombieland-saga-revenge",
    "image": "https://cdnimg.xyz/cover/zombieland-saga-revenge.png",
    "latest": "Episode 9",
    "genre": " Comedy, Music, Supernatural                                        "
  }
]
````

## /recent, query parameter 'page'

This call returns a list of JSON objects in the format {name: ##, link: ##, image: ##. episode: ##}

Example: https://anime-web-scraper.herokuapp.com/recent?page=1

Result

````JSON
[
  {
    "name": "Chibi Revenger",
    "link": "/chibi-revenger-episode-8",
    "image": "https://cdnimg.xyz/cover/chibi-revenger.png",
    "episode": "Episode 8"
  },
  {
    "name": "Bishounen Tanteidan",
    "link": "/bishounen-tanteidan-episode-9",
    "image": "https://cdnimg.xyz/cover/bishounen-tanteidan.png",
    "episode": "Episode 9"
  },
  {
    "name": "Tokyo Revengers",
    "link": "/tokyo-revengers-episode-9",
    "image": "https://cdnimg.xyz/cover/tokyo-revengers.png",
    "episode": "Episode 9"
  },
  {
    "name": "Shadows House",
    "link": "/shadows-house-episode-9",
    "image": "https://cdnimg.xyz/cover/shadows-house.png",
    "episode": "Episode 9"
  }
]
````

## /search, query parameter 'name' 🧐🔎
  
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


## /desc, query parameter 'link' 🎞📜
  
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


## /episodes, query parameters 'start', 'end', 'id', 'name' 📺

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


## /downloadLink, query parameter 'link' 📽

This call returns a JSON object in the format {name: ##, link: ##}

Example: https://anime-web-scraper.herokuapp.com/downloadLink?link=/world-trigger-dub-episode-2

Result

````JSON
{
    "name": "Download\n            (HDP - mp4)",
    "link": "https://storage.googleapis.com/river-data-311609/WF6EZJFJ9B/22a_1620636671_136382.mp4"
  }
````

