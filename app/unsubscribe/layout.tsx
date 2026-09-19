import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Unsubscribe | Digital Spyke',
    description: "Unsubscribe from Digital Spyke newsletter updates.",
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