import { EventEmitter } from "events";
import { readFile } from "fs";

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }
  addFile(file) {
    this.files.push(file);
    return this;
  }
  find() {
    
    for (let file of this.files) {
      readFile(file, "utf8", (err, content) => {
        if (err) {
          return this.emit("error", err);
        }
        this.emit("fileRead", file);
        const match = content.match(this.regex);
        if (match) {
          match.forEach((elem) => this.emit("found", file, elem));
        }
      });
    }
    process.nextTick(()=>this.emit('start',this.files));
    return this;
  }
}
new FindRegex(/[Map]\w+/)
  .addFile("../async_sync.js")
  .find()
  .on('start',(ele)=>{console.log(ele);})
  .on('find-init',(data)=>console.log(data))
  .on("found", (file, match) =>
    console.log(`Matched ${match} on the file ${file}`)
  )
  .on("error", (err) => console.log(err));
