// index.js

const ramensURL = 'http://localhost:3000/ramens'
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetailImage = document.querySelector('.detail-image')
const ramenDetailName = document.querySelector('.name')
const ramenDetailRestaurant = document.querySelector('.restaurant')
const ratingDisplay = document.querySelector('#rating-display')
const commentDisplay = document.querySelector('#comment-display')
const newRamenForm = document.querySelector('#new-ramen')


// Callbacks
const handleClick = (ramen) => {
  //! creating a function that will pull in the ramen data and fill out the details 
    ramenDetailImage.src = ramen.image
    ramenDetailImage.alt = ramen.name
    ramenDetailName.textContent = ramen.name
    ramenDetailRestaurant.textContent = ramen.restaurant
    ratingDisplay.textContent = ramen.rating
    commentDisplay.textContent = ramen.comment
}
const addSubmitListener = (e) => {
    e.preventDefault()
    //! need to create a newRamen object that will pull in the content typed into the submit form
    const newRamen = {
        name: e.target.elements['new-name'].value,
        restaurant: e.target.elements['new-restaurant'].value,
        image: e.target.elements['new-image'].value,
        rating: e.target.elements['new-rating'].value,
        comment: e.target.elements['new-comment'].value,
    }
    //! need to display that new data
    displayRamens(newRamen)
    e.target.reset()
}

const displayRamens = (ramensObj) => {
    const ramenImg = document.createElement('img')
    ramenImg.className = 'new-ramen'
    ramenImg.src = ramensObj.image
    ramenImg.alt = ramensObj.name
    ramenImg.addEventListener('click', () => handleClick(ramensObj))
    ramenMenu.append(ramenImg)
    // Use append instead of appendChild , messes with things
  }
  const getJSON = (url) => {
      return fetch(url)
          .then((resp) => {
              if (resp.ok) {
                  return resp.json()
              } else {
                  throw resp.statusText
              }
          })
  }

  const main = () => {
      // Invoke displayRamens here
      getJSON(ramensURL)
          .then((ramensData) => {
              handleClick(ramensData[0])
              ramensData.forEach((ramen) => displayRamens(ramen))
          })
          .catch(console.error)
      // Invoke addSubmitListener here
      newRamenForm.addEventListener('submit', addSubmitListener)
  }

  main()

  
  // Export functions for testing
  export {
      displayRamens,
      addSubmitListener,
      handleClick,
      main,
  }
