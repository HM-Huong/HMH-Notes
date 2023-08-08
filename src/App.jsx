import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NotFound from "./pages/NotFound";
// import { dummyNotes } from './dummy_notes';

function initNotes() {
	const savedNotes = JSON.parse(localStorage.getItem("notes"));
	if (!Array.isArray(savedNotes)) {
		return [];
	}
	return savedNotes;
}

function App() {
	const [notes, setNotes] = useState(initNotes);
	const [firstRender, setFirstRender] = useState(true);

	useEffect(() => {
		setFirstRender(false);
	}, []);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	return (
		<main id='app'>
			<BrowserRouter basename='/HMH-Notes'>
				<Routes>
					<Route
						path='/'
						element={<Notes notes={notes} firstRender={firstRender} />}
					></Route>
					<Route path='*' element={<NotFound />}></Route>

					<Route
						path='/create-note'
						element={<CreateNote setNotes={setNotes} />}
					></Route>

					<Route
						path='/edit-note/:id'
						element={<EditNote notes={notes} setNotes={setNotes} />}
					></Route>
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
