import styles from './messageBox.module.css';

const MessageBox = ({ message, success }) => {
	return (
		<div
			className={`${styles.container} ${
				success ? styles.success : styles.failed
			}`}>
			<p className={styles.message}>{message}</p>
		</div>
	);
};

export default MessageBox;
