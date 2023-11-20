export async function loadPieceImage(piece, player) {
    const imageFileName = `${capitalizeFirstLetter(piece)}${capitalizeFirstLetter(player)}.svg`
    const imageLocation = `/static/images/${imageFileName}`

    const response = await fetch(imageLocation)
    const svgData = await response.text()

    return svgData
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}