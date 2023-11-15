import json
from flask import Flask, render_template

from chessington.engine.board import Board

app = Flask(__name__)

board = Board.at_starting_position()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/board-data')
def get_board():
    return json.dumps(board.to_json())