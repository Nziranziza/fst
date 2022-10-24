# Full Stack Tic Tac Toe(fst)
You will make an API that plays the game called tic-tac-toe in the US, and called naughts and crosses in some countries.

## Specifications

- [x] Your server will be provided the current board in a GET request, using the ‘board’ parameter in
the query string.
- [x] If the board string doesn't represent a valid tic-tac-toe board, or it’s not plausibly o’s turn, your
server should return an HTTP response code 400 (Bad Request)
- [x] Your server always plays as o.
- [x] Either player can go first.
- [x] If the board is a valid tic-tac-toe board and it is plausibly o's turn, your server should return a
string representation of the same board with one ‘o’ added.
- [x] If possible and time permits, your tic-tac-toe api should play optimally (i.e. never lose when it is
possible to force a tie, or tie when it is possible to win)
- [x] The best strategy is probably to search the game tree for winning moves
- [x] Here’s a case-by-case analysis of what to do, with a bent towards beating a human:
https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe
- [x] a (possibly?) useful xkcd: https://xkcd.com/832/

### Board representation
-  The board is encoded as a string of nine characters where each character is either ‘o’ (letter o),
‘x’, or a space. The nine characters are the tic-tac-toe board read left to right, top to bottom -- for
example:

x | o |&ensp;<br />
-+ - +-<br />
o |&ensp;&ensp;|&ensp;<br />
-+ - +-<br />
&ensp;| x |&ensp;<br />

would be encoded with the string "xo o x ", and an empty board would be a string of nine spaces.

#### Example

curl YOUR_URL?board=+xxo++o++
should get the exact string oxxo o (that’s o-x-x-o-space-space-o-space-space) as the entire contents of the HTTP response body

## Tools, Libraries and Framework used

- [x] ReactJs
- [x] NodeJS/ExpressJs
- [x] Fetch API
- [x] React toastify

## Installation

### Prerequisite

- NodeJs should be install on your system

### Steps for installation

- [ ] Git clone the repository
  ```bash
   git clone https://github.com/Nziranziza/fst.git
  ```
- [ ] Install dependencies
  ```bash
  npm i
  ```
- [ ] Start the application server
  ```
  npm start
  ```
- [ ] The app should be available on http://localhost:3000