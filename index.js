
const jogador1Input = document.getElementById('jogador1');
const jogador2Input = document.getElementById('jogador2');


const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
];

let jogo=document.getElementsByClassName('cell')
let player=document.getElementById("player")
const cells = document.querySelectorAll('.cell');
let iniciar=document.getElementById('iniciar')
let board= document.getElementById('board')
let rodada=document.getElementById('rodada')

let jogador= document.getElementById('jogador')
jogador='X'

cells.forEach(cell => {
    cell.addEventListener("click", function() {
        if (!this.textContent) {
            this.textContent = jogador;
            
            const winner = checkWinner();
            if(winner) {
                const winnerName = winner === 'X' 
                    ? jogador1Input.value || 'Jogador 1' 
                    : jogador2Input.value || 'Jogador 2';
                setTimeout(() => {
                    alert(`${winnerName} venceu!`);
                    resetGame();
                }, 10);
                return;
            }
            
            if(checkTie()) {
                setTimeout(() => {
                    alert("Empate!");
                    resetGame();
                }, 10);
                return;
            }
            
         
            jogador = jogador === 'X' ? 'O' : 'X';
            jogadorDaVez();
        }
    });
});


function jogadorDaVez() {
    const nome = jogador === 'X' 
        ? jogador1Input.value || 'Jogador 1' 
        : jogador2Input.value || 'Jogador 2';
    player.innerText = `Vez do ${nome} (${jogador})`;
}



// Função para verificar vitória
function checkWinner() {
    for(let combo of winningCombos) {
        const [a, b, c] = combo;
        if(cells[a].textContent && 
           cells[a].textContent === cells[b].textContent && 
           cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent; // Retorna 'X' ou 'O'
        }
    }
    return null;
}

// Função para verificar empate
function checkTie() {
    return [...cells].every(cell => cell.textContent) && !checkWinner();
}

// Modifique o event listener das células para ficar assim:
cells.forEach(cell => {
    cell.addEventListener("click", function() {
        if (!this.textContent) {
            this.textContent = jogador;
            
            // Verificar vitória/empate após cada jogada
            const winner = checkWinner();
            if(winner) {
                const winnerName = winner === 'X' ? jogador1.value || 'Jogador 1' : jogador2.value || 'Jogador 2';
                alert(`${winnerName} venceu!`);
                resetGame();
                return;
            }
            
            if(checkTie()) {
                alert("Empate!");
                resetGame();
                return;
            }
            
            jogador = jogador === 'X' ? 'O' : 'X';
            jodaorDaVez();
        }
    });
});

// Adicione a função de reset (básica)
function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    jogador = 'X';
    player.innerText = "Partida reiniciada";
}



iniciar.addEventListener('click', function(ev) {
    // Obter os elementos de input corretamente
    const jogador1Input = document.getElementById('jogador1'); // Ou usar querySelector
    const jogador2Input = document.getElementById('jogador2');
    
    // Obter os valores dos inputs 
    // trim para ignorar espaçoes em branco
    const jogador1 = jogador1Input.value.trim();
    const jogador2 = jogador2Input.value.trim();

    // Verificar se os campos estão preenchidos
    if(jogador1 === '' || jogador2 === '') {          
        alert("Jogadores não declarados!");
        return; // Interrompe a execução se a validação falhar
    }

    // Atualizar a interface (supondo que exista um elemento com id 'player')

    if(player) {
        player.innerText = "Partida iniciada: " + jogador1 + " vs " + jogador2;
    }
});
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Limpa classes CSS
    });
    jogador = 'X';
    player.innerText = `Partida reiniciada: ${jogador1Input.value} vs ${jogador2Input.value}`;
}