import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      planets: []
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

componentDidMount(){
    fetch("https://swapi.co/api/planets").then(res => res.json()).then((result) => {
          this.setState({
            isLoaded: true,
            planets: result.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    this.refs.search.focus();
 

 
  }

handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }
getPlanet(e){
 var childInfoDiv=e.target.querySelector('.infoDiv');
	if(childInfoDiv !=null){
	 	 if(childInfoDiv.style.display === 'none'){
	 	 	childInfoDiv.style.display='block';
	 	 } else{ 
	 	 	childInfoDiv.style.display='none';
	 	}
	}

}
render() {
    let _planetsState=this.state.planets;
        _planetsState.sort((a, b) => {
          if( isNaN(parseInt(a.population))) {
            a.population=0;
          }
          if( isNaN(parseInt(b.population))) {
             b.population =0;
          }
          return parseInt(b.population) - parseInt(a.population);
         });

    let search = this.state.searchString.trim().toLowerCase();
    
    if (search.length > 0) {
      _planetsState = _planetsState.filter(function(planetItem) {
        return planetItem.name.toLowerCase().match(search);
      });
    }
  
  
   return (
        <>
         <h6 className="my-4">Type Along Search</h6>
          <input type="text" value={this.state.searchString} ref="search" onChange={this.handleChange} placeholder="Type planet name" className="form-control"/>
          <ul className="list-unstyled" style={{marginTop: 35 +'px'}}>
          { 
          _planetsState.map((allplanets, index) => {
             return(
               <li className="btn-light list-group-item" key={index} onClick={(e) => this.getPlanet(e)}> 
                  {allplanets.name} 
                  <small className="badge badge-danger float-right"> {allplanets.population} </small>
                 <div className="bg-light border clearfix infoDiv p-3 rounded my-3 table-responsive" style={{display:'none'}} >
                   {
                     Object.keys(allplanets).map((obj, k) => {
                      return (
                           <>
                                  {obj} : {allplanets[obj]} <br key={k}/>
                           </>
                        )
                    })
                    }
                   </div>
               </li>
               
              )
             })
            }
          </ul>
        </>
     
    );
  



  }

}


export default Search;