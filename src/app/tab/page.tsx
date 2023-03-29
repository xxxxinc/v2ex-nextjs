import Link from "next/link"
import * as V2EXAPI  from '@/api/v2ex'

export default function Tab() {
    const tabs = V2EXAPI.getAllTabs()
    return (
        <>
            <nav>
            <ul>
                {tabs.map((tab) => {
                    return (
                    <li key={tab.value}><Link href={`/tab/${tab.value}`}>{tab.title}</Link></li>
                    )
                })}
            </ul>
            </nav>
            <h3>tab</h3>
        </>
    )
}