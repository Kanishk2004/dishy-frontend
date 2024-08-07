import Image from 'next/image';
import styles from './authorCard.module.css';

const AuthorCard = ({ avatar, fullName, createdAt }) => {
	return (
		<div className={styles.authorDetail}>
			<Image src={avatar} alt="author img" width={40} height={40} />
			<div>
				<p>Author</p>
				<p>
					<b>{fullName}</b>
				</p>
			</div>
			<div>
				<p>Published</p>
				<p>
					<b>{createdAt}</b>
				</p>
			</div>
		</div>
	);
};

export default AuthorCard;
