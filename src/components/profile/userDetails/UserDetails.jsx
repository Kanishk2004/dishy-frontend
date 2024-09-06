import Image from 'next/image';
import styles from './userDetails.module.css';

const UserDetails = ({ userProfile, setEditMode }) => {
	return (
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
					<button onClick={() => setEditMode(true)}>Edit Profile</button>
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
	);
};

export default UserDetails;
