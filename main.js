// Anonymous function to avoid mixing global stuff from window
(() => {
  window.onload = () => {
    //Player and AI move image :
    const player = document.getElementById("player_move");
    const ai = document.getElementById("ai_move");

    //container of moves
    const container_of_moves = document.querySelector(".container-moves");

    //Players and Ai Score :
    const player_score = document.getElementById("score_player");
    const ai_score = document.getElementById("score_ai");

    //Element to hide on begin :
    const moves = document.querySelectorAll(".move");
    const label_make_your_move = document.querySelector("#make_your_move");

    //Element to animate :
    const wrapper_item = document.querySelector(".container-players-ai-moves");

    const default_move = "unknown";

    const AI_MOVES = ["paper", "rock", "scissors"];
    const ENUM_MOVES = {
      PAPER: 0,
      ROCK: 1,
      SCISSORS: 2,
    };
    const movesFound = [];

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

          elem.style.borderColor = "white";
          const movesToHide = movesFound.filter((e) => e !== elem);
          movesToHide.forEach((toHide) => {
            toHide.style.display = "none";
          });

          elem.style.scale = "1.3";
          elem.style.border = "0.1rem outset white";
          label_make_your_move.textContent = "Your Move";

          //Load a random move for the AI :
          await loadTimerAIMove(5);

          //Player Move :
          label_make_your_move.style.display = "none";
          wrapper_item.style.animation = "slide 0.3s forwards ease-in-out";
          elem.style.display = "none";
          player.src = `./assets/${this.id}.svg`;
        }
      });
    });

    const getRandomMove = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };

    const loadTimerAIMove = (time) => {
      const tick = () => {
        time--;
      };

      const LoadRandomIMGIA = () => {
        const randomMove = getRandomMove(0, 3);
        ai.src = `./assets/${AI_MOVES[randomMove]}.svg`;
      };

      const interval = setInterval(tick, 1000);
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
