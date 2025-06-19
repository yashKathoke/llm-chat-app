import { useEffect, useState, useRef } from "react";
import Button from "./Button";
import Input from "./Input";
import Message from "./Message";
import Loading from "./Loading";
import useGetResponse from "../hooks/useGetResponse";
import { Toast } from "./Toast";

type Message = {
  id: number;
  text: string;
};

type Conversation = {
  question: string;
  answer: string;
};

const ChatWindow = () => {
  const [question, setQuestion] = useState<string>("");
  const [toast, setToast] = useState<boolean>(false);
  const [conversations, setConversation] = useState<Conversation[]>([]);

  const toBottomRef = useRef<HTMLDivElement>(null);
  
  const { sendQuestion, loading } = useGetResponse();

  const sendButtonHandle = async () => {
    if (!question.trim()) {
      setToast(true);
      return;
    }
    const answer = await sendQuestion(question);
    setQuestion("");

    setConversation((prev) => [
      { question: question, answer: answer },
      ...prev,
    ]);
  };

  const onClose = () => {
    setToast(false);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    toBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  return (
    <>
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-max transition-opacity duration-500 ease-in-out">
          <Toast content="Please enter something!" onClose={onClose} />
        </div>
      )}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 backdrop-blur-sm  max-h-screen h-screen flex justify-center items-center text-slate-300">
        <div className="w-full sm:w-1/2 h-full lg:h-3/4 bg-gradient-to-br from-slate-800 to-slate-900/20 backdrop-blur-sm inset-shadow-sm shadow-slate-600 px-4 lg:py-2 rounded-xl flex flex-col justify-between">
          <div className="flex flex-col-reverse overflow-y-scroll space-y-reverse space-y-2 max-h-4/5 h-4/5 flex-grow scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent  items">
            {loading ? (
              <div className="p-2">
                <Loading />
              </div>
            ) : null}

            <div ref={toBottomRef}></div>
            {conversations.map((conversation, i) => (
              <div key={i}>
                <Message content={conversation.question} type="question" />
                <Message content={conversation.answer} type="answer" />
              </div>
            ))}
          </div>
          <div className="max-h-1/6  bg-slate-900/20 flex w-full justify-between space-x-3 p-2 mt-4 mb-2 rounded self-start">
            <Input
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
            <Button content={"Send"} onClick={sendButtonHandle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
