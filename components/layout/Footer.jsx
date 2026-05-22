'use client'

const Footer = () => {
    return (
        <footer className="border-t border-border py-10 font-mono">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
                <div>
                    © {new Date().getFullYear()} Naman Jain · Crafted with care.
                </div>
                <div className="flex gap-6">
                    <a href="#work" className="hover:text-foreground">Work</a>
                    <a href="#about" className="hover:text-foreground">About</a>
                    <a href="#contact" className="hover:text-foreground">Contact</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer