(function () {
    
var boards = document.querySelectorAll(".board"),
    counters = document.querySelectorAll(".counter"),
    rightArrowImg = document.querySelectorAll(".rightArrowImg"),
    leftArrowImg = document.querySelectorAll(".leftArrowImg"),
    deleteImg = document.querySelectorAll(".delete"),
    textAdd = document.getElementById("textAdd"),
    imgAdd = document.getElementById("imgAdd"),
    boardsArray = makeArray(boards);
    
    

function makeArray(nodeList) {
    
    var arr = [];
    
    for(var i = 0; i < nodeList.length; i++) {
        arr.push(nodeList[i]);
    }
    
    return arr;
}
    
function changeCounter() {
    
}
    
function valid() {
    
    var textAdd = document.getElementById("textAdd"),
        pass = false;
    
    if(textAdd.value === "") {
        alert("Wpisz coś bo error :(");
    }
    
    else {
        pass = true;
    }
    
    return pass;
}
    
function addItem() {
    
    var textAdd = document.getElementById("textAdd"),
        isValid = valid();
    
    if(isValid === true) {
        
        boardHeight("plus", 0);
        
        delayAndCreate(0, true, false);
    }    
}
    
function moveItem() {
    var boardNumber,
        itemValue = this.parentNode.previousElementSibling.value,
        grandParent = this.parentNode.parentNode;
    
    if(this.parentNode.parentNode.parentNode === boardsArray[0]) {
        boardNumber = 0;
    }
    else if(this.parentNode.parentNode.parentNode === boardsArray[1]) {
        boardNumber = 1;
    }    
    else if(this.parentNode.parentNode.parentNode === boardsArray[2]) {
        boardNumber = 2;
    }
    
    if(this.classList.contains("rightArrowImg")) {
        
            boardHeight("plus", (boardNumber+1));
            delayAndCreate(boardNumber, false, itemValue, "right");

        }
    else if(this.classList.contains("leftArrowImg")) {
        
            boardHeight("plus", (boardNumber-1));
            delayAndCreate(boardNumber, false, itemValue, "left");
    }
    
    /*delayAndCreate(boardNumber, false, itemValue, "left");*/
    
    grandParent.parentNode.removeChild(grandParent);
    
    boardHeight("minus", boardNumber);
}
      
function deleteItem() {
    
    var grandParent = this.parentNode.parentNode,
        boardNumber = 0;
    

    
    if(this.parentNode.parentNode.parentNode === boardsArray[0]) {
        boardNumber = 0;
    }
    else if(this.parentNode.parentNode.parentNode === boardsArray[1]) {
        boardNumber = 1;
    }    
    else if(this.parentNode.parentNode.parentNode === boardsArray[2]) {
        boardNumber = 2;
    }
    
    grandParent.parentNode.removeChild(grandParent);
    boardHeight("minus", boardNumber);
}
    
function boardHeight(char, boardNumber) {

    height = boardsArray[boardNumber].offsetHeight;
    if(char === "plus") {

        if(parseInt(counters[boardNumber].innerHTML, 10) === 0) {
            
            if(boardNumber === 0) {
                
                counters[boardNumber].innerHTML = parseInt(counters[boardNumber].innerHTML, 10) + 1;
                boardsArray[boardNumber].style.height = (height + 50).toString() + "px";
            }            
            if(boardNumber === 1) {
                
                counters[boardNumber].innerHTML = parseInt(counters[boardNumber].innerHTML, 10) + 1;   
            }            
            if(boardNumber === 2) {
                
                counters[boardNumber].innerHTML = parseInt(counters[boardNumber].innerHTML, 10) + 1; 
            }
            
        }
        else {
        
            counters[boardNumber].innerHTML = parseInt(counters[boardNumber].innerHTML, 10) + 1;
            boardsArray[boardNumber].style.height = (height + 50).toString() + "px";
        }
    }
    else {
        
        if(parseInt(counters[boardNumber].innerHTML, 10) === 1) {
            
            if(boardNumber === 0) {
                
                boardsArray[boardNumber].style.height = (height - 50).toString() + "px";
                counters[boardNumber].innerHTML = parseInt(counters[boardNumber].innerHTML, 10) - 1;
            }            
            if(boardNumber === 1) {
                
                counters[boardNumber].innerHTML = parseInt(counters[boardNumber].innerHTML, 10) - 1;   
            }            
            if(boardNumber === 2) {
                
                counters[boardNumber].innerHTML = parseInt(counters[boardNumber].innerHTML, 10) - 1; 
            }
            
        }
        else {
            
            boardsArray[boardNumber].style.height = (height - 50).toString() + "px";
            counters[boardNumber].innerHTML = parseInt(counters[boardNumber].innerHTML, 10) - 1;    
        }

        
         
    }
}
    
function delayAndCreate(boardNumber, isValid, itemValue, direction) {
    
    
    setTimeout(function() {
        
        createItem(boardNumber, isValid, itemValue, direction); 
    }, 51);  

    setTimeout(function() {

        var rightArrowImg = document.querySelectorAll(".rightArrowImg");
            
        makeArray(rightArrowImg);
            
        for(var i = 0; i < rightArrowImg.length; i++) {
            rightArrowImg[i].addEventListener("click", moveItem, false);
        }        
        
        var leftArrowImg = document.querySelectorAll(".leftArrowImg");
            
        makeArray(leftArrowImg);
            
        for(var i = 0; i < leftArrowImg.length; i++) {
            leftArrowImg[i].addEventListener("click", moveItem, false);
        }

        var deleteImg = document.querySelectorAll(".delete");
            
        makeArray(deleteImg);
            
        for(var i = 0; i < deleteImg.length; i++) {
            deleteImg[i].addEventListener("click", deleteItem, false);
        }
    }, 52);
}
    
function createItem(boardNumber, isValid, itemValue, direction) {
    
    var newItem = document.createElement('div'),
        newTarget = document.createElement('input'),
        newIcons = document.createElement('div'),
        newLeftArrow = document.createElement('img'),
        newRightArrow = document.createElement('img'),
        newDeleteImg = document.createElement('img'),
        add = document.getElementById("add");
  
        parentAdd = add.parentNode;
    
    
    newItem.classList.add("item");
    
    newTarget.classList.add("target");
    newTarget.classList.add("target--border-ToDo");
    
    newIcons.classList.add("icon");
    
    newRightArrow.setAttribute('src', 'icons/right-pointing-arrow.png');
    newRightArrow.setAttribute('alt', 'right arrow');
    newRightArrow.classList.add("rightArrowImg");
    
    newLeftArrow.setAttribute('src', 'icons/left-pointing-arrow.png');
    newLeftArrow.setAttribute('alt', 'left arrow');
    newLeftArrow.classList.add("leftArrowImg");
    
    newDeleteImg.setAttribute('src', 'icons/clear-button.png');
    newDeleteImg.setAttribute('alt', 'delete');
    newDeleteImg.classList.add("delete");

    
    
    newTarget.readOnly = true;
    
    newItem.appendChild(newTarget);
    newItem.appendChild(newIcons);
    
    
    if(boardNumber === 0 && isValid === true) {
        
        newTarget.value = textAdd.value;
        
        newIcons.appendChild(newRightArrow);
        newIcons.appendChild(newDeleteImg);
        
        boardsArray[0].insertBefore(newItem, add);
        
        textAdd.value = "";
    }
    else if(boardNumber === 0 && isValid === false) {
        
        boardsArray[1].appendChild(newItem);
        newTarget.value = itemValue;
        
        newTarget.classList.remove("target--border-ToDo");
        newTarget.classList.add("target--border-Doing");
        
        newIcons.appendChild(newLeftArrow);
        newIcons.appendChild(newRightArrow);
        newIcons.appendChild(newDeleteImg);
    }    
    else if(boardNumber === 1 && isValid === false) {
        if(direction === "right") {
            boardsArray[2].appendChild(newItem);
            newTarget.classList.remove("target--border-Doing");
            newTarget.classList.add("target--border-Done");
            newTarget.classList.add("target--complete");
            newIcons.appendChild(newLeftArrow);
        }
        else {
            boardsArray[0].insertBefore(newItem, add);
            newTarget.classList.remove("target--border-Doing");
            newTarget.classList.add("target--border-ToDo");
            newIcons.appendChild(newRightArrow);
        }
        
        newTarget.value = itemValue;
    
        newIcons.appendChild(newDeleteImg);
    }    
    else if(boardNumber === 2 && isValid === false) {
        
        boardsArray[1].appendChild(newItem);
        newTarget.value = itemValue;
        
        newTarget.classList.remove("target--border-Done");
        newTarget.classList.remove("target--complete");
        newTarget.classList.add("target--border-Doing");
        
        newIcons.appendChild(newLeftArrow);
        newIcons.appendChild(newRightArrow);
        newIcons.appendChild(newDeleteImg);
    }
}   
    
function keyDownAddItem(e) {
    
    var keyCode = e.keyCode;
    
    if(keyCode === 13)
        {
            addItem();
        }
    else{
        
    }
}    
    
makeArray(counters);
    
makeArray(rightArrowImg);
for(var i = 0; i < rightArrowImg.length; i++) {
    rightArrowImg[i].addEventListener("click", moveItem, false);
}
    
makeArray(leftArrowImg);
for(var i = 0; i < leftArrowImg.length; i++) {
    leftArrowImg[i].addEventListener("click", function() {alert("DZIAUA");}, false);
}
    
makeArray(deleteImg);
for(var i = 0; i < deleteImg.length; i++) {
    deleteImg[i].addEventListener("click", deleteItem, false);
}
    
imgAdd.addEventListener("click", addItem, false);
textAdd.addEventListener("keydown", keyDownAddItem, false);

    
})()