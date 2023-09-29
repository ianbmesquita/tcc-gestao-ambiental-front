// Layout.tsx
import React, { ReactNode } from 'react';

import { SideNavBar } from './sidenav/sideNavBar/sideNavBar';
import { MainContent } from './mainContent/mainContent';

import styles from './layout.module.css'
import { Header } from './header/header';


interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.background}>
        <SideNavBar />
        <Header />
        <MainContent> 
            { children } 
        </MainContent>
    </div>
  );
}

export default Layout;
