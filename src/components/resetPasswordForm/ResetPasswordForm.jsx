'use client';
import { apiURL } from '@/Constant';
import styles from './resetPasswordForm.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const ResetPasswordForm = () => {
	const { setMessage } = useAuth();

	const [email, setEmail] = useState('');
	const [mailSent, setMailSent] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			let res = await fetch(`${apiURL}/users/forgot-password`, {
				method: 'POST',
				body: JSON.stringify({
					email,
				}),
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});
			res = await res.json();
			setLoading(false);
			if (res.success) {
				setMailSent(true);
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
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
				{!mailSent && (
					<div>
						<h2 className={styles.heading}>
							Enter Your Registered Email Address
						</h2>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<button type="submit">
							{loading ? (
								<Image
									src={'/circle-loading.gif'}
									alt="loading"
									width={20}
									height={20}
								/>
							) : (
								'Send Email'
							)}
						</button>
					</div>
				)}
				{mailSent && (
					<div className={styles.mailSent}>
						<h3 className={styles.green}>Check Your Email Inbox</h3>
					</div>
				)}
			</form>
		</div>
	);
};

export default ResetPasswordForm;
