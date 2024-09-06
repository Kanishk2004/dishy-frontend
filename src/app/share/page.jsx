import ShareRecipe from '@/components/shareRecipe/ShareRecipe';
import styles from './shareRecipe.module.css';

const page = () => {
	return (
		<div className={styles.container}>
			<ShareRecipe />
		</div>
	);
};

export default page;
