import { loadPieceSvgData } from "./piece.js"

const BLACK_SQUARE = '#B58863'
const WHITE_SQUARE = '#F0D9B5'
const FROM_SQUARE = '#33A1FF'
const TO_SQUARE = '#B633FF'

const SQUARE_SIZE = 50

export class Board {
  constructor(draw) {
    this.draw = draw
  }

  async loadBoardData(boardJson) {
    this.squares = []

    for (let i = 0; i <= 7; i++) {
      this.squares[i] = []
      
      for (let j = 0; j <= 7; j++) {
        const group = this.draw.nested()
        const isBlackSquare = (i + j) % 2
        const x = j * SQUARE_SIZE
        const y = i * SQUARE_SIZE
        group.move(x, y)

        this.squares[i][j] = group

        await this.buildRect(group, isBlackSquare)

        const squareData = boardJson[i][j]

        if (squareData) {
          await this.buildPiece(group, squareData.piece, squareData.player)
        }
      }
    }
  }

  async buildRect(svgGroup, isBlackSquare) {
    const rect = svgGroup.rect(SQUARE_SIZE, SQUARE_SIZE)

    if (isBlackSquare) {
      rect.fill(BLACK_SQUARE)
    } else {
      rect.fill(WHITE_SQUARE)
    }
  }

  async buildPiece(svgGroup, piece, player) {
    const svgData = await loadPieceSvgData(piece, player)
    const pieceSvg = svgGroup.svg(svgData).find('svg')
    pieceSvg.move(2, 0)
  }
}