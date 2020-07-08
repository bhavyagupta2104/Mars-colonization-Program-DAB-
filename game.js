function init(player, OPPONENT){
   
    const canvas = document.getElementById("cvs");
    const ctx = canvas.getContext("2d");


    let board = [];
    const COLUMN = 3;
    const ROW = 3;
    const SPACE_SIZE = 150;

    let gameData = new Array(9);
    let currentPlayer = player.man ;

    const xImage = new Image();
    xImage.src = "img/X.png";

    const oImage = new Image();
    oImage.src = "img/O.png";

    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let GAME_OVER = false;



    function drawBoard(){

        let id=0
        for(let i=0;i<ROW;i++){
            board[i]=[];
            for(let j=0 ; j < COLUMN ; j++){

                board[i][j] = id;
                id++;


                ctx.strokeStyle = "#000";
                ctx.strokeRect(j*SPACE_SIZE , i*SPACE_SIZE , SPACE_SIZE , SPACE_SIZE);
            }
        }
    }

    drawBoard();

    canvas.addEventListener("click",function(event){

        if(GAME_OVER) return;

        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;

        let i = Math.floor(Y/SPACE_SIZE);
        let j = Math.floor(X/SPACE_SIZE);

        let id = board[i][j];
        if(gameData[id]) return;

        gameData[id] = currentPlayer;
        console.log(gameData);

        drawOnBoard(currentPlayer,i,j);


        if(isWinner(gameData,currentPlayer)){
            showGameOver(currentPlayer);
            GAME_OVER = true;
            return;
        }

        if(isTie(gameData)){
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }

        currentPlayer = currentPlayer == player.man ? player.friend : player.man;

    });

    function isWinner(gameData,player){
        for( i =0 ; i< COMBOS.length ; i++){
            let won =true;

            for(let j=0; j<COMBOS[i].length ; j++){
                let id = COMBOS[i][j];
                won = gameData[id]==player && won;

            }

            if(won){
                return true;
            }
        }
        return false;
    }

    function isTie(gameData){
            let isBoardFill = true;
            for( let i=0; i <gameData.length ; i++){
                isBoardFill = gameData[i] && isBoardFill ;

            }
            if(isBoardFill){
                return true;
            }

            return false;

    }

    function showGameOver(player){
        let message = player == "tie" ? "Oops No Winner" : "The Winner is";
        let imgSrc = `img/${player}.png`;

        gameOverElement.innerHTML = `
            <h1>${message}</1>
            <img class="winner-img" src=${imgSrc} </img>
            <div class="play" onclick="location.reload()">Play Again!</div>
        `;

        gameOverElement.classList.remove("hide");
    }

    function drawOnBoard(player, i, j){
        let img = player == "X" ? xImage : oImage;

        ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE);
    }
}