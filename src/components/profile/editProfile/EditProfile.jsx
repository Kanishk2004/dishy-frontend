import Image from 'next/image';
import styles from './editProfile.module.css';
import { useState } from 'react';
import UpdateAvatarCard from './updateAvatarCard/UpdateAvatarCard';

const EditProfile = ({ userProfile, setEditMode, updateAccount }) => {
	const [username, setUsername] = useState(userProfile?.username);
	const [fullName, setFullName] = useState(userProfile?.fullName);
	const [email, setEmail] = useState(userProfile?.email);
	const [phone, setPhone] = useState(userProfile?.phone);
	const [bio, setBio] = useState(userProfile?.bio);

	const [imageEditMode, setImageEditMode] = useState(false);

	const [loading, setLoading] = useState(false);

	const handleSave = async (e) => {
		e.preventDefault();
		setLoading(true);
		await updateAccount(username, fullName, email, phone, bio);
		setLoading(false);
		setEditMode(false);
	};

	return (
		<div className={styles.container}>
			{imageEditMode ? (
				<UpdateAvatarCard
					setImageEditMode={setImageEditMode}
					setEditMode={setEditMode}
				/>
			) : (
				<div>
					<div className={styles.topDiv}>
						<p>Edit Profile</p>
						<button
							className={styles.closeBtn}
							onClick={() => setEditMode(false)}>
							<Image
								src={'/close.png'}
								alt="Close Icon"
								width={25}
								height={25}
							/>
						</button>
					</div>

					<div className={styles.detailSection}>
						<div
							className={styles.imgContainer}
							onClick={() => setImageEditMode(true)}>
							<Image
								className={styles.profileImg}
								src={userProfile?.avatar || '/avatar.png'}
								alt="avatar"
								width={100}
								height={100}
							/>
							<span className={styles.editBtn}>
								<Image src={'/edit.png'} alt="edit" width={20} height={20} />
							</span>
						</div>
						<form>
							<div className={styles.inputContainer}>
								<label htmlFor="username">Username: </label>
								<input
									type="text"
									name="username"
									id="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className={styles.inputContainer}>
								<label htmlFor="fullName">Full Name: </label>
								<input
									type="text"
									name="fullName"
									id="fullName"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
								/>
							</div>
							<div className={styles.inputContainer}>
								<label htmlFor="email">Email: </label>
								<input
									type="email"
									name="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className={styles.inputContainer}>
								<label htmlFor="Mobile">Phone: </label>
								<input
									type="tel"
									name="mobile"
									id="mobile"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							<div className={styles.inputContainer}>
								<label htmlFor="bio">Bio: </label>
								<textarea
									type="text"
									name="bio"
									id="bio"
									rows={5}
									value={bio}
									onChange={(e) => setBio(e.target.value)}
								/>
							</div>
							<button className={styles.saveBtn} onClick={(e) => handleSave(e)}>
								{loading ? 'Please wait...' : 'Save'}
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditProfile;
