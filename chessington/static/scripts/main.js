import { Board } from "./board.js"
import { getBoardData } from "./client.js";
import { SVG } from '@svgdotjs/svg.js'


async function main() {
    const width = 400, height = 400

    const draw = SVG().addTo('body').size(width, height)

    const boardJson = await getBoardData()

    const board = new Board(draw, height)
    await board.loadBoardData(boardJson)

    // two.update();

}

main()