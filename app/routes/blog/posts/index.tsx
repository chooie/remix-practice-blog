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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        sagittis ligula in purus iaculis, non semper dui euismod. Pellentesque
        luctus posuere augue, a tincidunt enim eleifend id. Nunc at ligula sed
        libero placerat vehicula. In lobortis, erat ut elementum viverra, sem
        arcu consequat libero, non auctor risus arcu nec dui. Sed tempus feugiat
        nibh sed efficitur. Donec tristique orci metus, at congue eros gravida
        id. Mauris ultrices accumsan sapien non blandit. Integer in sem libero.
        Etiam a viverra nunc, ut.
      </p>
    </LimitMaxWidth>
  );
}
