// This module creates an id so we can select each note when removing them from the htm page.
module.exports = function addId (arr) {
    for(var i=0; i<arr.length; i++){
        arr[i].id = i+1;
    }
}
