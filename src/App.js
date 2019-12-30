import React from 'react';
import Navigation from './components/navigation/navigation'
import Logo from './components/Logo/logo'
import ImageLinkform from './components/ImageLinkform/ImageLinkform'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import 'tachyons';
import './App.css';

const particlesdisplay={
  particles:{
      number: {
                value: 80,
                density: {
                  enable: true,
                  value_area:600
                }
             }
  } 
}


const initialState={
    input:'',
    imageurl:'',
    box:{},
    route: 'Signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined:'' 
    }
}

class App extends React.Component {
  constructor(){
    super();
    this.state=initialState;
  }

  loaduser=(data)=>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined:data.joined
    }
    })
  }

calculateFacebox=(data)=>{
  const clarifaiface=data.outputs[0].data.regions[0].region_info.bounding_box;
  const image=document.getElementById('inputimage');
  const width=Number(image.width)
  const height=Number(image.height)
   return {
    leftcol: clarifaiface.left_col * width,
    toprow: clarifaiface.top_row * height,
    rightcol: width - (clarifaiface.right_col * width),
    bottomrow: height - (clarifaiface.bottom_row * height)
  }
}

displayfacebox=(box)=>{
  console.log(box)
  this.setState({box: box})
}

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

  onroutechange=(route)=>{
    if(route==='Signout')
    {
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn: true })
    }
    this.setState({route: route})

  }

  onButtonSubmit=()=>{
    this.setState({imageurl: this.state.input})
    fetch('http://localhost:3001/imageurl',
    {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=>response.json())
    .then(response=>{
      if(response){
        fetch('http://localhost:3001/image',
        {
            method: 'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id: this.state.user.id
            })
        })
        .then(response =>response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{entries: count}))
        })
        .catch(console.log)
      }
      this.displayfacebox(this.calculateFacebox(response))
    })
    .catch(err=>console.log("oops",err))
  }

  render(){
    const {isSignedIn,route,imageurl,box}=this.state;
    return (
      <div className="App">
      <Particles className='screenview' params={particlesdisplay} />
       <Navigation isSignedIn={isSignedIn} onroutechange={this.onroutechange}/>
       { this.state.route==='home'? 
          <div>
             <Logo />
             <Rank name={this.state.user.name} entries={this.state.user.entries} />
             <ImageLinkform onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
             <FaceRecognition box={box} imageurl={imageurl}/>
          </div>:(
             route==='Signin'? <Signin loaduser={this.loaduser} onroutechange={this.onroutechange} />
            :<Register loaduser={this.loaduser} onroutechange={this.onroutechange} />
          )
        }
      </div>
    );
  }
}

export default App;
