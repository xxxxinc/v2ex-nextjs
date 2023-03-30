import Link from "next/link"
import * as V2EXAPI  from '@/api/v2ex'

const TabNav = () => {
    const tabs = V2EXAPI.getAllTabs()
    return (
        <>
            <nav>
            <ul>
                {tabs.map((tab) => {
                    return (
                        <li key={tab.value}><Link href={`/tab?node=${tab.value}`}>{tab.title}</Link></li>
                    )
                })}
            </ul>
            </nav>
        </>
    )
}
export default async function Tab({searchParams}: {searchParams: any}) {

    const list = await V2EXAPI.getTopicListByTab(searchParams.node);
    return (
        <>
            <TabNav></TabNav>

            <section>
                <ul>
                    {list.map((l, i) => {
                        return (
                            <li key={i}><Link href={`/topic/${l.id}`}>{l.title}</Link></li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}