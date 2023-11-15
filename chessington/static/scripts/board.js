import { LoadPieceSvg } from "./piece.js"

const BLACK_SQUARE = '#B58863'
const WHITE_SQUARE = '#F0D9B5'
const FROM_SQUARE = '#33A1FF'
const TO_SQUARE = '#B633FF'

export class Board {
  constructor(draw, height) {
    const totalHeight = height
    const stepSize = totalHeight / 8
    this.squares = []

    for (let i = 0; i <= 7; i++) {
      this.squares[i] = []
      
      for (let j = 0; j <= 7; j++) {
        // this.piece = boardJson[i][j]

        const isBlackSquare = (i + j) % 2
        const x = j * stepSize
        const y = i * stepSize
        const rect = draw.rect(stepSize, stepSize).move(x, y)

        if (isBlackSquare) {
          rect.fill(BLACK_SQUARE)
        } else {
          rect.fill(WHITE_SQUARE)
        }

        this.squares[i][j] = rect
      }
    }
  }
}