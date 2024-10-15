import { promises as fs } from "fs";

import { loadCollection, locate, lookupCollections } from "@iconify/json"
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { IconSet } from "@iconify/tools";

const dir =
  dirname(
    typeof __dirname !== "undefined"
      ? __dirname
      : dirname(fileURLToPath(import.meta.url))
  );


const collectionDir = join(dir, "collections");
const iconSkipList = ["emoji"]

// Get all the icon sets present in `@iconify-json/*`
const iconsets = Object.keys(await lookupCollections());

iconsets.forEach(async (iconSetName) => {
  // Transform the icon set's JSON into `IconSet` for fancy export methods
  const iconSet = new IconSet(await loadCollection(locate(iconSetName)));
  if (
    iconSet.info?.category &&
    iconSkipList.includes(iconSet.info.category.toLowerCase())
  ) {
    return
  }

  // Reconfigure icon directories to support latest variants
  const iconDir = join(dir, "icons", iconSet.prefix);
  await fs.rm(iconDir, { recursive: true, force: true });
  await fs.mkdir(iconDir, { recursive: true });

  // Write each icon in the IconSet to an SVG that Typst can load/reference
  iconSet.forEach(async (name: string) => {
    const svg = iconSet.toSVG(name).toString();
    const iconSVG = join(iconDir, `${name}.svg`)
    await fs.writeFile(iconSVG, svg, { encoding: "utf-8" });
  })

  // Generate an icon manifest that we can read/use from Typst
  const iconList = JSON.stringify({ icons: iconSet.list() }, null, 2);
  const iconManifest = join(collectionDir, `${iconSet.prefix}.json`);
  await fs.writeFile(iconManifest, iconList, { encoding: "utf-8" });
})