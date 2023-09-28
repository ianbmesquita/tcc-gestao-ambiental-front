import { Disclosure } from '@headlessui/react'
import { GiCalendar, GiHamburgerMenu } from 'react-icons/gi'
import { VscTools } from 'react-icons/vsc'
import { CgProfile } from 'react-icons/cg'
import { FaWater } from 'react-icons/fa'
import { FaPeopleGroup } from 'react-icons/fa6'
import { MdOutlineAssessment, MdOutlineSensors } from 'react-icons/md'

import { Image } from '../image/image'
import { SideNavButton } from '../sideNavButton/sideNavButton'

export function SideNavBar() {
    const iconClasses = "text-2xl text-gray-600 group-hover:text-white";
    const disclojureClass = "absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-emerald-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:rind-white group hover:bg-emerald-950"

    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button className={disclojureClass}>
                    <GiHamburgerMenu 
                        className="block md:hidden h-6 w-6" 
                        aria-hidden="true" 
                    />
                </Disclosure.Button>
                <div className="p-6 h-screen bg-emerald-200 z-20 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex flex-row justify-center items-center w-44">
                        <Image src="/img/logo.png" alt="Logomarca SIGAM" />
                    </div>

                    <SideNavButton icon={<CgProfile className={iconClasses} />} text="Usuários" link="/usuarios" />
                    <SideNavButton icon={<VscTools className={iconClasses} />} text="Ativos" link="/ativos" />
                    <SideNavButton icon={<GiCalendar className={iconClasses} />} text="Manutenções" link="/manutencoes" />
                    <SideNavButton icon={<FaWater className={iconClasses} />} text="Barragens" link="/barragens" />
                    <SideNavButton icon={<FaPeopleGroup className={iconClasses} />} text="Habitantes" link="/habitantes/listagem" />
                    <SideNavButton icon={<MdOutlineSensors className={iconClasses} />} text="Sensores" link="/sensores/listagem" />
                    <SideNavButton icon={<MdOutlineAssessment className={iconClasses} />} text="Avaliações" link="/avaliacoes" />
                </div>
            </Disclosure>
        </div>
        
    )
}