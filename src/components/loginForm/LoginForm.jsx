'use client';
import { useState } from 'react';
import styles from './loginForm.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { setIsAuthenticated } = useAuth();

	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			let response = await fetch('http://localhost:8080/api/v1/users/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});

			response = await response.json();

			if (response.success) {
				setIsAuthenticated(true);
				router.push('/');
			} else {
				console.error('Login failed: ', response.message);
			}
		} catch (error) {
			console.log('Error: ', error);
		}
	};
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Log In To Your Account</h2>

			<form className={styles.form} onSubmit={handleLogin} action="/">
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<button type="submit">Log in</button>
			</form>
			<p>
				Don&apos;t have an account?{' '}
				<Link href={'/register'}>
					<b>Register</b>
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
