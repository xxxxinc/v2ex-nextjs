import Link from "next/link"
export default function Blog() {
    return (
        <ul>
            <li><Link href="/blog/1">blog 1</Link></li>
            <li><Link href="/blog/2">blog 2</Link></li>
            <li><Link href="/blog/3">blog 3</Link></li>
        </ul>
    )
}