function addList() {
    var numOfLists = $(".lists").length + 1;
    numOfLists = numOfLists.toString();

    var listTitle = prompt("Enter New List Title:");
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
            <div class="addCardButton">Add a card</div>\
        </div>'
    );
    $("#" + listTitle.replace(/\s/g, "") + numOfLists + " > div.addCardButton").on("click", addCard);
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addCard() {
    var numOfCards = $(".cards").length + 1;
    numOfCards = numOfCards.toString();

    // var cardTitle = prompt("Enter New List Title:");
    // cardTitle = cardTitle ? cardTitle : "No Title Given";
    var cardTitle = "Test";
    var newId = cardTitle.replace(/\s/g, "") + numOfCards;
    $(this).before(
        '<div \
            id="'+ newId + '" \
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

function drop(e) {
    e.preventDefault();
    clone = e.target.cloneNode(true);
    let data = e.dataTransfer.getData("text");
    if (clone.id !== data) {
        let nodelist = document.getElementById("board").childNodes;
        for (let i=0;i<nodelist.length;i++) {
            if(nodelist[i].id==data) {
                dragindex=i;
            }
        }
        document.getElementById("board").replaceChild(
            document.getElementById(data),e.target
        );
        document.getElementById("board").insertBefore(
            clone,
            document.getElementById("board").childNodes[dragindex]
        );
    }
}

function dropCards(e) {
    var destination = e.target.parentNode;
    var source = $("#"+e.dataTransfer.getData("Text"));

    console.log("destination", destination);
    console.log("source", source);

    if (destination.classList.contains("lists") && (source.hasClass("lists"))) {
        console.log("Swapping Lists");
    }
    if (destination.classList.contains("cards") && (source.hasClass("cards"))) {
        console.log("Swapping Cards");
    }
    // console.log(destination.parentNode);
    // let clone = destination.cloneNode(true);

    // destination.parentNode.replaceChild(
    //     destination,
    //     document.getElementById(e.dataTransfer.getData("Text"))
    // )

    // console.log("destination", destination);
    // console.log("source", source)

    // var nodeA = e.target;
    // var nodeB = document.getElementById(e.dataTransfer.getData("Text"));
    // var siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // // Move `nodeA` to before the `nodeB`
    // nodeB.parentNode.insertBefore(nodeA, nodeB);

    // // Move `nodeB` to before the sibling of `nodeA`
    // parentA.insertBefore(nodeB, siblingA);
}

function allowDrop(e) {
    e.preventDefault();
}

$(document).ready(function() {
    $("#addListButton").on("click", addList);
    $(".addCardButton").on("click", addCard);

    let dragindex=0;
    let dropindex=0;
    let clone="";
})