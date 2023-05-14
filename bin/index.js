import { renameSync } from "fs";
import { extname, basename } from "path";
import { sync } from "glob";
import pkg from "lodash";
const { kebabCase } = pkg;

sync("**/*", { ignore: "**/{coverage,node_modules}/**" }).forEach(
  (filePath) => {
    const pathParts = filePath.split("/");
    const fileName = pathParts.pop();
    if (
      (fileName.toLowerCase() !== fileName &&
        fileName[0].toUpperCase() !== fileName[0]) ||
      fileName.includes("-")
    ) {
      const ext = extname(fileName);
      const newName = `${kebabCase(basename(fileName, ext))}${ext}`;
      let newPath = pathParts.concat(newName).join("/");

      if (fileName.includes("-")) {
        newPath = newPath.replace("-", ".");
      }
      console.log("Renaming...");
      console.log("Old", filePath);
      console.log("New", newPath);
      renameSync(filePath, newPath);
      console.log("Renamed.");
    }
  }
);
