import Bingo from "./bingo.js";

export default class Card {
    constructor(title) {

        this.title = title;
        console.log(`Created a new card with title: ${title}`);
    }

    markDone(target) {

        console.log("Marking card as done");
        console.log(target);

        target.classList.toggle("bingo__card--done");
    }
    render(counter) {

        console.log("Rendering card...");

        let card = document.createElement("div");
        card.classList.add("bingo__card");
        card.setAttribute("data-number", counter + 1);
        card.innerHTML = this.title;
        document.querySelector(".bingo__board").appendChild(card);

        card.addEventListener("click", (e) => {
            this.markDone(e.target);

            Bingo.checkWinner();
            Bingo.save();

            if (document.querySelectorAll(".bingo__card--done").length > 5) {
                e.target.classList.remove("bingo__card--done");
            }
        });
    }
}
