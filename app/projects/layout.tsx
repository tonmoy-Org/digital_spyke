import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects | Digital Spyke',
    description: "Explore Digital Spyke's projects.",
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
