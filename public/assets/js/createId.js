
module.exports = function addId (arr) {
    for(var i=0; i<arr.length; i++){
        arr[i].id = i;
    }
}
