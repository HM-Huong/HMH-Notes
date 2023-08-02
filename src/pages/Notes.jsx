import { CiSearch } from 'react-icons/ci';
import { BsPlusLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NoteItem from '../components/NoteItem';

export default function Notes({ notes }) {
	return (
		<section>
			<header className='notes__header'>
				<h2>My Notes</h2>
				{/* <input type='text' autoFocus placeholder='Keyword ...' /> */}
				<button className='btn'>
					<CiSearch />
				</button>
			</header>

			<div className='notes__container'>
				{notes.map((note) => (
					<NoteItem key={note.id} note={note} />
				))}
			</div>

			<Link to='/create-note' className='btn add__btn'>
				<BsPlusLg />
			</Link>
		</section>
	);
}

Notes.propTypes = {
	notes: PropTypes.array.isRequired,
};
