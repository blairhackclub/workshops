import fs from "fs";
import path from "path";
import matter from "gray-matter";

const manifest = require('../manifest.json');
const workshopsDir = path.join(process.cwd(), "workshops");

export const getWorkshopList = async () => { // list of workshops organized in categories, passed to homepage
  var list = {};
  Object.keys(manifest).map(key => list[key] = {});
  await Promise.all(Object.entries(manifest).map(async ([key, props]) => {
    const { slugs, hq, ...rest } = props;

    var newHq = {};
    hq.map(s => newHq[s] = {});

    list[key] = {
      slugs: slugs.map(s => {
        const workshopContent = getWorkshopData(s);
        const { data:frontMatter } = matter(workshopContent);
        return {
          slug: s,
          ...frontMatter
        }
      }),
      hq: await Promise.all(hq.map(async s => {
        const url = `https://raw.githubusercontent.com/hackclub/hackclub/main/workshops/${s}/README.md`;
        const res = await fetch(url);
        const text = await res.text();
        if (text === "404: Not Found") console.log("HQ file not found:", s);

        const { data: frontMatter } = matter(text);
        const { name, description, author, img = null } = frontMatter;
        return {
          slug: s,
          title: name,
          description: description,
          author: author.substring(1),
          thumbnail: img || `https://raw.githubusercontent.com/hackclub/hackclub/main/workshops/${s}/img/demo.png` // hq thumbnail is either in frontmatter or /img/demo.png
        };
      })),
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
