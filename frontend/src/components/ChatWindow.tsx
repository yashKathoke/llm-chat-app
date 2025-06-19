import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Message from "./Message";
import Loading from "./Loading";

type Message =  {
  id: number;
  text: string;
}

const ChatWindow = () => {
  const messages: Message[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    text: `Message ${index + 1}`,
  }));

  const [message, setMessage] = useState<String>("")

  const sendButtonHandle = () => {

  }

  return (
    <>
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 backdrop-blur-sm  p-6 min-h-screen h-[80vh] flex justify-center items-center text-slate-300">
        <div className="w-1/2 min-h-2/3 max-h-4/5 bg-gradient-to-br from-slate-800 to-slate-900/20 backdrop-blur-sm inset-shadow-sm shadow-slate-600 p-6 rounded-xl flex flex-col">
          <div className="flex flex-col-reverse overflow-y-scroll  space-y-reverse space-y-2 max-h-4/5 flex-grow-[8]  scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent ">
     
          <Loading/>

            {messages.map((message) => (
              <Message
                content={message.text}
                type="bot"
              />
            ))}
          </div>
          {/* <div className="line w-0.2 border-1 my-5"></div> */}
          <div className="h-1/5 flex-grow-[1] bg-slate-900/20 flex w-full justify-between space-x-3  p-2 mt-4  rounded">
            <Input onChange={(e)=> {
                setMessage(e.target.value)
            }} />
            <Button content={"Send"} onClick={sendButtonHandle}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
