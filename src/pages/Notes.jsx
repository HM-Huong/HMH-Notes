import { CiSearch } from 'react-icons/ci';
import { BsPlusLg } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NoteItem from '../components/NoteItem';
import { useEffect, useState } from 'react';

export default function Notes({ notes }) {
	const [showSearch, setShowSearch] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [filteredNotes, setFilteredNotes] = useState(notes);

	function handleSearch() {
		setFilteredNotes(
			notes.filter((note) => {
				if (
					note.title.toLocaleLowerCase().match(searchText.toLocaleLowerCase())
				) {
					return note;
				}
			})
		);
	}

	useEffect(handleSearch, [searchText, notes]);

	useEffect(() => {
		if (!showSearch) {
			setSearchText('');
		}
	}, [showSearch]);

	return (
		<section className='fit__container'>
			<header className='notes__header fit__content-size'>
				{!showSearch && <h2>My Notes</h2>}
				{showSearch && (
					<input
						type='text'
						autoFocus
						placeholder='Keyword ...'
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				)}
				<button className='btn' onClick={() => setShowSearch((prev) => !prev)}>
					{showSearch ? <MdClose /> : <CiSearch />}
				</button>
			</header>

			<div className='notes__container fit__item'>
				{filteredNotes.length === 0 && (
					<p className='empty__notes'>No notes found</p>
				)}

				{filteredNotes.map((note) => (
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
