import { EventEmitter } from "events"

function ticker(number, callback) {
  const emitter = new EventEmitter()

  recursion(number, emitter, 1, callback)

  return emitter
}

function recursion(number, emitter, ticks, callback) {
    let timeStamp=Date.now();
    if(timeStamp%5!=0){
        process.nextTick(()=>emitter.emit('error_in_timestamp','error'));
        return callback('error in timestamp',ticks);
    }
  if (number <= 0) {
    return callback(null, ticks)
  }
process.nextTick(()=>    emitter.emit("tick"));
  setTimeout(() => {

    return recursion(number - 50, emitter, ticks + 1, callback)
  }, 50)
}

ticker(1000, (_err, ticks) =>{
if(_err){
    console.log(_err);
}
  console.log(`Emitted ${ticks} ${ticks > 1 ? "ticks" : "tick"}.`);
}
).on("tick", () => console.log("Tick")).on('error_in_timestamp',(err)=>console.log(err));