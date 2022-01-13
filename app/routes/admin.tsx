import { Form, Link, redirect, Outlet, useLoaderData } from "remix";
import type { ActionFunction } from "remix";
import styled from "styled-components";
import invariant from "tiny-invariant";

import { getPosts, deletePost } from "~/post";
import type { Post } from "~/post";

export const loader = async () => {
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
    <>
      <h1>Admin</h1>
      <Wrapper>
        <Nav>
          <List>
            {posts.map((post) => (
              <ListItem key={post.slug}>
                <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                <MyForm method="post">
                  <input type="hidden" name="slug" value={post.slug} />
                  <button type="submit">Delete</button>
                </MyForm>
                <Link to={`${post.slug}`}>Edit</Link>
              </ListItem>
            ))}
          </List>
        </Nav>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </>
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
`;

const ListItem = styled.li`
  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const MyForm = styled(Form)`
  margin-left: auto;
`;

const Main = styled.main`
  flex: 1;
`;
