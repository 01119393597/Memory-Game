document.querySelector(".control-buttons span").onclick = function() {
    let yourName = prompt("Whats Your Name?");
    // if the name is empty
    if(yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';
    } 
    else { 
        // set your name 
        document.querySelector(".name span").innerHTML = yourName;
    }
    // remove splash screen
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;

// create array from game blocks
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

// create range of keys
//let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

shafele(orderRange)

// add order css property to game block 
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    // add click event 
    block.addEventListener("click", function() {
        flipBlock(block);
    });
});

// flip block function 
function flipBlock(selecedBlock) {

    // add class is-flipped
    selecedBlock.classList.add('is-flipped');

    // collect all flipped cards
    let allFlippedBlocks = blocks.filter(flipdBlock => flipdBlock.classList.contains("is-flipped"));
    // if there is two selected blocks 
    if(allFlippedBlocks.length === 2) {

        // stop clicking function
        stopClicking();

        // check matched block function
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}

// stop clicking function
function stopClicking() {

    // add class no clicking on main container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        // remove class stop no clicking after the duration
        blocksContainer.classList.remove('no-clicking');


    }, duration);
}

 // ckeked matched block
function checkMatchedBlock(fristBlock, secondBlock) {
    
    let triesElement = document.querySelector('.tries span');

    if(fristBlock.dataset.technology === secondBlock.dataset.technology) {
    
        fristBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        fristBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    }
     else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

      setTimeout(() => {

        fristBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        
      }, duration);

    }
}

// shafele function 
function shafele(array) {
    // setting vars
    let current = array.length,
    temp,
    random;

    while(current > 0) { 
        // get random number
        random = Math.floor(Math.random() * current);
         
        // decrease length by one 
        current--;

        // [1]save the current element in stash
        temp = array[current];

       // [2]current elemnt = random element 
       array[current] = array[random];

       // [3]random element = get element from stash
       array[random] = temp;
    }
    return array;
}
