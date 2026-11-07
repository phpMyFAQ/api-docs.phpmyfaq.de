import React from 'react';
import Icon from './Icon';

const SITE_URL = 'https://www.phpmyfaq.de';

// Evaluated once per build of this module, not on every render.
const currentYear = new Date().getFullYear();

const columns = [
  {
    title: 'Getting started',
    links: [
      ['Requirements', '/requirements'],
      ['Download', '/download'],
      ['Changelog', '/changelog'],
      ['Download Archive', '/archive'],
      ['Security Advisories', '/advisories'],
      ['Security', '/security'],
      ['Translations', '/translations'],
      ['Theme Builder', '/theme-builder'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['News archive', '/news/'],
      ['Donations', '/donations'],
      ['Who uses phpMyFAQ?', '/references'],
      ['Digital Sovereignty', '/sovereignty'],
      ['25 years phpMyFAQ (2026)', '/25years'],
      ['20 years phpMyFAQ (2021)', '/20years'],
      ['15 years phpMyFAQ (2016)', '/15years'],
      ['10 years phpMyFAQ (2011)', '/10years'],
    ],
  },
  {
    title: 'Misc',
    links: [
      ['Thank you!', '/thankyou'],
      ['Terms of Service', '/terms'],
      ['Imprint', '/imprint'],
      ['Privacy Notice', '/privacy'],
    ],
  },
] as const;

export default function Footer(): React.ReactElement {
  return (
    <>
      <section className="site-footer-top">
        <div className="container">
          <h2 className="visually-hidden">Other interesting links</h2>
          <div className="site-footer-grid">
            {columns.map((column) => (
              <div key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map(([label, path]) => (
                    <li key={path}>
                      <a href={`${SITE_URL}${path}`}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="site-footer-social">
            <h3>Get Connected</h3>
            <ul className="site-footer-social__icons">
              <li>
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://github.com/thorsten/phpMyFAQ"
                  aria-label="phpMyFAQ at Github"
                >
                  <Icon name="brand-github" />
                </a>
              </li>
              <li>
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://www.facebook.com/phpMyFAQ/"
                  aria-label="phpMyFAQ at Facebook"
                >
                  <Icon name="brand-facebook" />
                </a>
              </li>
              <li>
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://discord.gg/wszhTceuNM"
                  aria-label="phpMyFAQ Discord Community"
                >
                  <Icon name="brand-discord" />
                </a>
              </li>
              <li>
                <a rel="nofollow" href="mailto:thorsten@phpmyfaq.de" aria-label="Mail me!">
                  <Icon name="envelope" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <small className="site-footer__copyright">
            &copy; 2001-{currentYear} | Developed with <Icon name="heart" /> by Thorsten Rinne and the phpMyFAQ Team |
            All rights reserved.
          </small>
        </div>
      </footer>
    </>
  );
}
