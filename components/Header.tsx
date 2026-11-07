'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Icon from './Icon';

const SITE_URL = 'https://www.phpmyfaq.de';

const navItems = [
  { label: 'Features', href: `${SITE_URL}/features` },
  { label: 'Documentation', href: `${SITE_URL}/documentation` },
  { label: 'Support', href: `${SITE_URL}/support` },
  { label: 'Download', href: `${SITE_URL}/download` },
];

export default function Header(): React.ReactElement {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__content">
          <div className="site-header__logo">
            <a href={`${SITE_URL}/`}>
              <Image src="/images/logo-transparent.svg" width={199} height={50} alt="Logo of phpMyFAQ" unoptimized />
            </a>
          </div>

          <div className="site-header__nav-container">
            <nav aria-label="Main navigation">
              <button
                type="button"
                className="site-header__nav-toggle"
                onClick={(): void => setIsNavOpen(!isNavOpen)}
                aria-controls="navbar-collapse"
                aria-expanded={isNavOpen}
                aria-label="Toggle navigation"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              <ul id="navbar-collapse" className={`site-header__nav ${isNavOpen ? 'is-open' : ''}`}>
                {navItems.map((item) => (
                  <li key={item.href} className="site-header__nav-item">
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
                <li className="site-header__nav-item is-active">
                  <Link href="/" aria-current="page">
                    API
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="site-header__tools">
              <a
                className="site-header__github"
                href="https://github.com/thorsten/phpMyFAQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="phpMyFAQ on GitHub"
                title="phpMyFAQ on GitHub"
              >
                <Icon name="brand-github" />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
