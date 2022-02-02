import { Link, useLoaderData } from "remix";

import { getPosts } from "~/post";
import type { Post } from "~/post";

import LimitMaxWidth, { FullBleed } from "~/components/LimitMaxWidth";

export const loader = async () => {
  return await getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  return (
    <LimitMaxWidth maxWidth="80ch">
      <FullBleed>
        <LimitMaxWidth maxWidth="80ch">
          <h1>All Posts</h1>
        </LimitMaxWidth>
      </FullBleed>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link prefetch="intent" to={post.slug}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </LimitMaxWidth>
  );
}
