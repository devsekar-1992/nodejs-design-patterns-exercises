/**
 * Steps for file concatenation
 * 1) Declare the function concatFiles as arg in rest parameters
 * 2) Check file access in src file
 * 3) Read all source file content and merge all content write to dest file
 */
import { access, constants, readFile, writeFile } from "fs";
function concatFiles(cb, ...srcFiles) {
  let fileContentJoin = "";
  for (const key in srcFiles) {
    if (Object.hasOwnProperty.call(srcFiles, key)) {
      const element = srcFiles[key];
      access(element, constants.F_OK, (err) => {
        if (err) {
          return cb(err, null);
        }
      });
      readFile(element, "utf8", (err, fileContent) => {
        if (err) {
          return cb(err, null);
        }
        fileContentJoin += fileContent;
        return cb(null, fileContentJoin);
      });
    }

  }

}
function writeToFile(dest, fileContent, cb) {
  writeFile(dest, fileContent, (err, res) => {
    if (err) {
      return err;
    }
    return res;
  });
}
concatFiles(
  (err, result) => {
    if (err) {
      console.log(err);
    }
    writeToFile("exercises/4.1/dest/dest.txt", result);
    console.log(result);
  },
  "exercises/4.1/src/file1.txt",
  "exercises/4.1/src/file2.txt"
);
