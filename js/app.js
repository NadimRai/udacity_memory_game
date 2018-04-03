//convert node list to array
let card_array = [].slice.call(document.querySelectorAll(".card"));
let deck = document.querySelector('.deck');

//For modal
let modal = document.querySelector('#completeModal');
let start_again = document.querySelector('.start_again');
let star_rating = document.querySelector('.star_rating');
let stars = '';

//For counting moves
let move = document.querySelector(".moves");
let move_counter = 0;

//For display time
let timer = document.querySelector('.timer');
let time_interval;

//For restarting the game
let restart = document.querySelector(".restart");

let list_open_cards = [];
let match_counter = 0;


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

//function for starting game
function init() {
    var shuffle_cards = shuffle(card_array);

    for (var i = 0; i < shuffle_cards.length; i++) {
        var li = shuffle_cards[i]
        var icon = shuffle_cards[i].querySelector('i');
        li.id = icon.classList[1];
        deck.appendChild(li);
        shuffle_cards[i].classList.remove("show", "open", "match", "disabled");
    }

    move_counter = 0;
    match_counter = 0;
    move.innerHTML = move_counter;
    sec = 0;
    timer.innerHTML = 'time';
    clearInterval(time_interval);
}

//function for checking if card matches or not
function openCard() {
    if(list_open_cards.length < 2 ){ 
        displayCard(this);
        if(list_open_cards.length === 0){
            list_open_cards.push(this);
         }else if(list_open_cards.length === 1){
            list_open_cards.push(this);
            moveCounter();
            if(list_open_cards[0].id === list_open_cards[1].id){
               match_counter+=2;
                matched();
                if(match_counter === card_array.length){
                    clearInterval(time_interval);
                    complete();
                }
            }else{
              unmatched();
            }
        }
    }
}

//function for displaying clicked card
function displayCard(card){
    card.classList.toggle('show');
    card.classList.toggle('open');
    card.classList.add('disabled');
}

//function for adding classes to matched card
function matched(){
    list_open_cards[0].classList.add("match", "disabled");
    list_open_cards[1].classList.add("match", "disabled");
    list_open_cards = [];
}

//function for adding and removing classes to cards that do not match
function unmatched(){
    list_open_cards[0].classList.add("unmatched");
    list_open_cards[1].classList.add("unmatched");

    setTimeout(function(){
        list_open_cards[0].classList.remove("show", "open", "unmatched","disabled");
        list_open_cards[1].classList.remove("show", "open", "unmatched","disabled");
        list_open_cards = [];
    },1100);
}

//function for counting moves
function moveCounter(){
    move_counter++;
    move.innerHTML = move_counter;
    if(move_counter === 1){
        displayTimer();
    }
    if(move_counter > 8 && move_counter <= 14){
        stars = '<span class="star_style"><i class="fa fa-star"></i></span>'+'<span class="star_style"><i class="fa fa-star"></i></span>';
    }
    if(move_counter > 14){
        stars = '<span class="star_style"><i class="fa fa-star"></i></span>';
    }
}

//function for timer - how many seconds
function displayTimer(){
    time_interval = setInterval(function(){
       sec++;
       timer.innerHTML = sec+"secs";
       
   },1000);
   
} 

//function for displaying modal when game is completed
function complete(){
    document.getElementById("totalMove").innerHTML = move_counter;
    document.getElementById("totalTime").innerHTML = timer.innerHTML;
    star_rating.innerHTML = "Rating "+ stars;
    modal.style.display = "block";
    match_counter = 0;
    clearInterval(time_interval);
}

//function for closing modal
function close(){
    modal.style.display = "none";
    init();
}


start_again.addEventListener('click', close);

restart.addEventListener('click', init);

for (var i = 0; i < card_array.length; i++) {
    card_array[i].addEventListener('click', openCard);
}