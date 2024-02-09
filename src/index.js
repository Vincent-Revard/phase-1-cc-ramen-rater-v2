//----------------------------- START OF CODE


// index.js
//! THE ONLY GENERAL NOTE IS:
//* 1. YOU did AWESOME, very clear, clean, and logical
//TODO 2. I would start paying attention to indentation or start using an auto-indent tool


//! GREAT job with the globals - MATTEO
const ramensURL = 'http://localhost:3000/ramens'
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetailImage = document.querySelector('.detail-image')
const ramenDetailName = document.querySelector('.name')
const ramenDetailRestaurant = document.querySelector('.restaurant')
const ratingDisplay = document.querySelector('#rating-display')
const commentDisplay = document.querySelector('#comment-display')
const newRamenForm = document.querySelector('#new-ramen')


// Callbacks
//! PERFECT job with the handleClick callback, no notes! - MATTEO

const handleClick = (ramen) => {
  //! creating a function that will pull in the ramen data and fill out the details 
	ramenDetailImage.src = ramen.image
	ramenDetailImage.alt = ramen.name //* Good catch ading an alt - MATTEO
	ramenDetailName.textContent = ramen.name
	ramenDetailRestaurant.textContent = ramen.restaurant
	ratingDisplay.textContent = ramen.rating
	commentDisplay.textContent = ramen.comment
}

//! PERFECT job with the addSubmitListener callback, no notes! - MATTEO

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
	e.target.reset() //* Great job resetting the form!
}

//! PERFECT job with the displayRamens callback, no notes really! - MATTEO
//* This function was meant to be used for the fetch call, hence the pluralized name - MATTEO
//* You used it to display ONE ramen, so the naming convention is a bit confusing - MATTEO
//* Said that, there was a bit of confusion with the tests and which functions could not be removed - MATTEO
//* So take it more as a general suggestion for the future - MATTEO
const displayRamens = (ramensObj) => {
	const ramenImg = document.createElement('img')
	ramenImg.className = 'new-ramen'
	ramenImg.src = ramensObj.image
	ramenImg.alt = ramensObj.name
	ramenImg.addEventListener('click', () => handleClick(ramensObj))
	ramenMenu.append(ramenImg)
	// Use append instead of appendChild , messes with things
}

  //! PERFECT job with the getJSON utility function and even just including one!!! - MATTEO

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
//! The following logic could have been encapsulated into a smaller function - MATTEO
//! and then you could have invoked that function here - MATTEO
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
//   export {
//       displayRamens,
//       addSubmitListener,
//       handleClick,
//       main,
//   }


//----------------------------- END OF CODE