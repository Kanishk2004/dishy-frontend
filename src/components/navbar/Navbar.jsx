'use client';
import Link from 'next/link';
import styles from './navbar.module.css';
import UserProfile from './userProfile/UserProfile';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import MessageBox from '../messageBox/MessageBox';

const Navbar = () => {
	let {
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		message,
		setMessage,
	} = useAuth();

	useEffect(() => {
		const fetchUser = async () => {
			fetch('http://localhost:8080/api/v1/users/me', {
				method: 'GET',
				credentials: 'include',
			})
				.then((res) => res.json())
				.then((res) => {
					setIsAuthenticated(true);
					setUser(res.data);
				})
				.catch((err) => {
					setIsAuthenticated(false);
					setUser(null);
					console.log(err);
				});
		};
		fetchUser();
	}, [isAuthenticated, setIsAuthenticated, setUser]);

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
