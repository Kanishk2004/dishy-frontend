'use client';
import { useState } from 'react';
import styles from './loginForm.module.css';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Log In To Your Account</h2>

			<form className={styles.form} onSubmit={handleLogin}>
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
				<Link href={'/forgot-password'}>
					<b>Forgot password?</b>
				</Link>
			</p>
			<p>
				Don&apos;t have an account?{' '}
				<Link href={'/register'}>
					<b>Sign Up</b>
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
