from dataclasses import asdict
import json
from flask import Flask, render_template, request

from chessington.engine.board import Board
from chessington.engine.data import Square

app = Flask(__name__)

board = Board.at_starting_position()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/board-data')
def get_board():
    return json.dumps(board.to_json())

@app.route('/select-piece', methods=["POST"])
def select_piece():
    request_json = request.json
    clicked_square = Square(request_json['row_num'], request_json['column_num'])

    clicked_piece = board.get_piece(clicked_square)

    to_squares = []

    # If clicking on a piece whose turn it is, get its allowed moves
    if clicked_piece is not None and clicked_piece.player == board.current_player:
        to_squares = clicked_piece.get_available_moves(board)

    to_squares_json = [asdict(square) for square in to_squares]

    return json.dumps(to_squares_json)

@app.route('/move-piece', methods=["POST"])
def move_piece():
    request_json = request.json
    from_square = Square(request_json['from_square']['row_num'], request_json['from_square']['column_num'])
    target_square = Square(request_json['target_square']['row_num'], request_json['target_square']['column_num'])

    moving_piece = board.get_piece(from_square)

    # If clicking on a piece whose turn it is, get its allowed moves
    if moving_piece is not None and moving_piece.player == board.current_player:
        to_squares = moving_piece.get_available_moves(board)

        # If making an allowed move, then make it
        if target_square in to_squares:
            moving_piece.move_to(board, target_square)

    return json.dumps(board.to_json())