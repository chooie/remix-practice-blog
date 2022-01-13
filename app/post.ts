import path from "path";
import fs from "fs/promises";

import parseFrontMatter from "front-matter";
import { marked } from "marked";
import invariant from "tiny-invariant";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

// Relative to the server output not the source!
const postsPath = path.join(__dirname, "..", "posts");

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const { attributes } = parseFrontMatter(file.toString());

      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );

      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title,
      };
    })
  );
}

export async function getPost(slug: string) {
  const { attributes, body } = parseFrontMatter(await getRawFile(slug));
  invariant(
    isValidPostAttributes(attributes),
    `Post ${slug} is missing attributes`
  );
  const html = marked(body);
  return { rawBody: body, slug, html, title: attributes.title };
}

type NewPost = {
  title: string;
  slug: string;
  markdown: string;
};

export async function createOrOverWritePost(post: NewPost) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(path.join(postsPath, post.slug + ".md"), md);
  return getPost(post.slug);
}

export async function deletePost(slug: string) {
  await fs.unlink(path.join(postsPath, slug + ".md"));
}

export async function getRawFile(slug: string) {
  const filePath = path.join(postsPath, slug + ".md");
  const fileString = await getFile(filePath);
  return fileString;
}

export async function getFile(path: string) {
  const file = await fs.readFile(path);
  const fileString = file.toString();
  return fileString;
}

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}
