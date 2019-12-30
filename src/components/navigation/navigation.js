import React from 'react'

const Navigation =({onroutechange,isSignedIn})=>{
		if(isSignedIn){
			return(
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick={()=> onroutechange('Signin')} className='f3 link dim pa2 black underline pointer'>Signout</p>
				</nav>
			);
		}else{
			return (
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick={()=>onroutechange('Signin')} className='f3 link dim pa2 black underline pointer'>Sign In</p>
					<p onClick={()=>onroutechange('Register')} className='f3 link dim pa2 black underline pointer'>Register</p>
				</nav>
			);
		}
}

export default Navigation;