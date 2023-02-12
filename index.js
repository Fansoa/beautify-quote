const Canvas = require('canvas')
const Image = Canvas.Image
const fs = require('fs')
const path = require('path')

async function addTextToImage(imgUrl, filePath, text, textColor) {
  const image = await loadImage(imgUrl)
  const canvas = Canvas.createCanvas(image.width, image.height)
  const ctx = canvas.getContext("2d")
  ctx.drawImage(image, 0, 0)
  ctx.font = "36px sans-serif"
  ctx.fillStyle = textColor
  ctx.textAlign = "center"
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  const data = canvas.toBuffer()

  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, data)
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
