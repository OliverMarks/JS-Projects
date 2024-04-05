// import Modal  from "./modal";
import { useState, useRef, useEffect } from "react";
import parse from "html-react-parser" 


export default function AlbumCard ({albumTitle, albumImageUrl, albumReview, songClip}) {
    
    const [modal, setModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false)
    const [showMore, setShowMore] = useState(false);
    const ref = useRef();
   
    const playSongClip = () => {
        ref.current?.play();
        setIsPlaying(!isPlaying)
        
   }
   
  
   const pauseSongClip = () => {
    ref.current?.pause();
    setIsPlaying(!isPlaying)
    
}

const renderReview = () => {
  if (showMore) {
      return parse(albumReview);
  } else {
      // Truncate the review to 250 characters
      const truncatedReview = albumReview.substring(0, 750) + "...";
      return parse(truncatedReview) 
  }
};

   
   
    return (
        

      <div className="project-box__inner">
              <h1>{albumTitle}</h1>
              <div className="project-box__image">
              
              <img
              src={albumImageUrl}
              className="project-box__image__sleeve"
              onClick={() => setModal(true)}
              />

              <img
              className= {isPlaying ? "project-box__image__vinyl" : "project-box__image__vinyl"}
              src="https://d1x26sjkwh9vok.cloudfront.net/uploads/thumbnail/20190202/large_thumbnail_d40d4949-8586-4770-b3a1-293bb91fe173.png"
              alt="Large thumbnail d40d4949 8586 4770 b3a1 293bb91fe173"
              />
            
              <img
              className="play-btn"
              src={isPlaying ? "https://www.svgrepo.com/show/149256/pause-button.svg" : "https://www.svgrepo.com/show/333257/play-button-o.svg"}
              alt={isPlaying ? "Pause" : "Play"}
              onClick={isPlaying ? pauseSongClip : playSongClip}
              />

              <audio preload="metadata" ref={ref}>
              <source src={`/audio/${songClip}.mp3`}  type="audio/mpeg"/>
              <source src={`/audio/${songClip}.ogg`} type="audio/mpeg" />
              </audio>

              

              </div>

              <article className="review-container">
                {renderReview()}
                
            </article>
            <button className="btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button>

    </div>
  )
    
    
    }



    {/* <Modal
              openModal={modal}
              closeModal={() => setModal(false)}>
              <h1>{albumTitle}</h1>
              <p>{albumReview}</p>
              </Modal> */}

