'use client';
import { useAuth } from '@/context/AuthContext';
import styles from './leftBar.module.css';
import Image from 'next/image';
import { useRecipe } from '@/context/RecipeContext';

const LeftBar = () => {
	const { logout } = useAuth();
	const { activeTab, setActiveTab } = useRecipe();

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div
					className={`${styles.tab} ${
						activeTab === 'profile' && styles.active
					}`}
					onClick={() => setActiveTab('profile')}>
					Manage Account
				</div>
				<div
					className={`${styles.tab} ${
						activeTab === 'myRecipe' && styles.active
					}`}
					onClick={() => setActiveTab('myRecipe')}>
					My Recipies
				</div>
				<div
					className={`${styles.tab} ${
						activeTab === 'postRecipe' && styles.active
					}`}
					onClick={() => setActiveTab('postRecipe')}>
					Post Recipe
				</div>
				<div
					className={`${styles.tab} ${activeTab === 'stats' && styles.active}`}
					onClick={() => setActiveTab('stats')}>
					Stats
				</div>
				<div
					className={`${styles.tab} ${
						activeTab === 'favorites' && styles.active
					}`}
					onClick={() => setActiveTab('favorites')}>
					Favorites
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
