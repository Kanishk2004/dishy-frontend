'use client';
import Link from 'next/link';
import styles from './navbar.module.css';
import UserProfile from './userProfile/UserProfile';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import MessageBox from '../messageBox/MessageBox';
import { apiURL } from '@/Constant';

const Navbar = () => {
	let {
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		message,
		setMessage,
	} = useAuth();

	// const router = useRouter();

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
						// router.push('/recipe');
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

	console.log('Is Authenticated? = ', isAuthenticated);

	setTimeout(() => {
		setMessage(null);
	}, 2000);

	return (
		<div className={styles.container}>
			{message && (
				<MessageBox message={message?.message} success={message?.success} />
			)}

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

			{isAuthenticated ? (
				<UserProfile user={user} />
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
