export function LoadPieceSvg(rect, piece, player) {
    const totalHeight = two.height
    const stepSize = totalHeight / 8
    const imageFileName = `${capitalizeFirstLetter(piece)}${capitalizeFirstLetter(player)}.svg`
    const imageLocation = `/static/images/${imageFileName}`

    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}