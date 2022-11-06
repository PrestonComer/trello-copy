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
            ondrop="drop(event)" \
            ondragover="allowDrop(event)"> \
            <p class="listHeader"> \
                '+ listTitle +' \
            </p> \
        </div>'
    )
};

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

function allowDrop(e) {
    e.preventDefault();
}

$(document).ready(function() {
    $("#addListButton").on("click", addList);

    let dragindex=0;
    let dropindex=0;
    let clone="";
})