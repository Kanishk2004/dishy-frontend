'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import styles from '../navbar.module.css';

const MobileMenu = ({ open, setOpen, isAuthenticated }) => {
	const menuRef = useRef(null);

	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setOpen(false);
		}
	};
	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]);

	return (
		<div ref={menuRef} className={styles.mobileMenu}>
			<div className={styles.mobileLinks}>
				<Link href={'/'} className={styles.link}>
					Home
				</Link>
				<Link href={'/recipies'} className={styles.link}>
					Recipies
				</Link>
				<Link href={'/blog'} className={styles.link}>
					Blog
				</Link>
				<Link href={'/about'} className={styles.link}>
					About
				</Link>
				{!isAuthenticated && (
					<div className={styles.mobileButtons}>
						<Link href={'/login'} className={styles.button}>
							Log in
						</Link>
						<Link href={'/register'} className={styles.button}>
							Sign up
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default MobileMenu;
