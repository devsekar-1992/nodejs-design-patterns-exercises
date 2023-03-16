/**
 * Unpreditable function
 */
import {readFile} from 'fs';

const cache=new Map();

function inconsistentRead(fileName,cb){
    console.log(cache);
    if(cache.has(fileName)){
        cb(cache.get(fileName))
    } else {
        readFile(fileName,'utf8',(err,data)=>{
            cache.set(fileName,data)
            cb(data)
        });
    }
}
inconsistentRead('/home/isoaccess/Downloads/add-resources.css',(data)=>{
    console.log(data);
})