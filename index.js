async function addTextToImage(imgUrl, text, textColor) {
  const image = await loadImage(imgUrl)
  const canvas = createCanvas(image.width, image.height)
  const ctx = canvas.getContext("2d")
  ctx.drawImage(image, 0, 0)
  ctx.font = "36px sans-serif"
  ctx.fillStyle = textColor
  ctx.textAlign = "center"
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  return canvas.toDataURL()
}

async function loadImage(url) {
  const image = new Image()
  return new Promise((resolve, reject) => {
    image.onload = function() {
      resolve(image)
    }
    image.onerror = function(error) {
      reject(error)
    }
    image.src = url
  })
}

function createCanvas(width, height) {
  const canvas = new OffscreenCanvas(width, height)
  return canvas
}