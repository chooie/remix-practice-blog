import type { Tweet } from "@prisma/client";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import { db } from "~/utils/db.server";

type LoaderData = { tweets: Tweet[] };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    tweets: await db.tweet.findMany(),
  };
  return data;
};

export default function DbTest() {
  const data = useLoaderData<LoaderData>();
  return (
    <ul>
      {data.tweets.map((tweet) => (
        <li>{tweet.content}</li>
      ))}
    </ul>
  );
}
