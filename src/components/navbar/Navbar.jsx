'use client';
import Link from 'next/link';
import styles from './navbar.module.css';
import UserProfile from './userProfile/UserProfile';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { apiURL } from '@/Constant';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import MobileMenu from './mobileMenu/MobileMenu';

const Navbar = () => {
	let { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
	const [open, setOpen] = useState(false);

	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		const fetchUser = async () => {
			if (!isAuthenticated) {
				try {
					let response = await fetch(`${apiURL}/users/me`, {
						method: 'GET',
						credentials: 'include',
					});
					response = await response.json();

					if (response.success) {
						setIsAuthenticated(true);
						setUser(response.data);
						router.push('/recipies');
					}
					if (!response.success) {
						setIsAuthenticated(false);
						setUser(null);
					}
				} catch (error) {
					console.log('Something went wrong');
				}
			}
		};
		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleMenu = () => {
		setOpen(!open);
	};

	return (
		<div className={styles.container}>
			<Link href={'/'} className={styles.logo}>
				dishy
			</Link>

			<div className={styles.links}>
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
			</div>
			<div className={styles.profileDiv}>
				{isAuthenticated ? (
					<UserProfile user={user} onClick={() => setOpen(false)} />
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

				<div className={styles.menuIcon} onClick={toggleMenu}>
					<Image src={'/menu.png'} alt="menu" width={35} height={35} />
				</div>
			</div>
			{open && (
				<MobileMenu
					open={open}
					setOpen={setOpen}
					isAuthenticated={isAuthenticated}
				/>
			)}
		</div>
	);
};

export default Navbar;
