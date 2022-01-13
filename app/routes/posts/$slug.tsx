import { useLoaderData, Form, Link, redirect } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import invariant from "tiny-invariant";

import { getPost, deletePost } from "~/post";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const slug = formData.get("slug");
  invariant(typeof slug === "string");

  await deletePost(slug);

  return redirect("/admin");
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <div>
      <Form method="post">
        <input type="hidden" name="slug" value={post.slug} />
        <button type="submit">Delete</button>
      </Form>
      <Link to={"/admin/edit/" + post.slug}>Edit</Link>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
