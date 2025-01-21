import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { TailcastLogo } from '../assets/logos/TailcastLogo';
import { GithubIcon } from '../assets/icons/GithubIcon';
import '../styles/navbar.css';

const navbarLinks = [
  { label: 'Home', href: '/#home', ariaLabel: 'Home' },
  {
    label: 'Services',
    href: '/#features',
    ariaLabel: 'Services',
    children: [
      { label: 'Embroidery', href: 'los-angeles-heat-transfer', ariaLabel: 'Sub-feature 3' },
      { label: 'Screen Printing', href: '../custom-patches-los-angeles', ariaLabel: 'Sub-feature 4' },
      { label: 'DTG', href: '/sub-feature5', ariaLabel: 'Sub-feature 5'},
      { label: 'Digital Sublimation', href: '/sub-feature6', ariaLabel: 'Sub-feature 6'},
      { label: 'Heat Transfer', href: '/sub-feature7', ariaLabel: 'Sub-feature 7'},
      { label: 'Cut & Saw', href: '/sub-feature6', ariaLabel: 'Sub-feature 6'},
    ],
  },
  { label: 'Gallery', href: '../custom-embroidery-services', ariaLabel: 'Gallery' },
  { label: 'Events', href: '/#feedback', ariaLabel: 'Events' },
  { label: 'Free Quote', href: '/#FAQ', ariaLabel: 'Free Quote' },
  { label: 'About Us', href: '/#FAQ', ariaLabel: 'About Us' },
  { label: 'Contact', href: '/#FAQ', ariaLabel: 'Contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
          <a href="/#home" aria-label="Home">
            <div className="navbar-logo">
              <div className="logo-icon">
                <TailcastLogo />
              </div>
              <div className="logo-text"></div>
            </div>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
          <div className="navbar-links">
            {navbarLinks.map(({ href, label, ariaLabel, children }) => (
              <div key={label} className="nav-item" onMouseEnter={() => children && setSubMenuOpen(true)} onMouseLeave={() => children && setSubMenuOpen(false)}>
                <a className="nav-link" href={href} aria-label={ariaLabel} onClick={children ? toggleSubMenu : null}>
                  {label}
                  {children && (
                    <span className="submenu-icon">
                      {subMenuOpen ? <>&#9650;</> : <>&#9660;</>}
                    </span>
                  )}
                </a>
                {children && (
                  <AnimatePresence>
                    {subMenuOpen && (
                      <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0 }} className="submenu">
                        {children.map((child) => (
                          <div key={child.label} className="submenu-item">
                            <a href={child.href} className="submenu-link">
                              {child.label}
                            </a>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
          <div className="contact-button">
            <a className="contact-link" href="https://github.com/matt765/Tidestream" target="_blank" aria-label="source code">
              Call: (323)584-3000
            </a>
          </div>
        </motion.div>

        <div className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
            <div className="mobile-navbar">
              {navbarLinks.map(({ label, href, ariaLabel, children }) => (
                <div key={label} className="mobile-nav-item">
                  <a href={href} className="mobile-nav-link" onClick={children && label === 'Services' ? toggleSubMenu : () => setIsOpen(false)} aria-label={ariaLabel}>
                    {label}
                    {children && (
                      <span className="submenu-icon">
                        {subMenuOpen ? <>&#9650;</> : <>&#9660;</>}
                      </span>
                    )}
                  </a>
                  {children && subMenuOpen && (
                    <ul className="mobile-submenu">
                      {children.map((child) => (
                        <li key={child.label} className="mobile-submenu-item">
                          <a href={child.href} className="mobile-submenu-link" onClick={() => setIsOpen(false)}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <a className="contact-link" href="https://github.com/matt765/Tidestream" target="_blank">
                Call: (323)584-3000
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
