import { useState, useRef } from 'react'
import './App.css'
import Nav from './components/nav'
import Header from './components/header'
import AlbumCard from './components/albumcard'

function App() {

 
  const [activeAlbum, setActiveAlbum] = useState(null);

  

  const albums = [
   {
      id: 1,
      albumTitle : 'Pinkerton - Weezer',
      albumImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Pinkerton_cover.jpg/220px-Pinkerton_cover.jpg',
      albumReview: `<p>
      I took a trip around central europe in Autumn 2017; hitting many cities along the Danube over the course of three weeks. I arrived in Prague on a sunny October afternoon and settled into the Hostel I had booked for the weekend. On that first night I had a conversation with an Australian backpacker, it was the usual template travellers chat: where are you from, where have you been, have you enjoyed Prague etc. I don’t particularly remember much of the conversation as it was particularly bland but I do remember her mentioning a hidden gem of a book shop, located under a bridge that she had spent hours in. I was sceptical that she had really spent hours in there and quickly filed the information under ‘Nice but I’m not interested’ and carried on with my evening. <br><br>

The next night at the hostel there was a planned pub crawl brewing. I’m not normally one for judging purely on appearance but that’s exactly what I did and decided this gang wasn’t for me. The guy behind me seemed to have made the same judgement and after a couple of lines back and forth confirming this, and, in a move which was very much against my usual shy MO, I decided to shoot my shot and see if he fancied grabbing a drink or two. To my relief John agreed so we hit the nearby bierkeller. After we’d had a couple pints the chat was flowing and we shared our backgrounds, enthused about the same music and enjoyed the same films, indulging in the kind of pretentious chat fan boys are itching to do. We spoke about favourite books and, seeing how aligned we were on other media, took real interest in his choice of ‘Infinite Jest’ by David Foster Wallace, a hefty 1000page literary cult classic, difficult to surmise over a pint and described as a bit of a marathon but I was intrigued. <br><br>

More pints flowed and we decided to head to a club off the beaten track a bit. It was underground, dark, dingey and full of smoke. We drank vodka redbulls and shuffled about the place like two fish out of water would. Eventually we got talking to a couple of slovenian girls, one of which was very attractive but who’s only english consisted of repeating the names of various Harry Potter characters. My well rehearsed chat about fridge shelves (which would usually produce polite laughter without fail) was of no use here. The conversation was a tad stale so I went to get another round of vodka redbulls; I’m not sure where the miscommunication occurred but I’d ended up with my Redbulls and more change than I’d actually paid with, I’d tried to point this out but the fella behind the bar just wanted me gone so I’d turned a tidy 300 Koruna profit from the exchange. <br><br>

We continued drinking for an hour or so before heading back to the hostel; drunkenly agreeing to a Maccies Breakfast the next morning. I woke up around 11 with a message from my drinking buddy asking if I was up. By the time I'd replied he was gone so I lay in bed feeling very rough and very sorry for myself. Another hour passed and the guilt of wasting one of my few days here hungover in bed set in; I forced myself up and blearily trudged around Prague more to show willingness than genuinely exploring. I’d done this for a couple hours and had decided to take a break, considering ending the tourist charade, when I realised across the road was the bookshop the Aussie had mentioned on my first night here. Curiosity led me towards the door and as I approached I saw in the doorway of the shop was a display unit for none other than Infinite Jest and it cost the exact amount of incorrect change I'd received the night before. The stars were aligning. I’m not a fatalist by any stretch of the imagination but it was all too perfect (or a very targeted advertising campaign), either way I had to buy it. The universe had spoken; it was my destiny to read this book. How would my life be different once I'd conquered its 1000 pages? What profound truth would become apparent? What series of events had the purchasing of the book set in motion? Well we don’t yet know. It’s been 5 years and I’ve managed 200 pages. I sometimes wonder if I ever will finish it and a little bit of me knows I won’t; it’ll probably sit on my bookshelf gathering dust. I sometimes feel like I’m Harry Potter deciding to go to the local comp instead of Hogwarts, not engaging with his story arc and just getting on with things. <br><br>

You’re probably wondering at this point what this has to do with Weezer’s sophomore album Pinkerton and that’s a fair question to ask. In all honesty it’s just one of my better anecdotes but there is a tenuous link. Pinkerton was one of those albums John and I both adored. We were stereotypical Weezer fan boys i.e we loved Weezer but what we <em>really</em> meant by that was that we loved their first two albums. I’d enjoyed these albums having illegally downloaded them in my early teens which, although cost effective, often leaves you devoid of the context in which they sit in an artists discography (particularly if you don’t pay attention to release dates). For this reason up until this point I had always assumed Pinkerton was Weezer’s debut album. It certainly feels like a debut album, gone are the clean production values of the blue album, the band opting instead to self produce, lending it’s sound a spoon full of rough and ready garage band (albeit a rather well equipped garage band), it’s darker, grittier and full of all the things you would expect to be cleaned up once a band is paired up with a producer with an ear to the charts. <br><br>

Despite the themes and lyrics, of which we’ll come to later, Pinkerton has the feel of a band having fun. Guitars are loose and thrashed, solos have impact and bass lines thud life into the rhythm section, The whoops, shouts and hollers left into the mix and scattered throughout the album add to this and make you want to get onboard for the ride. Most importantly it feels real and genuine. There’s a sincerity here that later Weezer albums failed to recreate and instead landed fully in the cringe bucket (yes I’m looking at you Can’t Stop Partying ft Lil Wayne). <em>El Scorcho</em> and its slack-anthemic chorus is a perfect example of this. <br><br>

If the Blue album had come after this you could have pointed to middle tracks <em>No other one</em> and <em>Why bother</em> as being a sign of things to come, instead they’re a link to the past and a thread from the blue album and the sound the band established in their debut. 


Although Pinkerton is very much considered at the top for most Weezer fans, it’s fair to say reaction to its release in ‘96 was mixed, with critics often pinpointing Cuomo’s lyrics as problematic.  He later famously described the experience of Pinkerton’s writing and release as:<blockquote><em>

“like getting really drunk at a party and spilling your guts in front of everyone and feeling incredibly great and cathartic about it, and then waking up the next morning and realizing what a complete fool you made of yourself”</blockquote></em>

<br><br>Personally, I feel the introspective lyrics make the album and are what set the album apart from its successors. Themes of angst, frustration, loneliness and longing are there throughout and you could argue there are early taints of inceldom present,  although, it’s not often you read of Incels complaining about all the sex they are having (see <em>Tired of sex</em>). Sure at times it can feel a bit like a pity party but as we hear on one the album’s highlights: <em>The Good Life</em> Rivers takes responsibility for this state of affairs and wants to get back on track.  Clearly Cuomo’s tapping into some rawer thoughts and feelings and I think it fits perfectly with the album's whole aesthetic; it’s letting loose a knot of frustration and who hasn’t been there?<br><br> 

Do they push things too far in terms of appropriateness at times? I wouldn’t say so. Would <em>Across the Sea</em> be a more enjoyable listen if it wasn’t about Rivers thinking about a Japanese school girl masturbating? Almost certainly. It’s not the only mention of a Japanese girl or reference to Japan in the album as a complete medium - the cover. In interviews about the album Cuomo talks about the influence of the opera Madama Butterfly by Puccini in which the character BF Pinkerton marries and then abandons a young Japanese girl. I’ve not seen Madame Butterfly but having read the synopsis it’s difficult to map the plot close enough to describe it as a concept album. To be honest I’m not sure what value the Madame Butterfly thread adds to the album but it’s impossible to remove an influence from a project like it’s a modular component. I can’t help but feel if this Japanese fetishism wasn’t present, negative reviews wouldn’t have focussed as much on the ‘creepiness’ of the lyrics; afterall, this album came out 2 years after Trent Raznor had wanted to <em>“fuck you like an animal and feel you from the inside”</em> on the <em>Downward Spiral</em> all to critical acclaim. Perhaps the real problem lies with Cuomo not having the stomach to spill his guts and his refrain of “I’m Sorry” in the gentle acoustic closer  <em>Butterfly</em> is preemptive atonement for sharing these feelings. <br><br>

It’s easy to ‘what if’ a world where Rivers hadn’t felt the shame of this album quite so acutely. A world where instead of rejecting the Pinkerton path, introspectrum was embraced and explored further, maybe we’d have been spared the torrent of mediocrity that followed. For fans of the band, whatever shade of shit is to come next, at least we will always have the Blue album and Pinkerton. <br><br>


    </p>`,
      songClip: "El Scorcho",
    },
    {
      id: 2,
      albumTitle : 'Ants from Up There - Black Country, New Road',
      albumImageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Ants_from_Up_There_-_Black_Country%2C_New_Road.jpg',
      albumReview: "lorem ipsum lorem lorem lorem lorem",
      songClip: "ants",
    },
    {
      id: 3,
      albumTitle : "There's Nothing Wrong with Love - Built to Spill",
      albumImageUrl: 'https://media.pitchfork.com/photos/5929b111b1335d7bf169a1fe/1:1/w_320,c_limit/28f146a8.jpg',
      albumReview: "lorem ipsum lorem lorem lorem lorem",
      songClip: "ants",
    },
    {
      id: 4,
      albumTitle : 'The Moon & Antarctica - Modest Mouse',
      albumImageUrl: 'https://media.pitchfork.com/photos/5929c373ea9e61561daa7f08/1:1/w_320,c_limit/789479e8.jpeg',
      albumReview: "lorem ipsum lorem lorem lorem lorem",
      songClip: "ants",
    },
    {
      id: 5,
      albumTitle : 'Wide Awake - Parquet Courts',
      albumImageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/09/Wide_Awake_Parquet_Courts.jpg',
      albumReview: "lorem ipsum lorem lorem lorem lorem",
      songClip: "ants",
    }

  ]
  

  return (
    <div className='container'>
    
    
    <div className='thumbnail-container'>
    <Header />
      {albums.map((album) => (
    <img
    className={activeAlbum?.id && album.id === activeAlbum.id ? 'thumbnail-active' : 'thumbnail'}
      key={album.id} 
      src={album.albumImageUrl}
      alt={album.albumTitle} 
      onClick={() => setActiveAlbum(album)} 
    />
  ))}

</div>
    



    
    
    <div className='slide-container'>
    
      
      {activeAlbum ? 
      <AlbumCard 
      key={activeAlbum.id}
      albumTitle ={activeAlbum.albumTitle}
      albumImageUrl = {activeAlbum.albumImageUrl}
      albumReview ={activeAlbum.albumReview}
      songClip = {activeAlbum.songClip}
      />
        : null}
     
   
    </div>

   


    
  

    </div>
      
  )
}

export default App





