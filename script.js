function addList() {
    var listTitle = prompt("Enter New List Title:");

    $("#addListButton").before(
        '<div class="lists">\
            <p class="listHeader">'
                + listTitle +
            '</p>\
        </div>'
    )
};

$(document).ready(function() {
    $("#addListButton").on("click", addList);
})