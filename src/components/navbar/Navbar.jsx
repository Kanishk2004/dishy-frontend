'use client';
import Link from 'next/link';
import styles from './navbar.module.css';
import UserProfile from './userProfile/UserProfile';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
	let {isAuthenticated} = useAuth();

	return (
		<div className={styles.container}>
			<Link href={'/'} className={styles.logo}>
				dishy
			</Link>

			<div className={styles.links}>
				<Link href={'/'} className={styles.link}>
					Home
				</Link>
				<Link href={'/recipe'} className={styles.link}>
					Recipe
				</Link>
				<Link href={'/blog'} className={styles.link}>
					Blog
				</Link>
				<Link href={'/about'} className={styles.link}>
					About
				</Link>
			</div>

			{isAuthenticated ? (
				<UserProfile />
			) : (
				<div className={styles.buttons}>
					<Link href={'/login'} className={styles.button}>
						Log in
					</Link>
					<Link href={'/register'} className={styles.button}>
						Sign up
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
