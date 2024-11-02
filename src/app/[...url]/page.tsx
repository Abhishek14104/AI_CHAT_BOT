import {ragChat} from '@/lib/rag-chat'
import { redis } from '@/lib/redis'
import {ChatWrapper} from '@/app/components/ChatWrapper'
import { cookies } from 'next/headers'

interface PageProps {
    params: {
        url: string | string[] | undefined
        //url sting me convert hus | usrl ko string array me break kiya
    }
}

function reconstructUrl({url}: {url: string[]}) {
    const decodedUrl =  url.map((component) => decodeURIComponent(component))
    return decodedUrl.join("/")
}

const Page = async ({params}: PageProps) => {
    const sessionCookie = cookies().get("sessionId")?.value
    const finalUrl = reconstructUrl({url: params.url as string[]})
    // Now this sessionId will be unique for every user and will also be unique for every Bot
    const sessionId = (finalUrl + '--' + sessionCookie).replace(/\//g, "")

    const hasAlreadyBeenAdded = await redis.sismember("indexed-urls", finalUrl)

    const initialMessages = await ragChat.history.getMessages({amount: 10, sessionId})

    if(!hasAlreadyBeenAdded) {
        await ragChat.context.add({
            type: "html",
            source:finalUrl,
            config: {chunkOverlap: 50, chunkSize: 200},
        })
    }

    await redis.sadd("indexed-urls", finalUrl)


    return  <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
}
export default Page