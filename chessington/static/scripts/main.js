import { Board } from "./board.js"
import { LoadPieceSvg } from "./piece.js";
import { SVG } from '@svgdotjs/svg.js'

const width = 600, height = 600

var draw = SVG().addTo('body').size(width, height)

const board = new Board(draw, height)

// LoadPieceSvg(two, group, "bishop", "black")

// two.update();