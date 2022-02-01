import { Link, useCatch, useLoaderData, useParams } from "remix";
import type { LoaderFunction } from "remix";
import styled from "styled-components";
import invariant from "tiny-invariant";

import LimitMaxWidth from "~/components/LimitMaxWidth";
import * as constants from "~/constants";
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
  const params = useParams();
  const post = useLoaderData();
  return (
    <LimitMaxWidth maxWidth="80ch">
      <BreadcrumbWrapper>
        <Link to="/blog/posts">Go back to posts</Link>
        {/* <ChevronWrapper>{`>`}</ChevronWrapper> */}
        {/* <Link to={`/blog/posts/${params.slug}`}>{params.slug}</Link> */}
        {/* <span>{params.slug}</span> */}
      </BreadcrumbWrapper>

      <ContentWrapper dangerouslySetInnerHTML={{ __html: post.html }} />
    </LimitMaxWidth>
  );
}

const BreadcrumbWrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${constants.COLORS.primary1};
`;

const ChevronWrapper = styled.span`
  margin: 0 8px;
  color: ${constants.COLORS.gray[400]};
`;

const ContentWrapper = styled.div`
  margin: 16px 0;
`;

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <ErrorWrapper maxWidth="80ch">
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <a href="/blog/posts">Go back to posts</a>
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
