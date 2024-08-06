import styles from './recipe.module.css';

const recipe = ({ params }) => {
	const { slug } = params;
	return (
		<div className={styles.container}>
			<h1>{slug}</h1>
		</div>
	);
};

export default recipe;
