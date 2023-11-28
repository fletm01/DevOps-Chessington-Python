import { Board } from "./board.js"
import { getBoardData } from "./client.js";
import { SVG } from '@svgdotjs/svg.js'
import { buildImageCache } from "./image_loader.js";

async function main() {
    await buildImageCache()

    const width = 400, height = 400

    const draw = SVG().addTo('body').size(width, height)

    const board = new Board(draw, height)
    
    const boardJson = await getBoardData()
    await board.loadBoardData(boardJson)
}

main()