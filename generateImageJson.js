import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

//directory where images are
const imagesDir = path.join(__dirname, "public/gallery");

//output json file path
const outputJsonPath = path.join(__dirname, "src/assets/gallery.json");

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateImageJson = async () => {
  try {
    //read files in the directory
    const files = await fs.readdir(imagesDir);

    const imageSet = new Set(
      files.filter(
        (file) =>
          /\.(jpg|jpeg|png|gif)$/i.test(file) &&
          !file.toLocaleLowerCase().includes("copy")
      )
    );

    //map files in json structure
    let imagesData = Array.from(imageSet).map((file) => {
      const fileNameWithoutExt = path.parse(file).name; // Remove extension
      const parts = fileNameWithoutExt.split("-");
      let category;
      if (parts[0] === "art") {
        category = "nail art";
      } else if (parts[0] === "enhancement") {
        category = "nail enhancement";
      } else {
        category = parts[0];
      }
      const id = parseInt(parts[parts.length - 1]);

      return {
        category,
        id: isNaN(id) ? null : id, // Ensure ID is a number, else null
        image: `/gallery/${file}`,
      };
    });
    imagesData = shuffleArray(imagesData);

    //write json to file
    await fs.writeFile(outputJsonPath, JSON.stringify(imagesData, null, 2));

    console.log("JSON file successfully generated at:", outputJsonPath);
  } catch (err) {
    console.error("Error generating JSON file:", err);
  }
};

generateImageJson();
