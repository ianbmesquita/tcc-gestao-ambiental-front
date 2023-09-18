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
    <Router>
        <div className={styles.background}>
            <SideNavBar />
            <MainContent> 
                { children } 
            </MainContent>
        </div>
    </Router>
  );
}

export default Layout;
