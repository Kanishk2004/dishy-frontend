'use client';
import Image from 'next/image';
import styles from './manageAccount.module.css';
import { useAuth } from '@/context/AuthContext';
import EditForm from './editForm/EditForm';
import { useState } from 'react';
import ImageForm from './imageForm/ImageForm';
import { apiURL } from '@/Constant';

const ManageAccount = () => {
	const { user, updateAccount, setUser, setMessage } = useAuth();

	const [imageForm, setImageForm] = useState(false);
	const [verifyEmailOtp, setVerifyEmailOtp] = useState(false);
	const [otp, setOtp] = useState('');
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');

	const [otpSent, setOtpSent] = useState(false);
	const [changePasswordMode, setChangePasswordMode] = useState(false);

	const sendOtp = async () => {
		try {
			setOtpSent(true);
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
			setOtpSent(false);
		} catch (error) {
			console.log('Something went wrong');
			setOtpSent(false);
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

	const handleChangePassword = async (e) => {
		e.preventDefault();
		try {
			let res = await fetch(`${apiURL}/users/change-password`, {
				method: 'POST',
				body: JSON.stringify({
					oldPassword: oldPass,
					newPassword: newPass,
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
					message: 'Password updated successfully',
				});
				setChangePasswordMode(false);
			}
		} catch (error) {
			console.log('Something went wrong');
			setMessage({
				success: false,
				message: 'Password updated failed',
			});
			setChangePasswordMode(false);
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
					<div className={styles.verificationDiv}>
						<button
							className={`${styles.verificationBtn} ${styles.yellowBtn}`}
							onClick={() => setChangePasswordMode(true)}>
							Change Password
						</button>
					</div>
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
			{changePasswordMode && (
				<div className={styles.verifyOtpContainer}>
					<div>
						<form className={styles.otpForm}>
							<input
								type="password"
								id="oldPass"
								name="oldPass"
								placeholder="Enter Old Password"
								onChange={(e) => setOldPass(e.target.value)}
							/>
							<input
								type="password"
								id="newPass"
								name="newPass"
								placeholder="Enter New Password"
								onChange={(e) => setNewPass(e.target.value)}
							/>
							<button onClick={(e) => handleChangePassword(e)}>Save</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ManageAccount;
