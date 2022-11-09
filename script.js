function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addList() {
    var numOfLists = ($(".lists").length + 1).toString();

    // var listTitle = prompt("Enter New List Title:");
    var listTitle = "List Title Placeholder";
    listTitle = listTitle ? listTitle : "No Title Given";

    $("#addListButton").before(
        '<div \
            id="'+ listTitle.replace(/\s/g, "") + numOfLists + '" \
            class="lists box" \
            draggable="true" \
            ondragstart="drag(event)" \
            ondrop="dropCards(event)" \
            ondragover="allowDrop(event)"> \
            <p class="listHeader"> \
                '+ listTitle +' \
            </p> \
            <a class="listDropdown"></a>\
            <div class="addCardButton">Add a card</div>\
        </div>'
    );
    $("#" + listTitle.replace(/\s/g, "") + numOfLists + " > div.addCardButton").on("click", addCard);
    $(".listDropdown").on("click", openModal);
    
};

function addCard() {
    var numOfCards = ($(".cards").length + 1).toString();

    // var cardTitle = prompt("Enter New List Title:");
    var cardTitle = "Card Title Placeholder";
    cardTitle = cardTitle ? cardTitle : "No Title Given";

    $(this).before(
        '<div \
            id="'+ cardTitle.replace(/\s/g, "") + numOfCards + '" \
            class="cards box" \
            draggable="true" \
            ondrop="dropCards(event)" \
            style="background-color: ' + getRandomColor() + ';">\
            <p class="cardHeader"> \
                '+ cardTitle +' \
            </p> \
        </div>'
    );
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function dropCards(e) {
    var destination = e.target.parentNode;
    var source = document.getElementById(e.dataTransfer.getData("Text"));

    if (destination.classList.contains("lists") && (source.classList.contains("lists")) || destination.classList.contains("cards") && source.classList.contains("cards")) {
        // This puts the source infront of the destination
        destination.parentNode.insertBefore(source.cloneNode(true), destination);
        // This puts the destination where the source was
        source.parentNode.insertBefore(destination.cloneNode(true), source)
        source.remove();
        destination.remove();
    }
}

function allowDrop(e) {
    e.preventDefault();
}

function openModal() {
    $("#myModal").css("display", "block");
}
function closeModal() {
    $("#myModal").css("display", "none");
}

$(document).ready(function() {
    $("#addListButton").on("click", addList);
    $(".addCardButton").on("click", addCard);
    $(".listDropdown").on("click", openModal);
    $(".close").on("click", closeModal);

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == $("#myModal")) {
            $("#myModal").style.display = "none";
        }
    }

    let dragindex=0;
    let dropindex=0;
    let clone="";

    // // Get the modal
    // var modal = document.getElementById("myModal");

    // // Get the button that opens the modal
    // // listDropdown
    // var btn = document.getElementById("myBtn");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];
})