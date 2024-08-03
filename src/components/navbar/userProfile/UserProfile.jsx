'use client';
import Link from 'next/link';
import styles from './userProfile.module.css';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const UserProfile = ({ user }) => {
	const { logout } = useAuth();

	const handleLogout = async () => {
		await logout();
	};

	return (
		<div className={styles.container}>
			<Link href={'/'} className={styles.button} onClick={handleLogout}>
				Logout
			</Link>
			<Link href={'/profile'}>
				<div className={styles.profile}>
					<Image
						src={user?.avatar || '/avatar.png'}
						alt="avatar"
						width={40}
						height={40}
					/>
				</div>
			</Link>
		</div>
	);
};

export default UserProfile;
