import * as V2EXAPI from '@/api/v2ex'

function ReplyItem({reply}: {reply: V2EXAPI.TopicReply}) {
    const content = {__html: reply.content}
    return (
        <>
            <h3>{reply.userName}</h3>
            <p>floor: {reply.floor} time: {reply.time}</p>
            <div dangerouslySetInnerHTML={content}></div>
            ----------------------------------------------------------------------
        </>
    )
}

export default async function TopicItem({params}: {params: {id: string}}) {
    const detail = await V2EXAPI.getTopicDetail(decodeURIComponent(params.id))
    const content = {__html: detail.content}
    return (
        <>
            <section>
                <h1>{detail.title}</h1>
                <article dangerouslySetInnerHTML={content}></article>
            </section>

            <hr />

            <section>
                {detail.replies.map((reply, i) => {
                    return (
                        <ReplyItem key={i} reply={reply}></ReplyItem>
                    )
                })}
            </section>
        </>
    )
}