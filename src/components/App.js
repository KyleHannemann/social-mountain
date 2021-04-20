import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();
//
    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.search = this.search.bind(this);
    this.clearSearch = this.componentDidMount.bind(this);
  }
 /* addReply(reply, id){
    console.log(reply, id)
    let text = reply;
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {})
    .then(response=>{console.log(response)}).catch(error=>{console.log(error)})
  }*/
  
  componentDidMount() {

    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(response => {this.setState({posts: response.data}); console.log(response)}).catch(error => {console.log(error)})
    
  }
  
  updatePost(id, text) {
    console.log(id, text)
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
    .then(response => {console.log(response); this.setState({posts: response.data})}).catch(error => {console.log(error)})
  }

  deletePost(id) {
    console.log("hi")
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(response => {console.log(response); this.setState({posts: response.data})})
    .catch(error => console.log(error));
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(response=>{this.setState({posts:response.data}); console.log(response)}).catch(error => {console.log(error)})
  }
  search(value){
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURIComponent(value)}`)
    .then(response => {this.setState({posts: response.data})})
  }

  render() {
    
    const { posts } = this.state;
    console.log(this.state.posts)
    
   

    return (
      <div className="App__parent">
        <Header clearSearch={this.clearSearch} search={this.search}/>

        <section className="App__content">

          <Compose createPost={this.createPost}/>
          {posts.map(post => {
            return (<Post id={post.id} deletePost={this.deletePost}updatePostFn={this.updatePost}text={post.text} date={post.date}key={post.id}/>)
          })}
        </section>
      </div>
    );
  }
}

export default App;
