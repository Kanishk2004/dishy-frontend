'use client';
import Link from 'next/link';
import styles from './userProfile.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const UserProfile = () => {

    const {setIsAuthenticated} = useAuth();

	const router = useRouter();

	const handleLogout = async () => {
		try {
			let response = await fetch('http://localhost:8080/api/v1/users/logout', {
				method: 'POST',
				credentials: 'include',
			});

			response = await response.json();

			if (response.success) {
				setIsAuthenticated(false);
				router.push('/login');
			} else {
				console.error('Logout failed: ', response.message);
			}
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	return (
		<div className={styles.container}>
			<Link href={'/'} className={styles.button} onClick={handleLogout}>
				Logout
			</Link>
			<Link href={'/profile'}>
				<div className={styles.profile}>
					<Image src={'/avatar.png'} alt="avatar" width={40} height={40} />
				</div>
			</Link>
		</div>
	);
};

export default UserProfile;
