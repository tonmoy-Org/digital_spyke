import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog | Digital Spyke',
    description: "Discover insights and updates from Digital Spyke.",
}

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div>{children}</div>
    )
}

export default layout;
