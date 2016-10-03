module.exports = color
const pixie = require('pixie')
const svgToPng = require('svg-to-png')
const fs = require('fs')
const uuid = require('uuid')
const path = require('path')
const os = require('os')

function color (bot, config) {
  // Plugins traits
  color.command = 'color'
  color.usage = 'color <...codes>'
  color.description = 'Given hex/rgb/hsl/etc. color codes, message an PNG image of them'

  // Pick config values, set defaults
  config = config[color.name] || {}
  const defaultBackground = config.background || '#FFF'
  const maxColors = config.max === 'Infinity' ? Infinity : config.max || 6
  const size = config.size || 50
  const tmpdir = config.tmpdir || os.tmpdir()

  // Command handler
  return function run (message, colors, flags) {
    const colorsAmount = colors.length

    // Check valid amount of colors.
    if (colorsAmount > maxColors || !colorsAmount) {
      return message.reply('Invalid amount of colors. (At least one, maximum ' + maxColors + ')')
    }

    // Create color rects
    const rects = []
    for (let i = 0; i < colorsAmount; i++) {
      let color = colors[i]
      const colorEnds = color[0] + color[color.length - 1]
      if (colorEnds === '""' || colorEnds === "''") color = color.slice(1, -1)
      rects.push(
        '<rect x="' + i * size + '" y="0" width="' + size + '" height="' + size + '"' +
        ' fill="' + color + '"></rect>')
    }

    // Handle background color
    let background = flags.background || defaultBackground
    const bgEnds = background[0] + background[background.length - 1]
    if (bgEnds === '""' || bgEnds === "''") background = background.slice(1, -1)

    // create svg
    const svg = '<svg width="' + rects.length * size + '" height="' + size + '" ' +
      'xmlns="http://www.w3.org/2000/svg" ' +
      'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
      'style="background-color:' + background + '">' +
      rects.join() +
      '</svg>'


    const id = uuid.v4()
    const svgFile = path.join(tmpdir, id + '.svg')
    const pngFile = path.join(tmpdir, id + '.png')
    fs.writeFile(svgFile, svg, function (err) {
      if (err) throw err
      svgToPng.convert(svgFile, tmpdir).then(function () {
        fs.readFile(pngFile, function (err, data) {
          if (err) throw err
          message.channel.sendFile(data)
          fs.unlink(svgFile)
          fs.unlink(pngFile)
        })
      })
    })
  }
}
