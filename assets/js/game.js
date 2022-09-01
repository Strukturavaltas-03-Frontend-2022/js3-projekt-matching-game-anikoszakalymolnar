let oneCard=null;
let twoCard=null;

function flipCard() {
let clickedCard = this;
    if(oneCard === clickedCard) return;
    if(oneCard !== null && twoCard!==null) return;
    if(oneCard === null)
    {
        oneCard = clickedCard;
        clickedCard.classList.toggle("flipCard");
    }
    else
    {
        twoCard = clickedCard;
        clickedCard.classList.toggle("flipCard");
    }

    if(oneCard !== null && twoCard !== null)
    {
       
       let oneSign =  oneCard.dataset.sign;
        let twoSing =  twoCard.dataset.sign;

        if(oneSign === twoSing)
        {
            matchCards();
        }
        else{
            setTimeout(hideSelectedCard, 1000);
        }
    }   
}

function hideSelectedCard(){
    oneCard.classList.toggle("flipCard");
    twoCard.classList.toggle("flipCard");
    oneCard=null;
    twoCard=null;
}

function matchCards()
{
    oneCard.removeEventListener('click',flipCard);
    twoCard.removeEventListener('click',flipCard);
    oneCard=null;
    twoCard=null;
}

function initBoard() {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

initBoard();