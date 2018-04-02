let card_array = [].slice.call(document.querySelectorAll(".card"));
let deck = document.querySelector('.deck');

let list_open_cards = [];


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

function init() {
    var shuffle_cards = shuffle(card_array);

    for (var i = 0; i < shuffle_cards.length; i++) {
        var li = shuffle_cards[i]
        var icon = shuffle_cards[i].querySelector('i');
        li.id = icon.classList[1];
        deck.appendChild(li);
        shuffle_cards[i].classList.remove("show", "open", "match", "disabled");
    }
}

function openCard() {
    if(list_open_cards.length < 2 ){ 
        displayCard(this);
        if(list_open_cards.length === 0){
            list_open_cards.push(this);
         }else if(list_open_cards.length === 1){
            list_open_cards.push(this);
            if(list_open_cards[0].id === list_open_cards[1].id){
                matched();
            }else{
              unmatched();
            }
        }
    }
}

function displayCard(card){
    card.classList.toggle('show');
    card.classList.toggle('open');
}

function matched(){
    list_open_cards[0].classList.add("match", "disabled");
    list_open_cards[1].classList.add("match", "disabled");
    list_open_cards = [];
}

function unmatched(){
    list_open_cards[0].classList.add("unmatched");
    list_open_cards[1].classList.add("unmatched");

    setTimeout(function(){
        list_open_cards[0].classList.remove("show", "open", "unmatched");
        list_open_cards[1].classList.remove("show", "open", "unmatched");
        list_open_cards = [];
    },1100);
}

for (var i = 0; i < card_array.length; i++) {
    card_array[i].addEventListener('click', openCard);
}