import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className='empty__notes'>
			<p style={{color: "tomato"}}>404 Page Not Found</p>
			<Link
				to='/'
				style={{
					marginTop: '2rem',
					display: 'block',
					color: '#fff',
					fontWeight: 600,
					fontSize: "1.2rem",
					textDecoration: "underline"
				}}
			>
				Go to homepage
			</Link>
		</div>
	);
}
