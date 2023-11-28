import { postPieceMove, postPieceSelect } from "./client.js"
import { loadPieceImage } from "./image_loader.js"

const PLAYER_BLACK = "black"
const PLAYER_WHITE = "white"

const BLACK_SQUARE = '#B58863'
const WHITE_SQUARE = '#F0D9B5'
const FROM_SQUARE = '#33A1FF'
const TO_SQUARE = '#B633FF'

const SQUARE_SIZE = 50

export class Board {
  constructor(draw) {
    this.draw = draw
    this.currentPlayer = PLAYER_WHITE
    this.selectedSquare = null
    this.squares = []
    this.toSquares = []
  }

  async loadBoardData(boardJson) {
    this.currentPlayer = boardJson.current_player

    for (let i = 0; i <= 7; i++) {
      this.squares[i] = this.squares[i] || []
      
      for (let j = 0; j <= 7; j++) {

        if (!this.squares[i][j]) {
          // Using an SVG grouping avoids us having to move the square/pieces separately
          const group = this.draw.nested()
          const x = j * SQUARE_SIZE
          const y = i * SQUARE_SIZE
          group.move(x, y)
          
          const isBlackSquare = (i + j) % 2
          const rect = this.buildRect(group, isBlackSquare)
          rect.click(this.buildClickSquareCallback(rect, i, j))
          
          this.squares[i][j] = {
            group,
            rect
          }
        }
        
        const square = this.squares[i][j]
        const squareData = boardJson.board_pieces[i][j]

        if (square.piece) {
          // Check if the piece on the square has changed and needs to be redrawn
          if (squareData && square.piece.pieceType == squareData.piece && square.piece.player == squareData.player) {
            continue
          } else {
            square.piece.svg.remove()
            square.piece = null
          } 
        }
      
        if (squareData) {
          const piece = await this.buildPiece(square.group, squareData.piece, squareData.player)
          piece.svg.click(this.buildClickSquareCallback(square.rect, i, j))
          this.squares[i][j].piece = piece
        }
      }
    }
  }

  getRect(i, j) {
    return this.squares[i][j].rect
  }

  getPiece(i, j) {
    return this.squares[i][j].piece
  }

  clearSquareSelection() {
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        const rect = this.getRect(i, j)
        const isBlackSquare = (i + j) % 2

        if (isBlackSquare) {
          rect.fill(BLACK_SQUARE)
        } else {
          rect.fill(WHITE_SQUARE)
        }
      }
    }
  }

  buildClickSquareCallback(rect, i, j) {
    const callback = async () => {
      const piece = this.getPiece(i, j)
      if (piece && piece.player == this.currentPlayer) {
        this.clearSquareSelection()

        rect.fill(FROM_SQUARE)

        this.selectedSquare = [i, j]

        const toSquares = await postPieceSelect(i, j)

        for (const square of toSquares) {
          const squareRect = this.getRect(square.row, square.col)
          squareRect.fill(TO_SQUARE)
        }

        this.toSquares = toSquares
      } else if (this.selectedSquare) {
        for (const square of this.toSquares) {
          if (square.row == i && square.col == j) {
            const boardJson = await postPieceMove(this.selectedSquare[0], this.selectedSquare[1], i, j)

            await this.loadBoardData(boardJson)

            this.selectedSquare = null
            this.toSquares = []
            this.clearSquareSelection()
          }
        }
      }
    }

    callback.bind(this)

    return callback
  }

  buildRect(svgGroup, isBlackSquare) {
    const rect = svgGroup.rect(SQUARE_SIZE, SQUARE_SIZE)

    if (isBlackSquare) {
      rect.fill(BLACK_SQUARE)
    } else {
      rect.fill(WHITE_SQUARE)
    }

    return rect
  }

  async buildPiece(svgGroup, piece, player) {
    const svgData = await loadPieceImage(piece, player)
    const pieceSvg = svgGroup.svg(svgData).find('svg')

    // Necessary to center the SVG piece image relative to the square it's on
    pieceSvg.move(2, 0)
    
    return {
      pieceType: piece,
      player: player,
      svg: pieceSvg
    }
  }
}