import { DialogOverlay, DialogContent } from "@reach/dialog";
import React from "react";
import { Form, Link, redirect, Outlet, useLoaderData } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import styled from "styled-components";
import invariant from "tiny-invariant";

import LimitMaxWidth from "~/components/LimitMaxWidth";
import * as constants from "~/constants";
import { getPosts, deletePost } from "~/post";
import type { Post } from "~/post";

import { requireUserId, getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return await getPosts();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const slug = formData.get("slug");
  invariant(typeof slug === "string");

  await deletePost(slug);

  return redirect("/admin");
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();
  return (
    <LimitMaxWidth>
      <h1>Admin</h1>
      <Wrapper>
        <Nav>
          <List>
            {posts.map((post) => (
              <ListItem key={post.slug}>
                <LinkWrapper>
                  <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                  <Delete post={post} />
                  <Link to={`${post.slug}`}>Edit</Link>
                </LinkWrapper>
              </ListItem>
            ))}
          </List>
        </Nav>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </LimitMaxWidth>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Nav = styled.nav`
  flex: 1;
  max-width: 400px;
  padding-right: 16px;
`;

const List = styled.ul`
  padding-left: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding-bottom: 8px;
  margin-bottom: 8px;

  &:not(:last-child) {
    border-bottom: 1px solid ${constants.COLORS.gray[600]};
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Main = styled.main`
  flex: 1;
`;

function Delete({ post }: { post: Post }) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const formName = `deletePostForm-${post.slug}`;

  return (
    <DeleteWrapper>
      <MyForm
        aria-label={`Delete post ${post.slug}`}
        name={formName}
        method="post"
      >
        <input type="hidden" name="slug" value={post.slug} />
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            open();
          }}
        >
          Delete
        </button>

        <MyDialogOverlay isOpen={showDialog} onDismiss={close}>
          <MyDialogContent>
            <button
              onClick={() => {
                close();
              }}
            >
              Cancel
            </button>
            <button onClick={() => submitForm(formName)}>Confirm Delete</button>
          </MyDialogContent>
        </MyDialogOverlay>
      </MyForm>
    </DeleteWrapper>
  );
}

function submitForm(formName: string) {
  close();
  const formElement: null | HTMLFormElement = document.querySelector(
    `form[name="${formName}"]`
  );

  invariant(formElement !== null, `No form element with name, ${formElement}`);
  formElement.submit();
}

const DeleteWrapper = styled.div`
  margin-left: auto;
`;

const MyForm = styled(Form)``;

const MyDialogOverlay = styled(DialogOverlay)`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: hsla(0deg 0% 0% / 0.5);
`;

const MyDialogContent = styled(DialogContent)`
  width: 400px;
  height: 400px;

  max-height: 100%;
  max-width: 100%;

  background-color: hsla(0deg 0% 95% / 1);
`;
