import ResetPasswordForm from '@/components/resetPasswordForm/ResetPasswordForm';
import styles from './forgotPassword.module.css';

const forgotPassword = () => {
	return (
		<div className={styles.container}>
			<ResetPasswordForm />
		</div>
	);
};

export default forgotPassword;
