export async function loadPieceImage(piece, player) {
    const imageFileName = `${capitaliseFirstLetter(piece)}${capitaliseFirstLetter(player)}.svg`
    const imageLocation = `/static/images/${imageFileName}`

    const response = await fetch(imageLocation)
    const svgData = await response.text()

    return svgData
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}