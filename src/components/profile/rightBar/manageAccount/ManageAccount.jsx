'use client';
import Image from 'next/image';
import styles from './manageAccount.module.css';
import { useAuth } from '@/context/AuthContext';
import EditForm from './editForm/EditForm';
import { useState } from 'react';
import ImageForm from './imageForm/ImageForm';
import { apiURL } from '@/Constant';

const ManageAccount = () => {
	const { user, updateAccount, setUser } = useAuth();

	const [imageForm, setImageForm] = useState(false);
	const [verifyEmailOtp, setVerifyEmailOtp] = useState(false);
	const [otp, setOtp] = useState('');

	const [otpSent, setOtpSent] = useState(false);

	const sendOtp = async () => {
		try {
			setOtpSent(true)
			let res = await fetch(`${apiURL}/users/verify-email`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});

			res = await res.json();
			if (res.success) {
				setVerifyEmailOtp(true);
			}
			setOtpSent(false)
		} catch (error) {
			console.log('Something went wrong');
			setOtpSent(false)
		}
	};

	const submitOtp = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch(`${apiURL}/users/verify-email`, {
				method: 'PATCH',
				body: JSON.stringify({
					otp,
				}),
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});

			res = await res.json();
			if (res.success) {
				setUser(res.data);
				setVerifyEmailOtp(false);
			}
		} catch (error) {
			console.log('Something went wrong');
		}
	};

	return (
		<div className={styles.container}>
			{imageForm && <ImageForm setImageForm={setImageForm} />}
			<div className={styles.profile}>
				<div className={styles.profileImgContainer}>
					<Image
						className={styles.profileImg}
						src={user?.avatar || '/avatar.png'}
						alt="avatar"
						width={200}
						height={200}
						priority={false}
					/>

					<span
						className={styles.editBtn}
						onClick={() => setImageForm(!imageForm)}>
						<Image src={'/edit.png'} alt="edit" width={24} height={24} />
					</span>
				</div>

				<h2 className={styles.fullName}>{user?.fullName || 'John Doe'}</h2>
				<p className={styles.bio}>{user?.bio || ''}</p>
			</div>

			<div className={styles.formContainer}>
				<EditForm user={user} updateAccount={updateAccount} />
				<div className={styles.verificationContainer}>
					{!user?.isEmailVerified && (
						<div className={styles.verificationDiv}>
							<button className={styles.verificationBtn} onClick={sendOtp}>
								Verify Email
							</button>
						</div>
					)}
					{!user?.isPhoneVerified && (
						<div className={styles.verificationDiv}>
							<button className={styles.verificationBtn}>Verify Mobile</button>
						</div>
					)}
				</div>
				{otpSent && <p>Generating and sending OTP....</p>}
			</div>
			{verifyEmailOtp && (
				<div className={styles.verifyOtpContainer}>
					<form className={styles.otpForm}>
						<label htmlFor="otp">Check your inbox and provide the OTP</label>
						<input
							type="text"
							id="otp"
							name="otp"
							placeholder="Enter OTP"
							onChange={(e) => setOtp(e.target.value)}
						/>
						<button onClick={(e) => submitOtp(e)}>Verify</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default ManageAccount;
