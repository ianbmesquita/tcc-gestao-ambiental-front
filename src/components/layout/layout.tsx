// Layout.tsx
import React, { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { SideNavBar } from '../sideNavBar/sideNavBar';
import { MainContent } from '../mainContent/mainContent';

import styles from './layout.module.css'


interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.background}>
        <SideNavBar />
        <MainContent> 
            { children } 
        </MainContent>
    </div>
  );
}

export default Layout;
