import { useCatch, useLoaderData, useParams } from "remix";
import type { LoaderFunction } from "remix";
import styled from "styled-components";
import invariant from "tiny-invariant";

import LimitMaxWidth from "~/components/LimitMaxWidth";
import { getPost } from "~/post";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");

  try {
    return await getPost(params.slug);
  } catch (error) {
    throw new Response("Not found", {
      status: 404,
    });
  }
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <LimitMaxWidth maxWidth="80ch">
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </LimitMaxWidth>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <ErrorWrapper maxWidth="80ch">
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <a href="/posts">Go back to posts</a>
    </ErrorWrapper>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const params = useParams();
  return (
    <ErrorWrapper maxWidth="80ch">
      <h1>Error</h1>
      <h2>There was an issue loading the current document ({params.slug})</h2>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled(LimitMaxWidth)`
  text-align: center;
`;
