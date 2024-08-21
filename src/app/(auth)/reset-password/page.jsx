import styles from './resetPassword.module.css';
import NewPasswordForm from '@/components/newPasswordForm/NewPasswordForm';

const resetPassword = () => {
	return (
		<div className={styles.container}>
			<NewPasswordForm />
		</div>
	);
};

export default resetPassword;
