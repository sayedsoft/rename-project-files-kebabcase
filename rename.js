const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { kebabCase } = require("lodash");

glob
  .sync("**/*", { ignore: "**/{coverage,node_modules}/**" })
  .forEach((filePath) => {
    const pathParts = filePath.split("/");
    const fileName = pathParts.pop();
    if (
      (fileName.toLowerCase() !== fileName &&
        fileName[0].toUpperCase() !== fileName[0]) ||
      fileName.includes("-")
    ) {
      const ext = path.extname(fileName);
      const newName = `${kebabCase(path.basename(fileName, ext))}${ext}`;
      let newPath = pathParts.concat(newName).join("/");

      if (fileName.includes("-")) {
        newPath = newPath.replace("-", ".");
      }
      console.log("Renaming...");
      console.log("Old", filePath);
      console.log("New", newPath);
      fs.renameSync(filePath, newPath);
      console.log("Renamed.");
    }
  });
