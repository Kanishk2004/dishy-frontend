import styles from './profile.module.css';
import Profile from '@/components/profile/Profile';

export const generateMetadata = () => {
	return {
		title: `Dishy - User Profile`,
		description: `Discover a world of culinary delights with Dishy - The Flavor Network! Share your favorite recipes, explore new and exciting dishes, and connect with a community of food enthusiasts. Whether you're a seasoned chef or a home cook, Dishy offers a platform to showcase your culinary creations, get inspired by others, and rate and comment on recipes. Join now and start your flavorful journey with Dishy!`,
	};
};

const profile = () => {
	return (
		<div className={styles.container}>
			<Profile />
		</div>
	);
};

export default profile;
