# mars-rover-kata

# H1 como usar:
1) crie o seu tabuleiro declarando uma nova instancia de objeto.
new Planet( string com nome da sonda, quantidade de linhas, quantidade de colunas, probabilidade de obstaculos - numero de 0 a 100 );
p. ex.:
const mars = new Planet( 'mars', 10, 10, 30 )

2) crie sua sonda com o nome da sonda (string) e o planeta em que ela esta (objeto).
p. ex.:
const curiosity = new Rover( 'curiosity', mars )

3) mova sua sonda usando: [rover-name].inputcommands();
inputs validos: f, b, r, l. podem ser passados como:
a) 'ffffbbb'
b) 'f', 'b', 'r', ...
ou qualquer combinacao das duas

# H2 Intro
Eu tentei organizar sempre pensando em como tornar o código reutilizável e fácil de entender. Tentei utilizar as coisas que eu aprendi no material da Ironhack e também no que eu já tinha estudado pelo codeAcademy. Por favor, não deixem de me explicar o que não faz sentido na forma de organizar, maus hábitos, etc... Obrigado!



# H1 status:
iterações de 1 até 5 concluídas.
bonus de 1 até 3 concluídas.
leia-me tem orientacoes de obstaculos no Planet, mas ainda nao esta funcionando!

# H2 to-do:
- bonus 4: obstáculos
- make rover be deployed in random position
  - melhorar validacao de input da probabilidade. Atual: 2 digitos. Nada impede outros valores.
- bonus 4: other rovers // 
- getters interessantes. p.ex.: status, ou um travel log mais legal..

# H2 bugs:
- The rover might be 'deployed' over an obstacle and it is ignored.

method ._checkColision()
how to make many players move at the same time?
