//----------------------------- START OF CODE
// index.js

const ramensURL = 'http://localhost:3000/ramens'
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetailImage = document.querySelector('.detail-image')
const ramenDetailName = document.querySelector('.name')
const ramenDetailRestaurant = document.querySelector('.restaurant')
const ratingDisplay = document.querySelector('#rating-display')
const commentDisplay = document.querySelector('#comment-display')
const newRamenForm = document.querySelector('#new-ramen')
const deleteRamenMenuItm = document.querySelector('#ramen-del-btn')
const updateRamenMenuData = document.querySelector('#submit-update')

// Callbacks


const handleClick = (ramen) => {
    //! creating a function that will pull in the ramen data and fill out the details 
    ramenDetailImage.src = ramen.image
    ramenDetailImage.alt = ramen.name //* Good catch ading an alt - MATTEO
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
    debugger
    //*Trying POST
    postJSON(ramensURL, newRamen)
        .then((createdRamen) => displayRamens(createdRamen))
        .catch(console.error)
    debugger
    e.target.reset()

    // //! need to display that new data
    // displayRamens(newRamen)
    // e.target.reset() //* Great job resetting the form!
}


//! PERFECT job with the displayRamens callback, no notes really! - MATTEO
//* This function was meant to be used for the fetch call, hence the pluralized name - MATTEO
//* You used it to display ONE ramen, so the naming convention is a bit confusing - MATTEO
//* Said that, there was a bit of confusion with the tests and which functions could not be removed - MATTEO
//* So take it more as a general suggestion for the future - MATTEO


const displayRamens = (ramensObj) => {
    const ramenMenuContainer = document.createElement('div')
    const ramenDelBtn = document.createElement('button')
    const ramenImg = document.createElement('img')
    ramenMenuContainer.className = 'ramen-item'
    ramenMenuContainer.setAttribute('data-id', ramensObj.id)
    ramenImg.className = 'new-ramen'
    ramenImg.src = ramensObj.image
    ramenImg.alt = ramensObj.name
    ramenImg.setAttribute('data-id', ramensObj.id)
    ramenImg.addEventListener('click', () => handleClick(ramensObj))
    ramenDelBtn.class = 'ramen-del-btn'
    ramenDelBtn.name = `delete ${ramensObj.name}`
    ramenDelBtn.type = 'button'
    ramenDelBtn.textContent = `Delete ${ramensObj.name}`
    ramenDelBtn.setAttribute('data-id', ramensObj.id)
    ramenMenu.appendChild(ramenMenuContainer)
    ramenMenuContainer.appendChild(ramenDelBtn)
    ramenMenuContainer.appendChild(ramenImg)
  //  const ramenID = ramensObj.id

    // ramenDelBtn.querySelector('')
    //! needing to re-select element with new assigned data-id attribute 
    const selectRamenDelId = document.querySelector(`div#ramen-menu > .ramen-item > button[data-id='${ramensObj.id}']`)
    const selectImageId = document.querySelector(`div#ramen-menu > .ramen-item > img[data-id='${ramensObj.id}']`)
    debugger
    const selectContainerID = document.querySelector(`div#ramen-menu > .ramen-item[data-id='${ramensObj.id}']`)

    //   document.querySelectorAll('button[data-id]').forEach((button) => {
    selectRamenDelId.addEventListener('click', function (event) {
        let dataId = event.currentTarget.getAttribute('data-id')
        selectContainerID.remove()
        selectRamenDelId.remove() // remove deleted button from DOM via data-ID
        selectImageId.remove() // remove deleted image from DOM via data-ID
        deleteAnimal(`${ramensObj.id}`) //delete current object.id 
    })
    debugger

    
    updateRamenMenuData.addEventListener('submit', updatedRamen)
    const updatedRamen = (e) => {
        e.preventDefault()
        const updatedRamenRating = e.target.elements['update-rating'].value
        const updatedRamenComment = e.target.elements['update-comment'].value
        debugger
        //*Trying PATCH
        // patchJSON(updatedRamenRating)
        // .then(res => res.json())
        // .then((createdRamen) => displayRamens(createdRamen))
        // .catch(console.error)
        // debugger
        // }
        fetch(`http://localhost:3000/ramens/${ramenObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: updatedRamenRating
     //           comment: e.target.ramenObj.comment.value,
            })
        })
    }
}
debugger
// Use append instead of appendChild , messes with things

// const updatedRamen = (e) => {
//     e.preventDefault()
//     const updatedRamenRating = e.target.elements['update-rating'].value
//     const updatedRamenComment = e.target.elements['update-comment'].value
//     debugger
//     //*Trying PATCH
//     // patchJSON(updatedRamenRating)
//     // .then(res => res.json())
//     // .then((createdRamen) => displayRamens(createdRamen))
//     // .catch(console.error)
//     // debugger
//     // }
//     fetch(`http://localhost:3000/ramens/${ramenObj.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             rating: updatedRamenRating
//  //           comment: e.target.ramenObj.comment.value,
//         })
//     })
// }

// updateRamenMenuData.addEventListener('submit', updatedRamen)

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

const postJSON = (url, data) => {
    const configObj = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    return fetch(url, configObj)
        .then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else {
                throw resp.statusText
            }
        })
}


const deleteAnimal = (id) => {
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(deletedRamen => console.log(deletedRamen))
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
