//console.log('client side js file loaded')




const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgerror = document.querySelector('#error')
const msgdata = document.querySelector('#data')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    
        response.json().then((data) => {
            if(data.error) {
                msgerror.textContent = data.error
            }
            else {
                msgdata.textContent= 'Forecast: ' +data.forecast+ ' ,Location: ' +data.location + ' ,Temperature: '+data.temperature
            }
        })
    })
})


