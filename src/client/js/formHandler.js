// Global variables
const conDiv = document.getElementById('results')
const evluatTitle = document.getElementById('evluat_title')
const errorText = document.getElementById('error')
const scoreText = document.getElementById('score')
const agreementText = document.getElementById('agreement')
const subjectivityText = document.getElementById('subjectivity')
const confidenceText = document.getElementById('confidence')
const ironyText = document.getElementById('irony')
const loader = document.getElementById('loader')
let iputUrl = document.getElementById('url')
const submitBtn = document.getElementById('submitBtn')

function handleSubmit (event) {
    event.preventDefault()
    conDiv.style.display = 'none'
    submitBtn.disabled = true
    iputUrl.disabled= true
  // check what text was put into the form field
  try {
    if (Client.checkURL(iputUrl.value)) {
      loader.style.display = 'block'
      console.log('::: Form Submitted :::')
      postApi('http://localhost:8081/api', { url: iputUrl.value })
      .then(res => {
          updateUI(res)
      })
      .then(() => {
        iputUrl.value = ''
        showResult()
      }).catch((err) => {
        console.log(err)
        showResult(true)
        errorText.classList.add('error')
        errorText.innerHTML = 'There is no connection with server .. Please check your internet access.'
      })
  } else {
    alert('Sorry, the URL is incorrect. Please try a valid URL.')
      conDiv.style.display = 'none'
      loader.style.display = 'none'
      submitBtn.disabled = false
      iputUrl.disabled= false
      iputUrl.value = ''
  }
    }
    catch(err) {
      console.log(err)
    }
}

const postApi = async (url = '', data = {}) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json'
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
  catch (err) {
    console.log('error', err)
  }
}
const editScoreTag = score => {
  let tag
  switch (score) {
    case 'P+':
      tag = 'Strong Positive'
      break
    case 'P':
      tag = 'Positive'
      break
    case 'NEW':
      tag = 'Neutral'
      break
    case 'N+':
      tag = 'Strong Negative'
      break
    case 'NONE':
      tag = 'No Sentiment'
      break
    default:
      break
  }
  return tag
}
const updateUI = res => {
  // clear Err
    submitBtn.disabled = false
    iputUrl.disabled= false
  errorText.innerHTML = ''
  evluatTitle.innerHTML = 'Evaluation Results:'
  let msg = res.status.msg
  // Check page content
  if (msg === 'OK') {
    errorText.classList.remove('error')
    scoreText.innerHTML = `Sentiment Score: ${editScoreTag(res.score_tag)}`
    agreementText.innerHTML = `Agreement: ${capitalizeFirst(res.agreement)}`
    subjectivityText.innerHTML = `Subjectivity: ${capitalizeFirst(
      res.subjectivity
    )}`
    confidenceText.innerHTML = `Confidence: ${res.confidence}`
    ironyText.innerHTML = `Irony: ${capitalizeFirst(res.irony)}`
  } else {
    errorText.classList.add('error')
    errorText.innerHTML = 'There is no valid content to analyze on this page'
    delOldData()
  }
}

const showResult = (err = false) => {
  conDiv.style.display = 'block'
  loader.style.display = 'none'
  submitBtn.disabled = false
  iputUrl.disabled = false
  if (err) {
    delOldData()
  }
}

const delOldData = () => {
    scoreText.innerHTML = ''
    agreementText.innerHTML = ''
    subjectivityText.innerHTML = ''
    confidenceText.innerHTML = ''
    ironyText.innerHTML = ''
}
// Capitalize first letter
const capitalizeFirst = str => {
  str = str.toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export { handleSubmit }
export { editScoreTag }