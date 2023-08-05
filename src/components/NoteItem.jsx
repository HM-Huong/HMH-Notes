import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NoteItem({ note }) {
	return (
		<Link to={`/edit-note/${note.id}`} className='note'>
			<div>
				<h4 className='note__title'>{note.title}</h4>
				<div className='note__details' dangerouslySetInnerHTML={{__html: note.details}}></div>
			</div>
			<p className='note__date'>{note.date}</p>
		</Link>
	);
}

NoteItem.propTypes = {
	note: PropTypes.object.isRequired,
};
