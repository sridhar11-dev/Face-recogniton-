import React from 'react'
import './ImageLinkform.css'

const ImageLinkform=({onInputChange, onButtonSubmit})=>{
	return (
		<div>
			<p> This Magic app will detect faces in the picture. Try it!!</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5' >
					<input className='f4 w-70 center pa2' type='text' onChange={onInputChange}/>
					<button onClick={onButtonSubmit}
					className='w-30 f4 grow link ph3 pv2 dib white bg-light-purple'>DETECT</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkform