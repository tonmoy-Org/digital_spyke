import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Detail Page | Digital Spyke',
    description: "Discover in-depth information and insights on the selected topic or feature by Digital Spyke, showcasing our expertise and innovative approach.",
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
