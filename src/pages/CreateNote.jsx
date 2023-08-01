import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export default function CreateNote() {
	return (
		<section>
			<header className='create-note__header'>
				<Link to='/' className='btn'>
					<IoIosArrowBack />
				</Link>
				<button className="btn lg primary">Save</button>
			</header>
			<form className="create-note__form">
				<input type="text" autoFocus placeholder='Title ...' />
				<textarea rows="20" placeholder='Note details ...'></textarea>
			</form>
		</section>
	);
}
