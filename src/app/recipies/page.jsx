import AllRecipies from '@/components/allRecipies/AllRecipies';
import styles from './recipies.module.css';

const recipe = () => {
	return (
		<div className={styles.container}>
			<AllRecipies />
		</div>
	);
};

export default recipe;
