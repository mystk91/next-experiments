"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { createFocusTrap } from "focus-trap";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/forum", label: "Forum" },
  { href: "/store", label: "Store" },
  { href: "/games", label: "Games" },
  { href: "/contact", label: "Contact" },
  { href: "/extras", label: "Extras" },
  { href: "/login", label: "Login" },
];

//Breakpoint for media query
const breakpoint = 720;

export default function Navbar() {
  const pathName: string = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const menuIcon = (
    <svg
      className={classNames(styles.menuIcon, { [styles.open]: menuOpen })}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 122.88 95.95"
    >
      <path
        d="M8.94 0h105c4.92 0 8.94 4.02 8.94 8.94s-4.02 8.94-8.94 8.94h-105C4.02 17.88 0 13.86 0 8.94S4.02 0 8.94 0zm0 78.07h105c4.92 0 8.94 4.02 8.94 8.94s-4.02 8.94-8.94 8.94h-105C4.02 95.95 0 91.93 0 87.01s4.02-8.94 8.94-8.94zm0-39.04h105c4.92 0 8.94 4.02 8.94 8.94s-4.02 8.94-8.94 8.94h-105C4.02 56.91 0 52.89 0 47.97c0-4.91 4.02-8.94 8.94-8.94z"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
        }}
      />
    </svg>
  );

  useEffect(() => {
    if (menuOpen && menuRef.current && createFocusTrap) {
      const focusTrap = createFocusTrap(menuRef.current, {
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        onDeactivate: closeMenu,
      });

      // Activate focus trap if window width is less than the breakpoint
      if (window.innerWidth <= breakpoint) {
        focusTrap.activate();
      }

      window.addEventListener("resize", handleResize);
      function handleResize() {
        // Deactivate focus trap if window width exceeds the breakpoint
        if (window.innerWidth > breakpoint) focusTrap.deactivate();
      }

      return () => {
        window.removeEventListener("resize", handleResize);
        focusTrap.deactivate();
      };
    }
  }, [menuOpen]);

  //For opening / closing mobile menu
  function toggleMenu() {
    if (menuClosing) return;
    menuOpen ? closeMenu() : openMenu();
  }

  //Opens the menu
  function openMenu() {
    setMenuClosing(false);
    setMenuOpen(true);
    document.body.classList.add("menu-open"); //Must have this class in global styles to overflow: none
  }

  //Closes the menu
  function closeMenu() {
    setMenuOpen(false);
    setMenuClosing(true);
    document.body.classList.remove("menu-open"); //Must have this class in global styles to overflow: none
    setTimeout(() => {
      setMenuClosing(false);
    }, 150);
  }

  return (
    <nav className={styles.navbar} aria-label="Main">
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        aria-expanded={menuOpen ? "true" : "false"}
      >
        {menuIcon}
      </button>
      <div
        className={classNames(
          styles.navMenuContainer,
          { [styles.open]: menuOpen },
          { [styles.closing]: menuClosing }
        )}
      >
        <ul
          ref={menuRef}
          className={classNames(
            styles.navMenu,
            { [styles.open]: menuOpen },
            { [styles.closing]: menuClosing }
          )}
        >
          {navLinks.map(({ href, label }) => (
            <li
              key={href}
              className={classNames(styles.navItem, {
                [styles.active]: pathName === href,
                [styles.open]: menuOpen,
                [styles.closing]: menuClosing,
              })}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
