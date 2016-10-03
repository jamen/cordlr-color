# cordlr-color [![NPM version](https://badge.fury.io/js/cordlr-color.svg)](https://npmjs.org/package/cordlr-color)

> Given hex/rgb/hsl/etc. color codes, message an PNG image of them

It supports anything SVG's `fill` would.

## Installation

```sh
$ npm install --save cordlr-color
```

## Usage

```
color <...codes> [--background <code>]
```

Example:
```
color #FFF
```
```
color #0F0F00 'rgba(0, 244, 100, 0.5)'
```
```
color 'rgba(0,0,0,0.8)' --background=red
```

### Config

```js
{
  "color": {
    "background": "#FFF", // default background color
    "max": 6, // The most colors someone can input
    "tmpdir": <dynamic>, // The place to store SVG and PNG files, defaults to your OS's tmpdir
  }
}
```

Allowing infinite colors:
```js
"max": "Infinity"
```

Using a transparent default background:
```js
"background": "rgba(255, 0, 0, 0.2)"
```

## License

MIT © [Jamen Marz](https://github.com/jamen)
