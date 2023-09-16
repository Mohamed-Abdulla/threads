import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { FC } from "react";
import ThreadCard from "../cards/ThreadCard";

interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

const ThreadsTab: FC<ThreadsTabProps> = async ({ accountId, accountType, currentUserId }) => {
  //fetch profile threads
  let result: Result = await fetchUserPosts(accountId);
  // if (accountType === "Community") {
  //   // result = await fetchCommunityPosts(accountId);
  // } else {
  //   result =
  // }
  if (!result) {
    redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          community={thread.community}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          // community={
          //   accountType === "Community"
          //     ? { name: result.name, id: result.id, image: result.image }
          //     : thread.community
          // }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
