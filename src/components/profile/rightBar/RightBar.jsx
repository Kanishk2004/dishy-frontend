'use client';
import styles from './rightBar.module.css';
import ManageAccount from '../rightBar/manageAccount/ManageAccount';
import { useAuth } from '@/context/AuthContext';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';
import MyRecipe from './myRecipe/MyRecipe';
import PostRecipe from './postRecipe/PostRecipe';

const RightBar = () => {
	const { activeTab } = useAuth();

	return (
		<div className={styles.container}>
			<Suspense fallback={<Loading />}>
				{activeTab === 'profile' && <ManageAccount />}
				{activeTab === 'myRecipe' && <MyRecipe />}
				{activeTab === 'postRecipe' && <PostRecipe />}
				{activeTab === 'stats' && <h2>Stats</h2>}
				{activeTab === 'favorites' && <h2>Favorites</h2>}
			</Suspense>
		</div>
	);
};

export default RightBar;
