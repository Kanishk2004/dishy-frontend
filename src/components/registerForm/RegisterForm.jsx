'use client';
import { useState } from 'react';
import styles from './registerForm.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// username
// fullName
// email
// password
// avatar
// phone

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');

	const router = useRouter();

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			let response = await fetch(
				'http://localhost:8080/api/v1/users/register',
				{
					method: 'POST',
					body: JSON.stringify({
						username,
						fullName,
						email,
						password,
						phone,
					}),
					headers: {
						'Content-type': 'application/json',
					},
					credentials: 'include',
				}
			);

			response = await response.json();

			if (response.success) {
				router.push('/login');
			} else {
				console.error('Login failed: ', response.message);
			}
		} catch (error) {
			console.log('Error: ', error);
		}
	};
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Register New Account</h2>

			<form className={styles.form} onSubmit={handleRegister}>
				<input
					type="username"
					name="username"
					id="username"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
				<input
					type="fullName"
					name="fullName"
					id="fullName"
					placeholder="Full Name"
					onChange={(e) => setFullName(e.target.value)}
					value={fullName}
				/>
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
				<input
					type="tel"
					name="phone"
					id="phone"
					placeholder="Contact Number"
					onChange={(e) => setPhone(e.target.value)}
					value={phone}
				/>
				<input
					type="file"
					name="avatar"
					id="avatar"
					placeholder="Profile pic"
					// onChange={(e) => setPassword(e.target.value)}
					// value={phone}
				/>
				<button type="submit">Register</button>
			</form>
			<p>
				Alrady have an account?{' '}
				<Link href={'/login'}>
					<b>Log In</b>
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
