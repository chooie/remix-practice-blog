import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";

import { getPost } from "~/post";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return await getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}