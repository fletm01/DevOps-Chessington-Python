const imageCache = {}

export async function buildImageCache() {
    const pieces = ["pawn", "rook", "knight", "bishop", "king", "queen"];
    for (const piece of pieces) {
        await loadPieceImage(piece, "white")
        await loadPieceImage(piece, "black")
    }
}

export async function loadPieceImage(piece, player) {
    const imageFileName = `${capitaliseFirstLetter(piece)}${capitaliseFirstLetter(player)}.svg`
    if (imageCache[imageFileName]) {
        return imageCache[imageFileName]
    }

    const imageLocation = `/static/images/${imageFileName}`

    const response = await fetch(imageLocation)
    const svgData = await response.text()
    imageCache[imageFileName] = svgData;

    return svgData
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}