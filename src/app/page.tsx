import Link from 'next/link'
import * as V2EXAPI  from '@/api/v2ex'
import { redirect } from 'next/navigation'
export default function Home() {
  const tabs = V2EXAPI.getAllTabs()
  redirect('/tab')

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
      <main>
        Home
        <ul>
          <li></li>
        </ul>
      </main>
    </>
  )
}
