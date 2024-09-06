import Image from 'next/image';
import styles from './userSettings.module.css';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiURL } from '@/Constant';

const UserSettings = ({ setSettingsMode }) => {
	const { setMessage, logout } = useAuth();
	const [changePasswordMode, setChangePasswordMode] = useState(false);
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [confNewPass, setConfNewPass] = useState('');
	const [saving, setSaving] = useState(false);

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

	const handleDeleteAccount = () => {};

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
						<label htmlFor="newPassw">New Password:</label>
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
						onClick={(e) => handleChangePassword(e)}
						className={styles.saveBtn}>
						{saving ? 'Saving...' : 'Save'}
					</button>
				</form>
			) : (
				<div className={styles.mainContainer}>
					<button
						className={styles.changePassbtn}
						onClick={() => setChangePasswordMode(true)}>
						Change Password
					</button>
					<button className={styles.logoutBtn} onClick={handleLogout}>
						Logout
					</button>
					<button className={styles.logoutBtn} onClick={handleDeleteAccount}>
						Delete Account
					</button>
				</div>
			)}
		</div>
	);
};

export default UserSettings;
