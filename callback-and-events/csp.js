//Sync CPS
function addCps(a,b,callback) {
    callback(a+b);
}
console.log("Before");
addCps(10,10,result=>console.log(result));
console.log("After");

//Async CPS
function addCpsAsync(a,b,callback) {
    setTimeout(()=>{callback(a+b);},100);
}
console.log("Before");
addCpsAsync(10,20,result=>console.log(result));
console.log("After");
