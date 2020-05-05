import React, { Component } from 'react';
import Roomsnavbar from './Components/Roomsnavber';
import Navbar from './Components/Navbar';
import Livingroomcard from './Components/Livingroomcard';
import Kitchencard from './Components/Kitchencard';
import Bedroomcard from './Components/Bedroomcard';
import Bathroomcard from './Components/Bathroomcard';
import Homebackground from './Components/Homebackground';
import Ideaboard from './Components/Ideaboard';
import IdeaForm from './Components/IdeaForm';

import './App.css';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

class App extends Component {
  
  state={
    furnitures: [],
    theme: ""
  }
  
  componentDidMount(){
    fetch('http://localhost:3000/furnitures')
    .then(res => res.json())
    .then(res => this.setState({furnitures: res}))
  }
  
 
  selectTheme = (parameter) => {
    this.setState({theme: parameter})
  }

  livingRoomsFurniture = () => {
    return this.state.furnitures.filter(furniture => {
        return furniture.category === "Living Room" 
    })
  }

  kitchenRoomsFurniture = () => {
    return this.state.furnitures.filter(furniture => {
        return furniture.category === "Kitchen and Dining"})
  }

  bedRoomsFurniture = () => {
    return this.state.furnitures.filter(furniture => {
        return furniture.category === "Bedroom" 
      })
  }

  bathRoomsFurniture = () => {
    return this.state.furnitures.filter(furniture => {
        return furniture.category === "Bathroom"})
  }

  render(){
    return (
      <>
          <header className="header-container">
          <Navbar/>
          </header>
        <div className="App">
          {this.props.location.pathname === "/ideaboard" || this.props.location.pathname === "/ideaform" ? null : <Roomsnavbar selectTheme={this.selectTheme}/>}
          <Route exact path ="/livingroomcard" render={(routerProps) => <Livingroomcard theme={this.state.theme} furnitures={this.livingRoomsFurniture()}/>} />
          <Route exact path ="/kitchencard" render={(routerProps) => <Kitchencard  theme={this.state.theme} furnitures={this.kitchenRoomsFurniture()}/>}/>
          <Route exact path ="/bedroomcard" render={(routerProps) => <Bedroomcard  theme={this.state.theme} furnitures={this.bedRoomsFurniture()}/>}/>
          <Route exact path ="/bathroomcard" render={(routerProps) => <Bathroomcard  theme={this.state.theme} furnitures={this.bathRoomsFurniture()}/>}/>
          <Route exact path ="/" component={Homebackground}/>
          <Route exact path ="/ideaboard" component={Ideaboard}/>
          <Route exact path ="/ideaform" render={(routerProps) => 
            <IdeaForm 
            theme={this.state.theme} furnitures={this.livingRoomsFurniture()} 
            theme={this.state.theme} furnitures={this.kitchenRoomsFurniture()} 
            theme={this.state.theme} furnitures={this.bedRoomsFurniture()} 
            theme={this.state.theme} furnitures={this.bathRoomsFurniture()}
            />}
          />
        </div>
      </>
    );
  }
}

export default withRouter(App)
