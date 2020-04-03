/**
 * This will expanf the replies section if it's closed
 * and close it if it is open whenever the user clicks the 
 * replies link. This will also expand and close the post text
 */

function expandCloseReplies(clickedAnchor) {
    var id = clickedAnchor.id[clickedAnchor.id.length - 1];
    var repliesDiv = document.getElementById("replies-outer-wrapper" + id);
    var postParagraph = document.getElementById("post-id-" + id);

    if (repliesDiv.style.display == 'block') {
        repliesDiv.style.display = 'none'
        postParagraph.className = 'limit-150'
    } else {
        repliesDiv.style.display = 'block'
        postParagraph.className = 'limit-150-alt'
    }
    
    console.log(id);
    document.getElementById
}

/**
 * This function is used to limit the number of characters displayed
 * per post. When a user exapnds the replies it will also 
 * display the entire topic text
 * @param {*} className 
 * @param {*} maxLength 
 */
function truncateText(className, maxLength) {
    var element = document.getElementsByClassName(className);
    console.log(element)

    for (var eachElement in element) {
        truncated = element[eachElement].innerText;

        if (!truncated){
            continue
        }

        if (truncated.length > maxLength) {
            element[eachElement].innerText= truncated.substr(0,maxLength) + '...';
        }
    }
}

/**
 * Paginate
 */
function paginate(button){
     //check which button is pressed first
     if (button.id == "btn-next") {
        fetch('/getArtists')
        .then((response) => response.json())
        .then((data) => {
            artistList = data;
            console.log(artistList.length)
        if (artistList.length <= 0 || artistList == null || artistList == undefined){
            var artistList = [];
        } else {
            for (var artist in artistList){
                 //Get List Div
                 artist = artistList[artist]
                 populatePage(artist)
            }
        }
        toggleInnerWrapperDiv();
        })
        .catch((err) => console.log(err));
     } else {

     }
 }
