'use client';
import Image from 'next/image';
import styles from './profile.module.css';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const Profile = () => {
	const { user } = useAuth();
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [processing, setProcessing] = useState(false);

	const sendOtp = async () => {
		try {
			setProcessing(true);
			let res = await fetch(`${apiURL}/users/verify-email`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});

			res = await res.json();
			if (res.success) {
				setIsOtpSent(true);
			}
			setProcessing(false);
		} catch (error) {
			console.log('Something went wrong');
			setProcessing(false);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.topContainer}>
				<div className={styles.imgContainer}>
					<Image
						className={styles.profileImg}
						src={user?.avatar || '/avatar.png'}
						alt="avatar"
						width={150}
						height={150}
						priority={false}
					/>
				</div>
				<div className={styles.userInfo}>
					<div className={styles.nameContainer}>
						<h6>{user?.username}</h6>
						<h5>{user?.fullName}</h5>
					</div>
					<div className={styles.bioContainer}>
						<p>{user?.bio}</p>
					</div>
					<div className={styles.profileBtnContainer}>
						<button>Edit Profile</button>
					</div>
				</div>
			</div>
			<div className={styles.contactContainer}>
				<div className={styles.upperContainer}>
					<div>
						<p>Email: </p>
						<h5>
							{user?.email}
							<span
								className={user?.isEmailVerified ? styles.green : styles.red}>
								<i>{user?.isEmailVerified ? 'verified' : 'unverified'}</i>
							</span>
						</h5>
					</div>
					<div>
						<p>Phone: </p>
						<h5>
							{user?.phone}
							<span
								className={user?.isPhoneVerified ? styles.green : styles.red}>
								<i>{user?.isPhoneVerified ? 'verified' : 'unverified'}</i>
							</span>
						</h5>
					</div>
				</div>
				{isOtpSent && (
					<div className={styles.otpContainer}>
						<p>Enter OTP sent to your email address.</p>
						<input type="text" placeholder="Enter your OTP" />
					</div>
				)}
				<div className={styles.btnContainer}>
					<div className={styles.verifyBtn} onClick={sendOtp}>
						Verify Email
					</div>
					<div className={styles.verifyBtn}>Verify Phone</div>
				</div>
				{processing && <p>Sending OTP on your email address...</p>}
			</div>
		</div>
	);
};

export default Profile;
