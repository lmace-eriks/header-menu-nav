import React, { ReactChildren } from 'react';
import { useState, useEffect, useRef } from 'react';
import { canUseDOM } from 'vtex.render-runtime';

// Styles
import styles from "./styles.css";

// Hooks
import useOnClickOutside from './useClickOutside';

interface HeaderMenuNavProps {
  mainMenu: Array<MainMenuObject>
  children: ReactChildren | any
}

interface MainMenuObject {
  text: string
}

const HeaderMenuNav: StorefrontFunctionComponent<HeaderMenuNavProps> = ({ mainMenu, children }) => {
  const parentNav = useRef(null);
  const submenuRef = useRef<any>(null);
  const overlayRef = useRef<any>(null);

  const [menu, setMenu] = useState<any>();
  const [menuNumber, setMenuNumber] = useState<any>();
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const fullHeaderClass = "vtex-flex-layout-0-x-flexRow--full-desktop-header";
  const classPrefix = "eriksbikeshop-headermenunav-1-x-";
  const subMenuBorderClass = "subMenuBorder";
  const mainMenuBorderClass = "mainMenuBorder";
  const darkOverlayClass = "darkOverlay";
  const displayNoneClass = "displayNone";

  useOnClickOutside(parentNav, () => closeSubmenu());

  useEffect(() => {
    // Toggle classes for menu display --
    if (!canUseDOM) return;

    if (menu === undefined && verifyRefs()) {
      submenuRef.current.classList.remove(classPrefix + subMenuBorderClass);
      overlayRef.current.classList.remove(classPrefix + darkOverlayClass);
      overlayRef.current.classList.add(classPrefix + displayNoneClass);
    } else {
      submenuRef.current.classList.add(classPrefix + subMenuBorderClass);
      overlayRef.current.classList.add(classPrefix + darkOverlayClass);
      overlayRef.current.classList.remove(classPrefix + displayNoneClass);
    }

    removeMainMenuUnderline();

    const openMenu = document.querySelector(`[data-menunumber="${menuNumber}"]`);
    openMenu?.classList.add(classPrefix + mainMenuBorderClass);
  })

  const verifyRefs = () => {
    const refsToVerify = [submenuRef, overlayRef];
    let valueToReturn = true;

    refsToVerify.forEach(ref => {
      if (!ref.current) valueToReturn = false;
    })

    return valueToReturn;
  }

  const handleClickMenuItem = (e: any) => {
    if (!canUseDOM) return;

    const menuClicked = Number(e.target.dataset.menunumber);
    setMenuNumber(menuClicked);

    const fullHeaderHeightElement: any = document.getElementsByClassName(fullHeaderClass)[0];
    const fullHeaderHeight = fullHeaderHeightElement.offsetHeight;
    setHeaderHeight(fullHeaderHeight);

    // Reset Menu if already active. Useful for returning to the main menu from a submenu --
    if (menuNumber === menuClicked) {
      wipeAndRenderMenu(menuClicked);
      return;
    }

    setMenu(children[menuClicked]);
  }

  const wipeAndRenderMenu = (menuClicked: number) => {
    setMenu(undefined);
    setTimeout(() => {
      setMenu(children[menuClicked]);
    }, 1);
  }

  const removeMainMenuUnderline = () => {
    if (!canUseDOM) return;

    const allLinks = document.querySelectorAll(`[data-menunumber]`);
    allLinks.forEach(mainMenuLink => {
      mainMenuLink.classList.remove(classPrefix + mainMenuBorderClass);
    });
  }

  const closeSubmenu = () => {
    setMenuNumber(undefined);
    removeMainMenuUnderline();
    setMenu(undefined);
  }

  const NavigationMenu = () => (
    <nav className={styles.mainMenuWrapper}>
      {
        mainMenu.map((menu, index) => (
          <button key={`mainmenu-${index}`} className={styles.mainMenuButton} data-menunumber={index} onClick={handleClickMenuItem}>
            {menu.text}
          </button>
        ))
      }
    </nav>
  );

  const SubMenuContainer = () => (
    <div className={styles.subMenuContainer}>
      <div ref={submenuRef} className={styles.subMenuWrapper} style={{ top: `${headerHeight}px` }}>
        {menu}
      </div>
      <div ref={overlayRef} onClick={closeSubmenu} style={{ top: `${headerHeight}px` }}></div>
    </div>
  );

  return (
    <div ref={parentNav} className={styles.mainMenuContainer}>
      <NavigationMenu />
      <SubMenuContainer />
    </div>
  );
}

HeaderMenuNav.schema = {
  title: 'Desktop Main Menu',
  type: 'object',
  properties: {
    mainMenu: {
      title: "Main Menu",
      type: "array",
      items: {
        properties: {
          __editorItemTitle: {
            title: "Site Editor Name",
            desciption: "Only visible in Site Editor.",
            type: "string",
          },
          text: {
            title: "Text",
            type: "string"
          }
        }
      }
    }
  }
}

export default HeaderMenuNav;

