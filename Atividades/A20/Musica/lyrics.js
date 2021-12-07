function doSubmit() {
  const artist = document.querySelector('#artist').value
  const song = document.querySelector('#song').value

  const url = `https://api.lyrics.ovh/v1/${artist}/${song}`

  axios
    .get(url)

    .then(response => {
      music.innerHTML = response.data.lyrics.replace(
        new RegExp('\n', 'g'),
        '<br>'
      )
    })
    .catch(error => console.log(error))
}
