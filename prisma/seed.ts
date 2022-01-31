import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async () => {
  await seed();
})();

async function seed() {
  const kody = await prisma.user.create({
    data: {
      username: "chooie",
      // Password is my go-to insecure password
      passwordHash:
        "$2a$10$B7aQc5Nc/B3T2J9te.LiRuxa1.8N/i50oLgGz2c2HeURwc6doJS5q",
      isAdmin: true,
    },
  });
  await Promise.all(
    getTweets().map((tweet) => {
      const data = { userId: kody.id, ...tweet };
      return prisma.tweet.create({ data });
    })
  );
}

function getTweets() {
  return [
    {
      slug: "road-worker",
      title: "Road worker",
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      slug: "frisbee",
      title: "Frisbee",
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      slug: "trees",
      title: "Trees",
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
      slug: "skeletons",
      title: "Skeletons",
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
      slug: "hippos",
      title: "Hippos",
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
      slug: "dinner",
      title: "Dinner",
      content: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
      slug: "elevator",
      title: "Elevator",
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
  ];
}
