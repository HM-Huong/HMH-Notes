import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import NotFound from './pages/NotFound';
function App() {
	return (
		<main id='app'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Notes />}></Route>
					<Route path='/*' element={<NotFound />}></Route>
					<Route path='/create-note' element={<CreateNote />}></Route>
					<Route path='/edit-note/:id' element={<EditNote />}></Route>
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
