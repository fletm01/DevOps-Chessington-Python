export async function getBoardData() {
    const response = await fetch("/board-data")
    const responseJson = await response.json()

    return responseJson
}

export async function postPieceSelect(rowNum, columnNum) {
    const response = await fetch("/select-piece", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        row_num: rowNum,
        column_num: columnNum
      }),
    })

    const responseJson = await response.json()

    return responseJson
}

export async function postPieceMove(fromSquareRow, fromSquareColumn, targetSquareRow, targetSquareColumn) {
    const response = await fetch("/move-piece", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_square: {
            row_num: fromSquareRow,
            column_num: fromSquareColumn
        },
        target_square: {
            row_num: targetSquareRow,
            column_num: targetSquareColumn
        }
      }),
    })

    const responseJson = await response.json()

    return responseJson
}
