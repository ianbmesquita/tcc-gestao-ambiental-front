import { ReactNode } from "react"

import Link from "next/link";

import styles from './sideNavButton.module.css'

interface SideNavButtonProps {
    icon: ReactNode;
    text: string;
    link: string;
}

export function SideNavButton(props: SideNavButtonProps) {
    return (
        <div className="my-4">
            <Link href={props.link}>
                <div className="flex mb-2 justify-start items-center gap-4 px-5 transition duration-200 hover:bg-emerald-950 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    { props.icon }
                    <h3 className="text-base text-emerald-950 group-hover:text-white font-semibold"> 
                        <span className={styles.text}>{ props.text }</span> 
                    </h3>
                </div>
            </Link>
        </div>
    )
}