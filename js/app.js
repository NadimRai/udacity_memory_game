let card_array = [].slice.call(document.querySelectorAll(".card"));
let deck = document.querySelector('.deck');


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

window.onload = init();
function init(){
    var shuffle_cards = shuffle(card_array);
    
    for (var i= 0; i < shuffle_cards.length; i++){ 
        var li = shuffle_cards[i]
        var icon = shuffle_cards[i].querySelector('i');
        li.id=icon.classList[1];
        deck.appendChild(li);
    }
}
