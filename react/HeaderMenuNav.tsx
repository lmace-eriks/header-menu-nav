import React, { ReactChildren } from 'react';
import { useState, useEffect, useRef } from 'react';

// Styles
import styles from "./styles.css";

// Hooks
import useOnClickOutside from './useClickOutside';

interface HeaderMenuNavProps {
  mainMenu: Array<string>
  children: ReactChildren
}

const HeaderMenuNav: StorefrontFunctionComponent<HeaderMenuNavProps> = ({ mainMenu, children }) => {
  const parentNav = useRef(null);
  const submenuRef = useRef<any>(null);
  const [menu, setMenu] = useState<any>();
  const [menuNumber, setMenuNumber] = useState<any>();
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const classPrefix = "eriksbikeshop-headermenunav-1-x-";
  const subMenuBorderClass = "subMenuBorder";
  const mainMenuBorderClass = "mainMenuBorder";

  useOnClickOutside(parentNav, () => closeSubmenu());

  useEffect(() => {
    console.clear();
    if (menu === undefined && submenuRef.current) {
      submenuRef.current.classList.remove(classPrefix + subMenuBorderClass);
    } else {
      submenuRef.current.classList.add(classPrefix + subMenuBorderClass);
    }

    removeMainMenuUnderline();

    // @ts-expect-error
    const openMenu = document.querySelector(`[data-menunumber="${menuNumber}"]`);
    openMenu?.classList.add(classPrefix + mainMenuBorderClass);

  })

  const handleClick = (e: any) => {
    const menuClicked = Number(e.target.dataset.menunumber);
    setMenuNumber(menuClicked);

    // @ts-expect-error
    const fullHeaderHeight = document.getElementsByClassName("vtex-flex-layout-0-x-flexRow--full-desktop-header")[0].offsetHeight;

    // @ts-expect-error
    setMenu(children[menuClicked]);

    setHeaderHeight(fullHeaderHeight);
  }

  const closeSubmenu = () => {
    setMenuNumber(undefined);
    removeMainMenuUnderline();
    setMenu(undefined);
  }

  const removeMainMenuUnderline = () => {
    for (let i = 0; i < mainMenu.length; i++) {
      // @ts-expect-error
      const closedMenu = document.querySelector(`[data-menunumber="${i}"]`);
      closedMenu?.classList.remove(classPrefix + mainMenuBorderClass);
    }
  }


  return (
    <div ref={parentNav} className={styles.mainMenuContainer}>
      <nav className={styles.mainMenuWrapper}>
        {
          mainMenu.map((menu, index) => (
            <button className={styles.mainMenuButton} data-menuNumber={index} onClick={handleClick}>{menu}</button>
          ))
        }
      </nav>
      <div className={styles.subMenuContainer}>
        <div ref={submenuRef} className={styles.subMenuWrapper} style={{ top: `${headerHeight}px` }}>
          {menu}
        </div>
      </div>
    </div>
  )
}

HeaderMenuNav.schema = {
  title: 'editor.headermenunav.title',
  description: 'editor.headermenunav.description',
  type: 'object',
  properties: {}
}

export default HeaderMenuNav;
