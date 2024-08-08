import AllRecipies from '@/components/allRecipies/AllRecipies';
import styles from './recipies.module.css';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';

const recipe = () => {
	return (
		<div className={styles.container}>
			<Suspense fallback={<Loading />}>
				<AllRecipies />
			</Suspense>
		</div>
	);
};

export default recipe;
