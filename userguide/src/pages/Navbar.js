/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import styles from './index.module.css';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';

export default function NavbarLayout(children) {
  const mobileSidebar = useNavbarMobileSidebar();
  const {
    navbar: {hideOnScroll, style},
  } = useThemeConfig();

  return (
    <nav
      
      className={clsx(
        'navbar',
        'navbar--fixed-top',
        hideOnScroll && [
          styles.navbarHideable,
          !isNavbarVisible && styles.navbarHidden,
        ],
        {
          'navbar--dark': style === 'dark',
          'navbar--primary': style === 'primary',
          'navbar-sidebar--show': mobileSidebar.shown,
        },
      )}>
      {children}
      <NavbarMobileSidebar />
    </nav>
  );
}
