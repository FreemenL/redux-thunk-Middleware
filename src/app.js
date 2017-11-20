import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware } from 'redux';
import fetch from 'isomorphic-fetch';

import fetchReducer from './reducers/fetchReducer';

const store  = createStore(fetchReducer,applyMiddleware(thunk));

const getData = fetchTitle => (dispatch,getState)=>{
  dispatch({type:fetchTitle+'_START'});
  fetch('/data_api/users/')
  .then(function(data){
    return data.json();
  })
  .then(function(json){
    dispatch({type:fetchTitle+'_END',pyload:json})
  })
}


class AppComponent extends Component{
    constructor(props){
      super(props)  
    }
    fetchData(){
      this.props.dispatch(getData('FETCH'))
    }
    render(){
      let list;
      if(this.props.data.list){
        list=this.props.data.list.map((item,index)=>{
          return <li key={index+'ele'}>{item.name}{item.age}</li>
        })
      }
      return(
        <div>
         <p>{this.props.data.status}</p> 
          <ul>
            {list}
          </ul>
          <button onClick={this.fetchData.bind(this)}>点击获取数据</button>
        </div>
      )
    }
}


function render(){
  ReactDOM.render(
    <AppComponent data={store.getState()} dispatch={(arg)=>{store.dispatch(arg)}}/>,
    document.getElementById('root')
  )
}
render();

store.subscribe(render);
































































