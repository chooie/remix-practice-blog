import {
  useActionData,
  useLoaderData,
  useTransition,
  Form,
  redirect,
} from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import invariant from "tiny-invariant";

import { getPost, createOrOverWritePost } from "~/post";
import { useState } from "react";

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createOrOverWritePost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  const existingPost = useLoaderData();
  const errors = useActionData();
  const transition = useTransition();

  const [title, setTitle] = useState(existingPost.title);
  const [slug, setSlug] = useState(existingPost.slug);
  const [rawBody, setRawBody] = useState(existingPost.rawBody);

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          {errors?.title || title === "" ? <em>Title is required</em> : null}
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug || slug === "" ? <em>Slug is required</em> : null}
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown || rawBody === "" ? (
          <em>Markdown is required</em>
        ) : null}
        <br />
        <textarea
          rows={20}
          name="markdown"
          value={rawBody}
          onChange={(event) => setRawBody(event.target.value)}
        />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Updating..." : "Update"}
        </button>
      </p>
    </Form>
  );
}
