# Chessington

Starter project for a chess-based TDD exercise.

## Running the application

To run the application, first ensure that you have installed Poetry on your system. Install
dependencies using the command ``poetry install``.

To run the application, use the command ``poetry run flask run`` and navigate to http://localhost:5000. You can reset the board at any time by restarting the server.

Clicking on one of the white pieces will highlight the square that piece is on, and also show you the squares it can move to. Except...

None of the rules of chess have been implemented yet! That's your job :)

## Running the tests

To run the tests, use the command `poetry run pytest tests`. This will search the "tests" directory for files starting in `test_` or ending in `_test`. Inside those files, any function starting with `test_` will be considered a test.

## Debugging

VSCode debug config has been set up, but you will need to select your virtual environments python interpreter
before running either the tests or app in debug mode. You can do this in VS Code by going to `View`->`Command Palette`,
searching for `Python: Select Interpreter` and then browse your machine to find the appropriate python executable
(e.g. `.venv\Scripts\python.exe` or `.venv\Scripts\python`)

## During the Workshop

Once you have the app and tests running start on the [workshop instructions](./during_the_workshop.md).
