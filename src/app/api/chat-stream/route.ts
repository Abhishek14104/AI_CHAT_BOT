import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const {messages, sessionId} = await req.json()


    const lastMessage = messages[messages.length-1].content
    console.log({lastMessage})

    const response = await ragChat.chat(lastMessage, {sessionId, streaming: true})

    console.log({response})

    return aiUseChatAdapter(response)
}