var obj = {
    name: "object",
    age: 10,
    weight: 5}
var sum = 0;
for ( var i in obj ){
        if( typeof(obj[i]) == "number" ){
        sum = sum + obj[i];
    }
}

console.log("sum :", sum);