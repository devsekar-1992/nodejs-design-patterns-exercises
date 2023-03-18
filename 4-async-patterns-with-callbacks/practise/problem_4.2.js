/**
 * 1) Define the function name as listNestedFiles
 * 2) Pass params as dir name,callback
 * 3) List all subdirectory with async
 */
import { fstat, readdir, stat } from "fs";
import path from 'path'
let dirs = [];
let cnt = 0;
function listNestedFiles(dir, cb) {
    readdir(dir, {}, (readDirErr, readDirResult) => {
        if (readDirErr) {
            if (readDirErr.code !== 'ENOTDIR') {
                return cb(readDirErr, null);
            }
        } else {
            for (const file of readDirResult) {
                cnt++;
                listNestedFiles(path.join(dir, file), cb);
            }
            dirs.push(dir);
        }
        cnt--;
        process.nextTick(() => {
            if (!cnt) {
                return cb(null, dirs);
            }
        })
    });
}
listNestedFiles('4-async-patterns-with-callbacks', (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

