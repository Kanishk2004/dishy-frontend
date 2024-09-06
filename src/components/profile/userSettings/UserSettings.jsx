import Image from 'next/image';
import styles from './userSettings.module.css';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiURL } from '@/Constant';

const UserSettings = ({ setSettingsMode }) => {
	const { setMessage, logout, deleteAccount } = useAuth();
	const [changePasswordMode, setChangePasswordMode] = useState(false);
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [confNewPass, setConfNewPass] = useState('');
	const [saving, setSaving] = useState(false);
	const [deleteAccountMode, setDeleteAccountMode] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const [password, setPassword] = useState('');

	const handleChangePassword = async (e) => {
		e.preventDefault();

		if (newPass !== confNewPass) {
			return setMessage({
				success: false,
				message: 'New and Confirm passwords does not match!',
			});
		}

		setSaving(true);

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
				setSaving(false);
				setChangePasswordMode(false);
				setSettingsMode(false);
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

	const handleLogout = async () => {
		await logout();
	};

	const handleAccountDelete = async () => {
		setDeleting(true);
		await deleteAccount(password);
		setDeleting(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.topDiv}>
				<p>Settings</p>
				<button
					className={styles.closeBtn}
					onClick={() => setSettingsMode(false)}>
					<Image src={'/close.png'} alt="Close Icon" width={20} height={20} />
				</button>
			</div>
			{changePasswordMode ? (
				<form className={styles.changePassForm}>
					<div className={styles.inputContainer}>
						<label htmlFor="oldPass">Old Password:</label>
						<input
							type="password"
							id="oldPass"
							name="oldPass"
							placeholder="Old Password"
							onChange={(e) => setOldPass(e.target.value)}
						/>
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="newPass">New Password:</label>
						<input
							type="password"
							id="newPass"
							name="newPass"
							placeholder="New Password"
							onChange={(e) => setNewPass(e.target.value)}
						/>
					</div>
					<div className={styles.inputContainer}>
						<label htmlFor="confPass">Confirm Password:</label>
						<input
							type="password"
							id="confPass"
							name="confPass"
							placeholder="Confirm New Password"
							onChange={(e) => setConfNewPass(e.target.value)}
						/>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault(); // Prevent default form submission
							handleChangePassword(e);
						}}
						className={styles.saveBtn}>
						{saving ? 'Saving...' : 'Save'}
					</button>
				</form>
			) : deleteAccountMode ? (
				<div className={styles.deleteAccountForm}>
					<div className={styles.deleteAccountInputContainer}>
						<label htmlFor="password">
							Enter Passowrd To Delete Your Account Permanently
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button className={styles.deletebtn} onClick={handleAccountDelete}>
						{deleting ? 'Deleting...' : 'Delete Account Permanently'}
					</button>
				</div>
			) : (
				<div className={styles.mainContainer}>
					<button
						className={styles.changePassbtn}
						onClick={() => {
							setChangePasswordMode(true);
							setDeleteAccountMode(false); // Reset deleteAccountMode
						}}>
						Change Password
					</button>
					<button className={styles.logoutBtn} onClick={handleLogout}>
						Logout
					</button>
					<button
						className={styles.logoutBtn}
						onClick={() => {
							setDeleteAccountMode(true);
							setChangePasswordMode(false); // Reset changePasswordMode
						}}>
						Delete Account
					</button>
				</div>
			)}
		</div>
	);
};

export default UserSettings;
