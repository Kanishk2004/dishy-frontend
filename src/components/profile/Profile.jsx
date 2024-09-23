'use client';
import styles from './profile.module.css';
import { useAuth } from '@/context/AuthContext';
import { Suspense, useEffect, useState } from 'react';
import { apiURL } from '@/Constant';
import Stats from './stats/Stats';
import MyRecipes from './myRecipes/MyRecipes';
import FavRecipes from './favRecipes/FavRecipes';
import Loading from '../loading/Loading';
import UserDetails from './userDetails/UserDetails';
import Ratings from './ratings/Ratings';
import Link from 'next/link';
import EditProfile from './editProfile/EditProfile';
import UserSettings from './userSettings/UserSettings';

const Profile = () => {
	const { user, setUser, setMessage, updateAccount } = useAuth();
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [otp, setOtp] = useState('');
	const [userProfile, setUserProfile] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [settingsMode, setSettingsMode] = useState(false);

	const getUserProfile = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			let res = await fetch(`${apiURL}/users/mystats`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
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
	}, [updateAccount]);

	const sendOtp = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			setProcessing(true);
			let res = await fetch(`${apiURL}/users/verify-email`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
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
			const accessToken = localStorage.getItem('accessToken');
			let res = await fetch(`${apiURL}/users/verify-email`, {
				method: 'PATCH',
				body: JSON.stringify({
					otp,
				}),
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
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
			{user ? (
				<div className={styles.innerContainer}>
					{editMode ? (
						<EditProfile
							userProfile={userProfile}
							setEditMode={setEditMode}
							updateAccount={updateAccount}
						/>
					) : settingsMode ? (
						<UserSettings setSettingsMode={setSettingsMode} />
					) : (
						<UserDetails
							userProfile={userProfile}
							setEditMode={setEditMode}
							setSettingsMode={setSettingsMode}
						/>
					)}
					<Stats
						recipeCount={userProfile?.recipeCount}
						avgRating={userProfile?.averageRating?.toString().slice(0, 3)}
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
								<button
									className={styles.verifyBtn}
									onClick={(e) => submitOtp(e)}>
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
					<Suspense fallback={<Loading />}>
						<MyRecipes />
					</Suspense>
					<Suspense fallback={<Loading />}>
						<FavRecipes />
					</Suspense>
					<Ratings userProfile={userProfile} />
				</div>
			) : (
				<div className={styles.unAuthorized}>
					<h3>Please Login or Create account to access this page</h3>

					<Link href={'/login'} className={styles.authBtn}>
						Login
					</Link>

					<Link href={'/register'} className={styles.authBtn}>
						Register
					</Link>
				</div>
			)}
		</div>
	);
};

export default Profile;
