import { memo } from "react";

interface PublicLayoutInerface {
    children: JSX.Element
}
const PublicLayout = memo(({ children }: PublicLayoutInerface) => {
    return <>{children}</>
})
PublicLayout.displayName='PublicLayout'
export {PublicLayout};