import { useEffect, useState } from 'react';
import styles from './editForm.module.css';

const EditForm = ({ user, updateAccount }) => {
	const [username, setUsername] = useState('');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [bio, setBio] = useState('');

	const [isReadOnly, setIsReadOnly] = useState(true);

	useEffect(() => {
		setUsername(user?.username);
		setFullName(user?.fullName);
		setEmail(user?.email);
		setPhone(user?.phone);
		setBio(user?.bio);
	}, [user]);

	const handleEditClick = () => {
		setIsReadOnly(false);
	};

	const handleSave = async () => {
		await updateAccount(username, fullName, email, phone, bio);
		setIsReadOnly(true);
	};

	return (
		<form className={styles.infoForm}>
			<div className={styles.inputContainer}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					readOnly={isReadOnly}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			<div className={styles.inputContainer}>
				<label htmlFor="fullName">Full Name</label>
				<input
					type="text"
					name="fullName"
					id="fullName"
					readOnly={isReadOnly}
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
			</div>

			<div className={styles.inputContainer}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					readOnly={isReadOnly}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{user?.isEmailVerified ? (
					<span className={styles.verified}>
						<i>verified</i>
					</span>
				) : (
					<span className={styles.unVerified}>
						<i>unverified</i>
					</span>
				)}
			</div>

			<div className={styles.inputContainer}>
				<label htmlFor="Mobile">Mobile</label>
				<input
					type="tel"
					name="mobile"
					id="mobile"
					readOnly={isReadOnly}
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				{user?.isPhoneVerified ? (
					<span className={styles.verified}>
						<i>verified</i>
					</span>
				) : (
					<span className={styles.unVerified}>
						<i>unverified</i>
					</span>
				)}
			</div>

			<div className={styles.inputContainer}>
				<label htmlFor="bio">Bio</label>
				<textarea
					type="text"
					name="bio"
					id="bio"
					readOnly={isReadOnly}
					value={bio}
					onChange={(e) => setBio(e.target.value)}
				/>
			</div>

			{isReadOnly ? (
				<div className={styles.editBtn} onClick={handleEditClick}>
					Edit
				</div>
			) : (
				<div
					className={`${styles.editBtn} ${styles.saveBtn}`}
					onClick={handleSave}>
					Save
				</div>
			)}
		</form>
	);
};

export default EditForm;
