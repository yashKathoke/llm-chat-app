type MessageProps = {
    type: 'user' | 'bot';
    content: string;
};

const Message = ({ type, content }: MessageProps) => {
    const isUser = type === 'user';

    return (
        <div
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}
        >
            <div
                className={`max-w-[60%] p-3 rounded-lg ${
                    isUser ? 'bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent text-slate-300' : 'bg-gradient-to-br from-purple-600/10 via-purple-500/5 to-transparent text-slate-300'
                } text-left`}
            >
                {content}
            </div>
        </div>
    );
};

export default Message;
