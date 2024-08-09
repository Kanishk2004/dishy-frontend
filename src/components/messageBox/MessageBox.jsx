'use client';
import { useAuth } from '@/context/AuthContext';
import styles from './messageBox.module.css';

const MessageBox = () => {
	const { message, setMessage } = useAuth();

	setTimeout(() => {
		setMessage(null);
	}, 2000);

	return (
		<div>
			{message && (
				<div
					className={`${styles.container} ${
						message?.success ? styles.success : styles.failed
					} ${!message && styles.dNone}`}>
					<p className={styles.message}>{message?.message}</p>
				</div>
			)}
		</div>
	);
};

export default MessageBox;
