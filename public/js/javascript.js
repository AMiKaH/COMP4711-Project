
/**
 * This will expand the replies section if it's closed
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

    initSessionVar();

    //check which button is pressed first
    if (button.id == "btn-next") {
        sessionStorage.setItem("pageNum", parseInt(sessionStorage.getItem("pageNum")) + 1)
        
        let pageNum = parseInt(sessionStorage.getItem("pageNum"))
        
        fetch('/paginator?pageNum=' + pageNum)
        .then((res) => res)  
        .then((data) => {
                console.log(data)

        })
        .catch((err) => console.log(err));

    } else {
        sessionStorage.setItem("pageNum", parseInt(sessionStorage.getItem("pageNum")) - 1)
        console.log(sessionStorage.getItem("pageNum"))
        let pageNum = parseInt(sessionStorage.getItem("pageNum"))

        fetch('/paginator?pageNum=' + pageNum)
        .then((res) => res)  
        .then((data) => {
            location.reload();

        })
        .catch((err) => console.log(err));
    }

    if (parseInt(sessionStorage.getItem("pageNum")) > 0) {
        document.getElementById("post-previous").style.display = 'inline-block'
    } else {
        document.getElementById("post-previous").style.display = 'none'
    }
     
 }

 function initSessionVar() {
    if (sessionStorage.pageNum == null) {
        sessionStorage.pageNum = parseInt(0);
    } 
}