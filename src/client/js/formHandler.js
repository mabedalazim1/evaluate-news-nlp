function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value
    if (Client.checkURL(formText)) {
        console.log("::: Form Submitted :::")
        console.log("::: URL :::",formText )

        postApi('http://localhost:8081/api', {url: formText})
        .then( (res)=> {
        document.getElementById('results').innerHTML = `Agreement: ${res.agreement}`
    })
    } else {
        alert('Sorry, the URL is incorrect. Please try a valid URL.');
    }

    
}
const postApi = async (url = "", data = {}) => {
    console.log('Respones:', data)
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
        const apiData = await res.json()
        console.log('Data received:', apiData)
        return apiData
    } catch (err) {
        console.log('error', err)
    }
}
export { handleSubmit }
