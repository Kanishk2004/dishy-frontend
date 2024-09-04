'use client';
import Image from 'next/image';
import styles from './profile.module.css';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { apiURL } from '@/Constant';
import Stats from './stats/Stats';
import MyRecipes from './myRecipes/MyRecipes';
import FavRecipes from './favRecipes/FavRecipes';

const Profile = () => {
	const { setUser, setMessage } = useAuth();
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [otp, setOtp] = useState('');
	const [userProfile, setUserProfile] = useState('');

	const getUserProfile = async () => {
		try {
			let res = await fetch(`${apiURL}/users/mystats`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});
			res = await res.json();
			if (res.success) {
				setUserProfile(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserProfile();
	}, []);

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
			console.log(error);
			setIsOtpSent(false);
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
				setIsOtpSent(false);
			}
		} catch (error) {
			console.log('Something went wrong');
		}
	};

	const verifyPhone = () => {
		setMessage({
			success: false,
			message: 'Phone verification is currently under development',
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.topContainer}>
				<div className={styles.imgContainer}>
					<Image
						className={styles.profileImg}
						src={userProfile?.avatar || '/avatar.png'}
						alt="avatar"
						width={150}
						height={150}
						priority={false}
					/>
				</div>
				<div className={styles.userInfo}>
					<div className={styles.nameContainer}>
						<h6>
							<span className={styles.label}>Username: </span>
							{userProfile?.username}
						</h6>
						<h5>
							<span className={styles.label}>Name: </span>
							{userProfile?.fullName}
						</h5>
					</div>
					<div className={styles.bioContainer}>
						<p>
							<span>Bio: </span>
							{userProfile?.bio}
						</p>
					</div>
					<div className={styles.profileBtnContainer}>
						<button>Edit Profile</button>
						<button className={styles.gearIcon}>
							<Image
								src={'/gearIcon.png'}
								alt="Settings icon"
								width={20}
								height={20}
							/>
						</button>
					</div>
				</div>
			</div>
			<Stats
				recipeCount={userProfile?.recipeCount}
				avgRating={userProfile?.averageRating?.toString().slice(0, 4)}
				totalRating={userProfile?.totalRatings}
				recipesRated={userProfile?.numberOfRecipesRated}
			/>
			<div className={styles.contactContainer}>
				<div className={styles.upperContainer}>
					<div>
						<p>Email: </p>
						<h5>
							{userProfile?.email}
							<span
								className={
									userProfile?.isEmailVerified ? styles.green : styles.red
								}>
								<i>
									{userProfile?.isEmailVerified ? 'verified' : 'unverified'}
								</i>
							</span>
						</h5>
					</div>
					<div>
						<p>Phone: </p>
						<h5>
							{userProfile?.phone}
							<span
								className={
									userProfile?.isPhoneVerified ? styles.green : styles.red
								}>
								<i>
									{userProfile?.isPhoneVerified ? 'verified' : 'unverified'}
								</i>
							</span>
						</h5>
					</div>
				</div>
				{isOtpSent && (
					<div className={styles.otpContainer}>
						<p>Enter OTP sent to your email address.</p>
						<input
							type="text"
							id="otp"
							name="otp"
							placeholder="Enter your OTP"
							onChange={(e) => setOtp(e.target.value)}
						/>
						<button className={styles.verifyBtn} onClick={(e) => submitOtp(e)}>
							Verify
						</button>
					</div>
				)}
				<div className={styles.btnContainer}>
					{userProfile?.isEmailVerified || (
						<button className={styles.verifyBtn} onClick={sendOtp}>
							{processing ? 'Sending OTP...' : 'Verify Email'}
						</button>
					)}
					{userProfile?.isPhoneVerified || (
						<button className={styles.verifyBtn} onClick={verifyPhone}>
							Verify Phone
						</button>
					)}
				</div>
			</div>
			<MyRecipes />
			<FavRecipes />
		</div>
	);
};

export default Profile;
