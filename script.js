document.querySelector('.busca').addEventListener('submit', async event => {
  event.preventDefault()

  let input = document.querySelector('#searchInput').value

  if (input !== '') {//caso o input seja preechido fazemos a requisição
    clearInfo()//função para limpar o input
    showWarning('Carregando...')

    let results =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(
          input
        )}&units=metric&lang=pt_br&appid=0526f7b2a0ef7b71518cf2d3df044a8c`)//requisição
    let json = await results.json()//transformando as informações da requisição em json

    if (json.cod === 200) {//cod 200 no objeto json é cidade encontrada
      showInfo({//criando um objeto com as informações constantes no console d json
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      clearInfo()//caso não encontre a cidade e já tenha outra, primeiro limpa e depois mostra a mensagem
      showWarning('Não encontramos esta localização.')
    }
  } else {
    clearInfo()
  }
})

function showInfo(obj) {
  showWarning('')//limpa a mensagem da função

  document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`

  document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`
  document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`

  document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`)

  document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle - 90}deg)`

  document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
  showWarning('')//limpa a mensagem carregando
  document.querySelector('.resultado').style.display = 'none'//tira o resultado da tela
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg
}
