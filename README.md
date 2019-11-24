# mars-rover-kata

# H1 how to "play"
1) in build.js: create your planet (board) declaring a new object instance:
new Planet( [Probe name as string], [number of board's row], [number of board's columns], [probability of obstacle as a two-digit integer] )
for instance:
`const mars = new Planet( 'mars', 10, 10, 30 )`

2) create your rover (player) declaring a new object instance and game options.
for instace:
`const curiosity = new Rover ('curiosity', mars, options)`

3) move your rover with the `.inputCommands()` method:
for instance:
`curiosity.inputCommands('rfffbbfffrfflfbll', 'f', 'r')`

# H1 status:
1 to 5 iterations - done.
1 to 4a challenges - done.

# H2 to-do:
- make rover be deployed in random position
- bonus 4b: other rovers // 
- improve parsion of probability validation.
- getter for more interesting logs.
- render an actual board with an path.

# H2 bugs:
- The rover might be 'deployed' over an obstacle and it is ignored.