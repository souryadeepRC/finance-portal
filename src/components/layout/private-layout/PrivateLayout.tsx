import { memo } from "react";

interface PrivateLayoutInerface {
    children: JSX.Element
}
const PrivateLayout = memo(({ children }: PrivateLayoutInerface) => {
    return <><header>Header</header>{children}</>
})
PrivateLayout.displayName='PrivateLayout'
export {PrivateLayout};