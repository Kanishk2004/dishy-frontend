'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import styles from '../navbar.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MobileMenu = ({ open, setOpen, isAuthenticated }) => {
	const menuRef = useRef(null);
	const pathname = usePathname();

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
	}, []);

	return (
		<div ref={menuRef} className={styles.mobileMenu}>
			<button className={styles.closeIcon} onClick={() => setOpen(false)}>
				<Image src={'/menuClose.png'} alt="menu" width={20} height={20} />
			</button>
			<div className={styles.mobileLinks}>
				<Link
					href={'/'}
					className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>
					Home
				</Link>
				<Link
					href={'/recipies'}
					className={`${styles.link} ${
						pathname === '/recipies' ? styles.active : ''
					}`}>
					Recipies
				</Link>
				<Link
					href={'/share'}
					className={`${styles.link} ${
						pathname === '/share' ? styles.active : ''
					}`}>
					Add Recipe
				</Link>
				<Link
					href={'/blog'}
					className={`${styles.link} ${
						pathname === '/blog' ? styles.active : ''
					}`}>
					Blog
				</Link>
				<Link
					href={'/about'}
					className={`${styles.link} ${
						pathname === '/about' ? styles.active : ''
					}`}>
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
