import type { Thought } from "@prisma/client";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import LimitMaxWidth from "~/components/LimitMaxWidth";
import { db } from "~/utils/db.server";

type LoaderData = { thoughts: Thought[] };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    thoughts: await db.thought.findMany(),
  };
  return data;
};

export default function DbTest() {
  const data = useLoaderData<LoaderData>();
  return (
    <LimitMaxWidth maxWidth="80ch">
      <h1>Thoughts</h1>
      <ul>
        {data.thoughts.map((thought) => (
          <li>{thought.content}</li>
        ))}
      </ul>
    </LimitMaxWidth>
  );
}
