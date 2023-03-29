
import * as V2EXAPI  from '@/api/v2ex'
import Link from 'next/link';

export default async function TabItem({params}: {params: {id: string}}) {
    const list = await V2EXAPI.getTopicListByTab(params.id);
    return (
        <>
            <h3>Tab item No{params.id}</h3>
            <ul>
                {list.map((l, i) => {
                    const tLink = encodeURIComponent(l.link)
                    return (
                        <li key={i}><Link href={`/topic/${tLink}`}>{l.title}</Link></li>
                    )
                })}
            </ul>
        </>
    )
}