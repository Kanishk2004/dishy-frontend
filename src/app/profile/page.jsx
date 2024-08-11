import LeftBar from '@/components/profile/leftBar/LeftBar';
import styles from './profile.module.css';
import RightBar from '@/components/profile/rightBar/RightBar';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';

export const generateMetadata = () => {
	return {
		title: `Dishy - Account center`,
		description: `Discover a world of culinary delights with Dishy - The Flavor Network! Share your favorite recipes, explore new and exciting dishes, and connect with a community of food enthusiasts. Whether you're a seasoned chef or a home cook, Dishy offers a platform to showcase your culinary creations, get inspired by others, and rate and comment on recipes. Join now and start your flavorful journey with Dishy!`,
	};
};

const profile = () => {
	return (
		<div className={styles.container}>
			<div className={styles.leftBar}>
				<Suspense fallback={<Loading />}>
					<LeftBar />
				</Suspense>
			</div>
			<div className={styles.rightBar}>
				<Suspense fallback={<Loading />}>
					<RightBar />
				</Suspense>
			</div>
		</div>
	);
};

export default profile;
