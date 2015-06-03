exports.capital = function(x){
    if(x === undefined){
      return "";
    }


    var name = [];
    var arrWord = x.split(" ")

    for(var i = 0; i < arrWord.length; i++ ){
        name.push(arrWord[i][0].toUpperCase() + arrWord[i].slice(1))
    }
  return name.join(" ") 
}