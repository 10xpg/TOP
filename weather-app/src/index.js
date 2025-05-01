// url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Accra,Ghana?key=KFMQDCRLAK6KEJJ4ZASBSSLGG '
async function getForecast(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KFMQDCRLAK6KEJJ4ZASBSSLGG`
  try {
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    json = await response.json()
    console.log(json)
    const requiredData = convertResponse(json)
    updateUI(requiredData)
  } catch (error) {
    console.error(error.message)
  }
}

function convertResponse(response) {
  const {
    resolvedAddress,
    timezone,
    description,
    currentConditions: { conditions, icon, temp }
  } = response

  const requiredData = {
    resolvedAddress,
    timezone,
    description,
    conditions,
    icon,
    temp
  }
  console.log(requiredData)
  return requiredData
}

const locationForm = document.querySelector('form')
locationForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(locationForm)
  const location = formData.get('location')
  getForecast(location)
  //   locationForm.reset()
})

function updateUI(requiredData) {
  const results = document.querySelector('.results')
  const resultDisplay = document.createElement('div')
  resultDisplay.classList.add('display')
  results.textContent = ''

  const address = document.createElement('div')
  address.textContent = `Resolved Address: ${requiredData.resolvedAddress}`
  const timezone = document.createElement('div')
  timezone.textContent = `Timezone: ${requiredData.timezone}`
  const description = document.createElement('div')
  description.textContent = `Description: ${requiredData.description}`
  const conditions = document.createElement('div')
  conditions.textContent = `Conditions: ${requiredData.conditions}`
  const icon = document.createElement('div')
  icon.textContent = `Icon: ${requiredData.icon}`
  const temp = document.createElement('div')
  temp.textContent = `Temperature: ${requiredData.temp}`

  resultDisplay.appendChild(address)
  resultDisplay.appendChild(timezone)
  resultDisplay.appendChild(description)
  resultDisplay.appendChild(conditions)
  resultDisplay.appendChild(icon)
  resultDisplay.appendChild(temp)
  results.appendChild(resultDisplay)
}
