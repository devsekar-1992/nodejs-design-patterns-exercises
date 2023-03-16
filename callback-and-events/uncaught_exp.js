import { readFile } from 'fs';
function readJsonFile(fileName,callback) {
    readFile(fileName,'utf8',(err,data)=>{
        if(err){
            return callback(err);
        }
        callback(null,data);
    });
}

readJsonFile(
    'data/tesst.json',(err)=>console.log(err
));