'use client';
import styles from './rightBar.module.css';
import ManageAccount from '../rightBar/manageAccount/ManageAccount';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';
import MyRecipe from './myRecipe/MyRecipe';
import PostRecipe from './postRecipe/PostRecipe';
import Favorites from './favorites/Favorites';
import { useSearchParams } from 'next/navigation';

const RightBar = () => {
	const searchParams = useSearchParams();
	const paramValue = searchParams.get('section');

	return (
		<div className={styles.container}>
			<Suspense fallback={<Loading />}>
				{paramValue === 'profile' && <ManageAccount />}
				{paramValue === 'myRecipe' && <MyRecipe />}
				{paramValue === 'postRecipe' && <PostRecipe />}
				{paramValue === 'stats' && <h2>Stats - Under Development...</h2>}
				{paramValue === 'favorites' && <Favorites />}
			</Suspense>
		</div>
	);
};

export default RightBar;
