import fs from "fs";
import path from "path";
import matter from "gray-matter";

const manifest = require('../manifest.json');
const workshopsDir = path.join(process.cwd(), "workshops");

export const getWorkshopList = () => { // list of workshops organized in categories, passed to homepage
  var list = {};
  Object.entries(manifest).map(([key, props]) => {
    list[key] = {
      title: props.title,
      description: props.description,
      data: props.slugs.map(s => {
        const workshopContent = getWorkshopData(s);
        const { data:frontMatter } = matter(workshopContent);
        return {
          slug: s,
          ...frontMatter
        }
      })
    };
  });
  return list;
};

export const getWorkshopSlugs = () => {
  const slugs = fs.readdirSync(workshopsDir).filter(f => {
    return fs.statSync(`${workshopsDir}/${f}`).isDirectory();
  }).map(slug => ({ params: { slug } }));

  return slugs;
};

export const getWorkshopData = (slug) => {
  const fullPath = path.join(workshopsDir, slug, `README.md`);
  const workshopContent = fs.readFileSync(fullPath, "utf8");

  return workshopContent;
};
