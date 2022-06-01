import React, { ReactChildren } from 'react';
import { useState, useEffect, useRef, CSSProperties } from 'react';

// Styles
import styles from "./styles.css";

interface HeaderMenuNavProps {
  children: ReactChildren
}

const HeaderMenuNav: StorefrontFunctionComponent<HeaderMenuNavProps> = ({ }) => {

  useEffect(() => {
    console.clear();
  })

  return (
    <h6>Hello World!</h6>
  )
}

HeaderMenuNav.schema = {
  title: 'editor.headermenunav.title',
  description: 'editor.headermenunav.description',
  type: 'object',
  properties: {}
}

export default HeaderMenuNav;
