from __future__ import annotations
from abc import ABC, abstractmethod
from chessington.engine.data import Player, Square
from typing import TYPE_CHECKING, Any, List

if TYPE_CHECKING:
    from chessington.engine.board import Board

class Piece(ABC):
    """
    An abstract base class from which all pieces inherit.
    """

    def __init__(self, player: Player):
        self.player = player

    def to_json(self) -> dict[str, Any]:
        return {
            "piece": self.__class__.__name__,
            "player": self.player._name_.lower()
        }

    @abstractmethod
    def get_available_moves(self, board: Board) -> List[Square]:
        """
        Get all squares that the piece is allowed to move to.
        """
        pass

    def move_to(self, board: Board, new_square):
        """
        Move this piece to the given square on the board.
        """
        current_square = board.find_piece(self)
        board.move_piece(current_square, new_square)


class Pawn(Piece):
    """
    A class representing a chess pawn.
    """
   
    def get_available_moves(self, board) -> List[Square]:
        current_square = board.find_piece(self)
        if self.player == Player.BLACK:
            if current_square.row ==0:
                return[]            
            square_in_front = Square.at(current_square.row - 1, current_square.col)
            piece_on_square_in_front = board.get_piece (square_in_front)
            square_two_in_front = Square.at(current_square.row- 2, current_square.col)
            piece_on_square_two_in_front = board.get_piece (square_two_in_front)
            square_diagonal_right = Square.at(current_square.row - 1, current_square.col +1)
            piece_on_diagonal_right = board.get_piece (square_diagonal_right)
            can_take_right = piece_on_diagonal_right and piece_on_diagonal_right.player == Player.WHITE
            square_diagonal_left = Square.at(current_square.row - 1, current_square.col -1)
            piece_on_diagonal_left = board.get_piece (square_diagonal_left)
            can_take_left = piece_on_diagonal_left and piece_on_diagonal_left.player == Player.WHITE
            starting_row = 6
         

        else:
            if current_square.row==7:
                return[]
            square_in_front = Square.at(current_square.row + 1, current_square.col)
            piece_on_square_in_front = board.get_piece (square_in_front)
            square_two_in_front = Square.at(current_square.row + 2, current_square.col)
            piece_on_square_two_in_front = board.get_piece (square_two_in_front)
            square_diagonal_right = Square.at(current_square.row + 1, current_square.col +1)
            piece_on_diagonal_right = board.get_piece (square_diagonal_right)
            can_take_right = piece_on_diagonal_right and piece_on_diagonal_right.player == Player.BLACK
            square_diagonal_left = Square.at(current_square.row + 1, current_square.col -1)
            piece_on_diagonal_left = board.get_piece (square_diagonal_left)
            can_take_left = piece_on_diagonal_left and piece_on_diagonal_left.player == Player.BLACK
            starting_row = 1
        
        valid_moves = []

        if piece_on_square_in_front is None:
            valid_moves.append (square_in_front)
            if current_square.row == starting_row:
                if piece_on_square_two_in_front is None:
                    valid_moves.append (square_two_in_front)       
        if can_take_left:
            valid_moves.append (square_diagonal_left)
        if can_take_right:
            valid_moves.append (square_diagonal_right)
    
        return valid_moves
        

 
class Knight(Piece):
    """
    A class representing a chess knight.
    """

    def get_available_moves(self, board):
        return []


class Bishop(Piece):
    """
    A class representing a chess bishop.
    """

    def get_available_moves(self, board):
        return []


class Rook(Piece):
    """
    A class representing a chess rook.
    """

    def get_available_moves(self, board):
        return []


class Queen(Piece):
    """
    A class representing a chess queen.
    """

    def get_available_moves(self, board):
        return []


class King(Piece):
    """
    A class representing a chess king.
    """

    def get_available_moves(self, board):
        return []