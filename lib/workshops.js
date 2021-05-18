import fs from "fs";
import path from "path";
import matter from "gray-matter";

const workshopsDir = path.join(process.cwd(), "data/workshops");

export const getWorkshopList = () => {
  const categoriesList = fs.readdirSync(workshopsDir).filter(f => {
    return fs.statSync(`${workshopsDir}/${f}`).isDirectory();
  });

  var workshops = {};
  categoriesList.forEach(c => {
    let slugsList = fs.readdirSync(`${workshopsDir}/${c}`).filter(f => {
      return [".mdx"].includes(path.extname(f).toLowerCase());
    });

    let data = [];
    slugsList.forEach(async s => {
      const workshopContent = await getWorkshopData(c, s.replace(".mdx", ""));
      const { data:frontMatter } = matter(workshopContent);
      
      data.push({
        slug: s.replace(".mdx", ""),
        ...frontMatter
      });
    });

    workshops[c] = {
      info: require(`../data/workshops/${c}/config.json`),
      data
    };
  });

  return workshops;
};

export const getWorkshopSlugs = () => {
  const categoriesList = fs.readdirSync(workshopsDir).filter(f => {
    return fs.statSync(`${workshopsDir}/${f}`).isDirectory();
  });

  var slugs = [];
  categoriesList.forEach(c => {
    let slugsList = fs.readdirSync(`${workshopsDir}/${c}`).filter(f => {
      return [".mdx"].includes(path.extname(f).toLowerCase());
    });
    slugsList.forEach(s => {
      slugs.push({
        params: {
          category: c,
          slug: s.replace(".mdx", "")
        }
      });
    });
  });

  return slugs;
};

export const getWorkshopData = async (category, slug) => {
  const fullPath = path.join(workshopsDir, category, `${slug}.mdx`);
  const workshopContent = fs.readFileSync(fullPath, "utf8");

  return workshopContent;
};
