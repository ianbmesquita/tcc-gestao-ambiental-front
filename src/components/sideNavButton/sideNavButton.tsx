import { ReactNode } from "react"

import styles from './sideNavButton.module.css'

interface SideNavButtonProps {
    icon: ReactNode;
    text: string;
}

export function SideNavButton(props: SideNavButtonProps) {
    return (
        <div className="my-4">
            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-emerald-950 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                { props.icon }
                <h3 className="text-base text-emerald-950 group-hover:text-white font-semibold {styles.text}"> 
                    <span className={styles.text}>{ props.text }</span> 
                </h3>
            </div>
        </div>
    )
}