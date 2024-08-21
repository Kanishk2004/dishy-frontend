'use client';
import { useState } from 'react';
import styles from './newPasswordForm.module.css';
import { apiURL } from '@/Constant';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const paramValue = searchParams.get('token');

	const { setMessage } = useAuth();
	const [password, setPassword] = useState('');
	const [confPassword, setConfPassword] = useState('');

	const [passMatch, setPassMatch] = useState(true);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confPassword) {
			setPassMatch(false);
		}
		if (password === confPassword) {
			try {
				let res = await fetch(`${apiURL}/users/forgot-password`, {
					method: 'PATCH',
					body: JSON.stringify({
						newPassword: password,
						token: paramValue,
					}),
					headers: {
						'Content-type': 'application/json',
					},
					credentials: 'include',
				});
				res = await res.json();
				if (res.success) {
					setMessage({
						success: true,
						message: res.message,
					});
					router.push('/login');
				}
				if (!res.success) {
					setMessage({
						success: false,
						message: res.message,
					});
				}
			} catch (error) {
				console.log('Something went wrong');
			}
		}
	};

	return (
		<div className={styles.container} onSubmit={(e) => handleSubmit(e)}>
			<form className={styles.form}>
				<h2>Create New Password</h2>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<input
					type="password"
					name="confPassword"
					id="confPassword"
					placeholder="Confirm Password"
					onChange={(e) => setConfPassword(e.target.value)}
					value={confPassword}
				/>
				{!passMatch && <p className={styles.red}>password does not match!</p>}
				<button type="submit">Change Password</button>
			</form>
		</div>
	);
};

export default NewPasswordForm;
