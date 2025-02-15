
function prewiew(){
    let thema = document.newArticle.newArticleThema.value;
    let tags = document.newArticle.newArticleTags.value;
    let content = document.newArticle.newArticleContent.value;
    let date = new Date();
    let currentDate = date.getUTCDate()+"."+date.getUTCMonth()+"."+date.getUTCFullYear()+" "+date.getUTCHours()+":"+date.getUTCMinutes();
    document.getElementById('newArticlePrewiew').innerHTML = 
    "<div class=\"eventt\">"+
	"<div id=\"articleTime\">" + currentDate + "</div>"+
	"<div class=\"about\">" + content + "</div>"+
    "<div class=\"tags\">" + tags + "</div>"+
	"</div>";
}

function placeImgShow(){
    document.getElementById('placeImg-style-before').style.display = "block";
}

function closePlaceImgWindow(){
    document.getElementById('placeImg-style-before').style.display = "none";
}

const placeImg = async () => {
    try {
        let link = document.getElementById('placeImgInput').value;
        let description = document.getElementById('placeImgInputTitel').value;
        let text =
        "<div id=\"imgDiv\">\n"+
            "<a href=\"" + link + "\">\n"+
                "<img src=\"" + link + "\" height=\"200\" title=\"" + description + "\" style=\"border: solid 1px gray\">\n"+
                "</a>\n"+
        "</div>\n";

        let textarea = document.newArticle.newArticleContent;
        // Отримуємо поточну позицію курсора
        let startPos = textarea.selectionStart;
        let endPos = textarea.selectionEnd;
        // Отримуємо текст до і після курсора
        let before = textarea.value.substring(0, startPos);
        let after = textarea.value.substring(endPos);
        // Вставляємо новий текст у поточну позицію курсора
        textarea.value = before + text + after;
        // Встановлюємо курсор після вставленого тексту
        let newCursorPos = startPos + text.length;
        await textarea.setSelectionRange(newCursorPos, newCursorPos);
        document.getElementById('placeImg-style-before').style.display = "none";
    } catch (error) {document.getElementById('newArticlePrewiew').innerHTML = error;}
}