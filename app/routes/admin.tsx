import { Outlet, Link, useLoaderData } from "remix";
import styled from "styled-components";

import { getPosts } from "~/post";
import type { Post } from "~/post";

export const loader = async () => {
  return await getPosts();
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();
  return (
    <>
      <h1>Admin</h1>
      <Wrapper>
        <Nav>
          <ul>
            {posts.map((post) => (
              <ListItem key={post.slug}>
                <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                <Link to={`${post.slug}`}>Edit</Link>
              </ListItem>
            ))}
          </ul>
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
`;

const Main = styled.main`
  flex: 1;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between; ;
`;
