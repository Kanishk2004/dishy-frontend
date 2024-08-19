'use client';
import { useAuth } from '@/context/AuthContext';
import styles from './leftBar.module.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const LeftBar = () => {
	const { logout } = useAuth();

	const searchParams = useSearchParams();
	const paramValue = searchParams.get('section');

	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div
					className={`${styles.tab} ${
						paramValue === 'profile' && styles.active
					}`}
					onClick={() => router.push('/profile?section=profile')}>
					Manage Account
					<Image
						src={'/manageAccountTabs/avatar.png'}
						alt="user"
						width={20}
						height={20}
					/>
				</div>
				<div
					className={`${styles.tab} ${
						paramValue === 'myRecipe' && styles.active
					}`}
					onClick={() => router.push('/profile?section=myRecipe')}>
					My Recipies
					<Image
						src={'/manageAccountTabs/myrecipe.png'}
						alt="user"
						width={20}
						height={20}
					/>
				</div>
				<div
					className={`${styles.tab} ${
						paramValue === 'postRecipe' && styles.active
					}`}
					onClick={() => router.push('/profile?section=postRecipe')}>
					Post Recipe
					<Image
						src={'/manageAccountTabs/post.png'}
						alt="user"
						width={20}
						height={20}
					/>
				</div>
				<div
					className={`${styles.tab} ${paramValue === 'stats' && styles.active}`}
					onClick={() => router.push('/profile?section=stats')}>
					Stats
					<Image
						src={'/manageAccountTabs/stats.png'}
						alt="user"
						width={20}
						height={20}
					/>
				</div>
				<div
					className={`${styles.tab} ${
						paramValue === 'favorites' && styles.active
					}`}
					onClick={() => router.push('/profile?section=favorites')}>
					Favorites
					<Image
						src={'/manageAccountTabs/favorite.png'}
						alt="user"
						width={20}
						height={20}
					/>
				</div>
				<div
					className={`${styles.tab} ${styles.logout}`}
					onClick={() => logout()}>
					<p>Logout</p>
					<Image
						src={'/logout.png'}
						className={styles.logoutImg}
						alt="logout"
						width={20}
						height={20}
					/>
				</div>
			</div>
		</div>
	);
};

export default LeftBar;
