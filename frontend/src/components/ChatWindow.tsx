import Input from "./Input";

const ChatWindow = () => {
  const messages = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    text: `Message ${index + 1}`,
  }));
  return (
    <>
      <div className="bg-gradient-to-br from-violet-500/30 to-purple-500/30 backdrop-blur-sm border border-violet-400/30 p-6 min-h-screen h-[80vh] flex justify-center items-center">
        <div className="w-1/2 min-h-2/3 max-h-4/5 bg-gradient-to-br from-fuchsia-500/25 to-pink-500/25 backdrop-blur-sm border border-fuchsia-400/25 p-6 rounded-xl flex flex-col">
          <div className="flex flex-col-reverse overflow-y-auto  space-y-reverse space-y-2 max-h-4/5 flex-grow-[8]  ">
            <p>Hello</p>
            <div>
              <p>hi there</p>
            </div>

            {messages.map((message) => (
            <div key={message.id}>{message.text}</div>
            ))}
          </div>
          <div className="h-1/5 flex-grow-[1]">

          <Input />
          </div>
        </div>

      </div>
    </>
  );
};

export default ChatWindow;
