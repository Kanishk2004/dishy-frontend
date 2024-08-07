import styles from './prepTime.module.css';

const PrepTime = ({ cookTime, prepTime, totalTime }) => {
	return (
		<div className={styles.container}>
			<h3>Preparation Time</h3>
			<ul>
				<li>
					<b>Total: </b>Approximately {totalTime} minutes
				</li>
				<li>
					<b>Preparation: </b>
					{prepTime} minutes
				</li>
				<li>
					<b>Cooking: </b>
					{cookTime} minutes
				</li>
			</ul>
		</div>
	);
};

export default PrepTime;
