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

//document.getElementsByClassName("limit-150").innerText = truncateText('limit-150', 150);