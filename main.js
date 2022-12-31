// Anonymous function to avoid mixing global stuff from window
(() => {
  window.onload = () => {
    //Player and AI move image :
    const player = document.getElementById("player_move");
    const ai = document.getElementById("ai_move");

    //Players and Ai Score :
    const player_score = document.getElementById("score_player");
    const ai_score = document.getElementById("score_ai");
    let [p_s, ai_s] = [0, 0];

    //Element to hide on begin :
    const moves = document.querySelectorAll(".move");
    const label_make_your_move = document.querySelector("#make_your_move");
    const label_pWon = document.querySelector("#label_pWinner");
    const label_aWon = document.querySelector("#label_aWinner");
    const rematch_game = document.querySelector("#container-rematch");

    //Element to animate :
    const wrapper_item = document.querySelector(".container-players-ai-moves");

    //Default image to show for each player :
    const default_move = "unknown";

    const AI_MOVES = ["paper", "rock", "scissors"];
    const ENUM_MOVES = {
      PAPER: "paper",
      ROCK: "rock",
      SCISSORS: "scissors",
    };
    let movesFound = [];

    function onBeginPlay() {
      //Check what the player take as move :
      moves.forEach((elem) => {
        //Fill the array
        movesFound.push(elem);

        //On Click :
        elem.addEventListener("click", async function () {
          /**
           * Check if the player has the default move
           * then he can pick a new move else he can't while the game is begin
           */
          if (player.name === default_move) {
            player.name = this.id;

            //Add some style to our selected move and hide the rest :
            onMoveSelected(elem, movesFound);

            //Load a random move for the AI :
            await loadTimerAIMove(5);

            //Player Move :
            onBeginGame(elem, this.id);

            //show Who Won
            showWinner();
          }
        });
      });
    }
    onBeginPlay();

    rematch_game.addEventListener("click", function () {
      this.style.display = "none";
      gameUIReset();
    });

    function gameUIReset() {
      movesFound = [];

      label_pWon.textContent = "";
      label_aWon.textContent = "";
      wrapper_item.style.animation = "slide 0.3s reverse ease-in-out";
      ai.src = `./assets/${default_move}.svg`;
      player.src = `./assets/${default_move}.svg`;
      player.name = default_move;
      ai.name = default_move;
      label_make_your_move.textContent = "Make your move";
      label_make_your_move.style.display = "block";
      moves.forEach((elem) => {
        elem.style.display = "flex";
        elem.style.scale = "1.0";
        elem.style.border = "none";
      });
      onBeginPlay();
    }

    const onMoveSelected = (elem, movesFound) => {
      const movesToHide = movesFound.filter((e) => e !== elem);
      movesToHide.forEach((toHide) => {
        toHide.style.display = "none";
      });

      elem.style.borderColor = "white";
      elem.style.scale = "1.3";
      elem.style.border = "0.1rem outset white";
      label_make_your_move.textContent = "Your Move";
    };

    const onBeginGame = (elem, imgName) => {
      label_make_your_move.style.display = "none";
      wrapper_item.style.animation = "slide 0.3s forwards ease-in-out";
      elem.style.display = "none";
      player.src = `./assets/${imgName}.svg`;
    };

    const showWinner = () => {
      const equality = player.name === ai.name;
      const won_by_paper =
        player.name === ENUM_MOVES.PAPER && ai.name === ENUM_MOVES.ROCK;
      const won_by_rock =
        player.name === ENUM_MOVES.ROCK && ai.name === ENUM_MOVES.SCISSORS;
      const won_by_scissors =
        player.name === ENUM_MOVES.SCISSORS && ai.name === ENUM_MOVES.PAPER;

      if (equality) {
        rematch_game.style.display = "block";
        label_pWon.style.animation = "fadeWon 0.6s forwards ease-in-out";
        label_aWon.style.animation = "fadeWon 0.6s forwards ease-in-out";
        label_pWon.textContent = "TIE";
        label_aWon.textContent = "TIE";
      } else if (won_by_paper) {
        p_s += 1;
        player_score.textContent = p_s;
        label_pWon.style.animation = "fadeWon 0.6s forwards ease-in-out";
        label_pWon.textContent = "YOU WON !";
        rematch_game.style.display = "block";
      } else if (won_by_rock) {
        p_s += 1;
        player_score.textContent = p_s;
        label_pWon.style.animation = "fadeWon 0.6s forwards ease-in-out";
        label_pWon.textContent = "YOU WON !";
        rematch_game.style.display = "block";
      } else if (won_by_scissors) {
        p_s += 1;
        player_score.textContent = p_s;
        label_pWon.style.animation = "fadeWon 0.6s forwards ease-in-out";
        label_pWon.textContent = "YOU WON !";
        rematch_game.style.display = "block";
      } else {
        ai_s += 1;
        ai_score.textContent = ai_s;
        label_aWon.style.animation = "fadeWon 0.6s forwards ease-in-out";
        label_aWon.textContent = "AI WON !";
        rematch_game.style.display = "block";
      }
    };

    const getRandomMove = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };

    const loadTimerAIMove = (time) => {
      const LoadRandomIMGIA = () => {
        const randomMove = getRandomMove(0, 3);
        ai.src = `./assets/${AI_MOVES[randomMove]}.svg`;
        ai.name = AI_MOVES[randomMove];
      };

      const interval = setInterval(() => time--, 1000);
      const interval2 = setInterval(LoadRandomIMGIA, 190);
      const one = promiseSetTimeout(() => clearInterval(interval), time * 1000);
      const two = promiseSetTimeout(
        () => clearInterval(interval2),
        time * 1000
      );
      return Promise.all([one, two]);
    };

    const promiseSetTimeout = (fun, time) => {
      return new Promise((resolve) =>
        setTimeout(() => [fun, resolve].forEach((x) => x.call()), time)
      );
    };
  };
})();
