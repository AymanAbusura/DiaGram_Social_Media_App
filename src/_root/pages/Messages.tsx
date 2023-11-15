import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import MessagesList from "@/components/shared/MessagesList";

const Messages = () => {
  const { data: currentUser } = useGetCurrentUser();

  const messages = currentUser?.save
    .map((messages: Models.Document) => ({
      ...messages.post,
      creator: {
        messages: currentUser.messages,
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img src="/assets/icons/message.svg" width={36} height={36} alt="edit" className="invert-white" />
        <h2 className="h3-bold md:h2-bold text-left w-full">Messages</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {messages.length === 0 ? (
            <p className="text-light-4">No available Messages</p>
          ) : (
            <MessagesList />
          )}
        </ul>
      )}
    </div>
  );
};

export default Messages;