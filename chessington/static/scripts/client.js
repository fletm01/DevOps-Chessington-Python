export async function getBoardData() {
    const jsonResponse = await fetch("/board-data")
    const jsonData = await jsonResponse.json()

    return jsonData
}