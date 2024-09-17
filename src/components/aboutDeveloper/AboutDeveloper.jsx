import Image from 'next/image';
import styles from './aboutDeveloper.module.css';
import Link from 'next/link';

const AboutDeveloper = () => {
	return (
		<div className={styles.container} id="aboutDeveloper">
			<h2 className={styles.heading}>About Developer</h2>
			<div className={styles.detailsSection}>
				<div className={styles.infoContainer}>
					<div>
						<div className={styles.text}>
							<p>
								<b>Hi, I&apos;m Kanishk Chandna,</b> the creator of Dishy - The
								Flavour Network. I&apos;m a passionate full-stack web developer
								with a deep love for coding and cooking, and I combined these
								two passions to build this platform.
							</p>
							<div className={styles.contactDetailContainer}>
								<div className={styles.contactDetail}>
									<Image
										src={'/aboutpage/email.png'}
										alt="email icon"
										width={20}
										height={20}
									/>
									<p>kanishkchandna29@gmail.com</p>
								</div>
								<div className={styles.contactDetail}>
									<Image
										src={'/aboutpage/phone.png'}
										alt="phone icon"
										width={20}
										height={20}
									/>
									<p>+91 9268815903</p>
								</div>
								<div className={styles.contactDetail}>
									<Image
										src={'/aboutpage/address.png'}
										alt="address icon"
										width={20}
										height={20}
									/>
									<p>Delhi, India</p>
								</div>
							</div>
							<div className={styles.icons}>
								<Link
									href={
										'https://www.linkedin.com/in/kanishk-chandna-9553931b0/'
									}>
									<Image
										alt="linkedin logo"
										src={'/linkedin.png'}
										width={20}
										height={20}
									/>
								</Link>
								<Link href={'https://www.instagram.com/kanishk__fr'}>
									<Image
										alt="instagram"
										src={'/instagram.png'}
										width={20}
										height={20}
									/>
								</Link>
								<Link href={'https://x.com/Kanishk_fr'}>
									<Image
										alt="twitter"
										src={'/twitter.png'}
										width={20}
										height={20}
									/>
								</Link>
							</div>
						</div>
					</div>
					<div className={styles.imgContainer}>
						<Image
							className={styles.avatar}
							src={'/aboutpage/myavatar.png'}
							alt="avatar"
							width={200}
							height={200}
						/>
					</div>
					<div>
						<div className={styles.text}>
							<h4>Background</h4>
							<p>
								With <b> 2 years </b> of experience in web development,
								I&apos;ve worked on several projects that blend creativity and
								technology. Dishy is a project close to my heart, designed to
								bring food lovers together through an intuitive and
								user-friendly platform.
							</p>
						</div>
						<div className={styles.text}>
							<h4>Vision for dishy</h4>
							<p>
								My goal with Dishy is to make it the go-to platform for food
								enthusiasts. I envision a space where cooks from all backgrounds
								can come together, inspire each other, and celebrate their love
								of food.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutDeveloper;
