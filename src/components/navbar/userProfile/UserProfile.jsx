'use client';
import Link from 'next/link';
import styles from './userProfile.module.css';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';

const UserProfile = ({ user }) => {
	const { logout } = useAuth();
	const [visible, setVisible] = useState(false);

	const profileCardRef = useRef(null);

	const handleLogout = async () => {
		await logout();
	};

	const toggleProfileCard = () => {
		setVisible(!visible);
	};

	// Hide the profile card when clicking outside of it
	const handleClickOutside = (event) => {
		if (
			profileCardRef.current &&
			!profileCardRef.current.contains(event.target)
		) {
			setVisible(false);
		}
	};

	useEffect(() => {
		if (visible) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [visible]);

	return (
		<div className={styles.container}>
			<div className={styles.profile} onClick={toggleProfileCard}>
				<Image
					className={styles.avatar}
					src={user?.avatar || '/avatar.png'}
					alt="avatar"
					width={40}
					height={40}
				/>
			</div>

			{visible && (
				<div ref={profileCardRef} className={styles.profileCard}>
					<div className={styles.top}>
						<p>{user?.email}</p>
						<Image
							className={styles.closeBtn}
							src={'/close.png'}
							alt="close"
							width={20}
							height={20}
							onClick={toggleProfileCard}
						/>
					</div>

					<div className={styles.middle}>
						<div className={styles.imgContainer}>
							<Image
							className={styles.avatar}
								src={user?.avatar || '/avatar.png'}
								alt="avatar"
								width={70}
								height={70}
							/>
						</div>
						<p>Hi, {user?.fullName}!</p>
					</div>

					<div className={styles.bottom}>
						<Link href={'/profile'} className={styles.btn}>
							Profile
						</Link>
						<Link href={'/'} className={styles.btn} onClick={handleLogout}>
							Logout{' '}
							<Image src={'/logout.png'} alt="logout" width={10} height={10} />
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
