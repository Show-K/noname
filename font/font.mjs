import fs from "fs/promises";
import path from "path";
import ttf2woff2 from "ttf2woff2";
import url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
fs.readdir(__dirname, "utf-8").then(value => Promise.all(value.map(async nameExt => {
	const pathFile = path.join(__dirname, nameExt);
	const pathParsedFile = path.parse(pathFile);
	if (pathParsedFile.ext.toUpperCase() == ".TTF") return fs.readFile(pathFile).then(value => fs.writeFile(path.join(__dirname, `${pathParsedFile.name}.woff2`), ttf2woff2(value)));
})));