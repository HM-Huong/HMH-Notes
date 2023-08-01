import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NoteItem({ note }) {
	return <Link to={`/edit-note/${note.id}`} className='note'>
		<h4 className='note__title'>{note.title}</h4>
		<p>{note.date}</p>
	</Link>;
}

NoteItem.propTypes = {
	note: PropTypes.object.isRequired,
};
