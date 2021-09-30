import fs from "fs";
import path from "path";
import matter from "gray-matter";

const catalog = require('../workshops/catalog.json');
const workshopsDir = path.join(process.cwd(), "workshops");

export const getWorkshopList = async () => { // list of workshops organized in categories, passed to homepage
  var list = {};
  Object.keys(catalog).map(key => list[key] = {});
  await Promise.all(Object.entries(catalog).map(async ([key, props]) => {
    const { slugs, ...rest } = props;

    list[key] = {
      slugs: slugs.map(s => {
        const workshopContent = getWorkshopData(s);
        const { data:frontMatter } = matter(workshopContent);
        return {
          slug: s,
          ...frontMatter
        }
      }),
      ...rest
    };
  }));
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
