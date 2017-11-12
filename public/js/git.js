// Load JSON
// https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript
function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
};// end loadJSON

// https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
function loadFileAsText() { 	
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("gitFileTextArea").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function destroyClickedElement(event) {	document.body.removeChild(event.target); }

// Applies color scheme to text in div.
//  https://stackoverflow.com/questions/23737776/how-to-color-specific-word-in-a-container-using-css
function colorifyDiv(divName, replaceWord, replaceColor) {
  var replacere = new RegExp(replaceWord, "g");
  var str = document.getElementById(divName).innerHTML,
  str = str.replace(replacere, '<span style="color:' + replaceColor + ';">' + replaceWord + '</span>');
  // Clean up repeats and duplicates.
  str = str.replace('<span style="color:<span style="color:', '<span style="color:');
  str = str.replace('</span></span>','</span>');
  document.getElementById(divName).innerHTML = str;
}; // end colorifyDiv

function updateNewPageForm() {
	//Get new page name from element
  RepoUrlElement = "gitRepoUrl";
  Pagename = document.getElementById("NewPageNameInput").value;
  document.getElementById("PagenameEJSNameInput").value = "\\views\\pages\\template.ejs";
  document.getElementById("PagenameJSNameInput").value = Pagename + ".js";

  // Get each page from Github, populate textarea
  // updateTextAreaFromRepo("inputTextBoxFileName","divItemToRenameTo1stParam","inputTextBoxGitRepoURL","TextAreaToUpdate")
  updateTextAreaFromRepo("IndexJSNameInput","IndexJSNameItem",RepoUrlElement,"IndexJSTextArea");
  updateTextAreaFromRepo("TestJSNameInput","TestJSNameItem",RepoUrlElement,"TestJSTextArea");
  updateTextAreaFromRepo("NavEJSNameInput","NavEJSNameItem",RepoUrlElement,"NavEJSTextArea");
  updateTextAreaFromRepo("PagenameEJSNameInput","PagenameEJSNameItem",RepoUrlElement,"PagenameEJSTextArea");
  
  document.getElementById("PagenameEJSNameInput").value = Pagename + ".ejs";

  boilerplateDivTextArea("IndexJSTextArea","NewPageNameInput","//region WIP");
  var words = ["function","var","this","new","if","then"];
  colorifyDivTextArea('IndexJSTextArea',words);
}; // end updateNewPageForm

function updateNewPageBoilerplate() {  
  boilerplateDivTextArea("IndexJSTextArea","NewPageNameInput","//region WIP");
  boilerplateDivTextArea2("IndexJSTextArea","NewPageNameInput","t.plan(38);");
}; // end updateNewPageBoilerplate

function boilerplateDivTextArea(docTextArea,docNewName,splitMarker) {  
  var lineBreak = "\r\n"
  var spaceChar = " "
  //Insert boilerplate at line 10 for now - todo is add a line number textbox to each.
  docUpdateTextArea = document.getElementById(docTextArea).innerText;
  docNewPageName = document.getElementById(docNewName).value;
  // Customized for index.js
  docUpdateTextString = splitMarker + lineBreak + "app.get('/" + docNewPageName + "'," + spaceChar + "function(request, response)" + spaceChar + "{" + spaceChar + lineBreak + spaceChar + spaceChar + "response.render('pages/" + docNewPageName + "');" + spaceChar + lineBreak + "});" + spaceChar + spaceChar + lineBreak;
  document.getElementById(docTextArea).innerText = docUpdateTextArea.split(splitMarker)[0] + docUpdateTextString + docUpdateTextArea.split(splitMarker)[1];
}; // end boilerplateDivTextArea

function boilerplateDivTextArea2(docTextArea,docNewName,splitMarker) {  
  var lineBreak = "\r\n"
  var spaceChar = " "
  //Insert boilerplate at line 10 for now - todo is add a line number textbox to each.
  docUpdateTextArea = document.getElementById(docTextArea).innerText;
  docNewPageName = document.getElementById(docNewName).value;
  // Customized for index.js
  docUpdateTextString = splitMarker + lineBreak + "app.get('/" + docNewPageName + "'," + spaceChar + "function(request, response)" + spaceChar + "{" + spaceChar + lineBreak + spaceChar + spaceChar + "response.render('pages/" + docNewPageName + "');" + spaceChar + lineBreak + "});" + spaceChar + spaceChar + lineBreak;
  document.getElementById(docTextArea).innerText = docUpdateTextArea.split(splitMarker)[0] + docUpdateTextString + docUpdateTextArea.split(splitMarker)[1];
  "request('http://127.0.0.1:5000/" + newAppName + "', (error, response, body) => { \r\n  t.false(error); \r\n  t.equal(response.statusCode, 200);  \r\n  t.notEqual(body.indexOf('<title>Gilgamech Technologies</title>'), -1);  \r\n  t.notEqual(body.indexOf('Gilgamech Technologies'), -1);  \r\n});"
}; // end boilerplateDivTextArea

function colorifyDivTextArea(DivTextArea,words) {  
  var superGreen = "green";
  for (word of words) {
    colorifyDiv(DivTextArea, word, superGreen);
  };
}; // end colorifyDivTextArea

