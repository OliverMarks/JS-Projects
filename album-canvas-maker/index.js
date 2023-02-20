var dragSrcEl = null;

document.addEventListener('DOMContentLoaded', (event) => {
    // const container = document.getElementById("container")

    // const boxNumInput = document.getElementById("grid-size")
    
    // boxNumInput.addEventListener('input', function (){
    //     let numBoxes = boxNumInput.value
    //     console.log(this.value)
    //     for (let i = 0; i < numBoxes; i++) {
    //         const albumBox = document.createElement("div")
    //         albumBox.classList.add("box")
    //         albumBox.setAttribute("draggable", "true")
    //         container.appendChild(albumBox)
            
    //     }
    // })
    
    
    function handleDragStart(e) {
    //   this.style.opacity = '0.4';
      
      dragSrcEl = this;
  
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }
  
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
  
      e.dataTransfer.dropEffect = 'move';
      
      return false;
    }
  
    function handleDragEnter(e) {
      this.classList.add('over');
    }
  
    function handleDragLeave(e) {
      this.classList.remove('over');
    }
  
    function handleDrop(e) {
        console.log(dragSrcEl);

      if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
      }
      
      if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      
      return false;
    }
  
    function handleDragEnd(e) {
      this.style.opacity = '1';
      
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
    
    let items = document.querySelectorAll('.container .box');
    items.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragenter', handleDragEnter, false);
      item.addEventListener('dragover', handleDragOver, false);
      item.addEventListener('dragleave', handleDragLeave, false);
      item.addEventListener('drop', handleDrop, false);
      item.addEventListener('dragend', handleDragEnd, false);
    });


  const API_KEY = '1b8d2b8142ed03f9e130a7655529fc7d';

// get references to the input field and album cover div
const albumNameInput = document.getElementById('album-name');
const albumCoverDiv = document.getElementById('album-cover');

// function to search for an album by name and display the cover image
function searchForAlbum() {
  // get the album name from the input field
  const albumName = albumNameInput.value;
  
  // make a request to the Last.fm API to search for the album
  fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumName}&api_key=${API_KEY}&format=json`)
    .then(response => response.json())
    .then(data => {
      // get the first album result from the search
      const album = data.results.albummatches.album[0];
      
      // create an img element with the album cover image
      const albumCoverImg = document.createElement('img');
      albumCoverImg.src = album.image[3]['#text'];
      
      // add the album cover image to the album cover div
      albumCoverDiv.innerHTML = '';
      albumCoverDiv.appendChild(albumCoverImg);
      console.dir(albumCoverDiv);

    })
    .catch(error => {
      console.error('Error searching for album:', error);
    });
}

// add an event listener to the input field to search for the album when the user types in it
albumNameInput.addEventListener('input', searchForAlbum);

setTimeout(() => {
    let albumCoverDiv = document.getElementById('album-cover');
    albumCoverDiv.addEventListener('dragstart', handleDragStart, false);
    albumCoverDiv.addEventListener('dragenter', handleDragEnter, false);
    albumCoverDiv.addEventListener('dragover', handleDragOver, false);
    albumCoverDiv.addEventListener('dragleave', handleDragLeave, false);
    albumCoverDiv.addEventListener('drop', handleDrop, false);
    albumCoverDiv.addEventListener('dragend', handleDragEnd, false);
  }, 1000);

});
