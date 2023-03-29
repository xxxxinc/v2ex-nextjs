

export default function GroupLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="group">
            <h2>group layout</h2>
            <main>
                {children}
            </main>
        </div>
    )
}