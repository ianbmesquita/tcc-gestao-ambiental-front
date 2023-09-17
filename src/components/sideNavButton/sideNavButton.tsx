import { ReactNode } from "react"

interface SideNavButtonProps {
    icon: ReactNode;
    text: string;
}

export function SideNavButton(props: SideNavButtonProps) {
    return (
        <div className="my-4 border-b border-gray-100">
            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                { props.icon }
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold"> 
                    { props.text } 
                </h3>
            </div>
        </div>
    )
}