import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import xss from "xss";

export default function NoteItem({ note }) {
	return (
		<div className='note__wrapper'>
			<Link to={`/edit-note/${note.id}`} className='note'>
				<div>
					<h4 className='note__title'>{note.title}</h4>
					<div
						className='note__details'
						dangerouslySetInnerHTML={{
							__html: xss(note.details),
						}}
					></div>
				</div>
				<p className='note__date'>{note.date}</p>
			</Link>
		</div>
	);
}

NoteItem.propTypes = {
	note: PropTypes.object.isRequired,
};
