'use client';
import { useState } from 'react';
import styles from './registerForm.module.css';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiURL } from '@/Constant';

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
	const [isUploading, setIsUploading] = useState(false);

	const { login, setMessage } = useAuth();

	const handleRegister = async (e) => {
		e.preventDefault();

		setIsUploading(true);

		const formData = new FormData();
		formData.append('username', username);
		formData.append('fullName', fullName);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('phone', phone);

		const res = await fetch('/avatar.png');
		const blob = await res.blob();
		formData.append('avatar', blob, 'avatar.png');

		try {
			let response = await fetch(`${apiURL}/users/register`, {
				method: 'POST',
				body: formData,
				credentials: 'include',
			});

			response = await response.json();

			setIsUploading(false);

			if (response.success) {
				await login(email, password);
			} else {
				console.error('Login failed: ', response.message);
			}
		} catch (error) {
			setIsUploading(false);
			setMessage({
				success: false,
				message: 'Something went wrong!',
			});
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
					type="number"
					name="phone"
					id="phone"
					placeholder="Phone"
					onChange={(e) => setPhone(e.target.value)}
					value={phone}
				/>
				<button type="submit">Register</button>
			</form>
			{isUploading && <p>Please wait, Creating user..</p>}
			<p>
				Already have an account?{' '}
				<Link href={'/login'}>
					<b>Log In</b>
				</Link>
			</p>
		</div>
	);
};

export default LoginForm;
