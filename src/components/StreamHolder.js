import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logout from './Logout.js';
import { connect } from "react-redux";
import {auth} from "../actions";

import '../styles/transitions.css';
import '../styles/streamholder.css';

import { Motion, spring } from "react-motion";

import Stream from './Stream.js';
import Ocean from './Ocean.js';
import Archive from './Archive.js';
import SideBar from './SideBar.js';
import Prompt from './Prompt.js';
import FriendPage from './Friends.js'

class StreamHolder extends React.Component {
    constructor(props) {
        super(props);
        // parse through data, get username, etc
        this.userData = {
            "username": "gudetama",
            "avatar": "stingray",
            "prompts": [{
                    "title": "This is the first title, from archive",
                    "content": "this is some content. This is some more content. This is more content",
                    "date": "Feb 1, 2019",
                    "avatar": "stingray"
                },
                {
                    "title": "This is the second title, from archive",
                    "content": "this is some more content. Lorem ipsum something dolor blah",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
            ]
        };
        this.streamData = {
            "prompts": [{
                    "title": "This is the first title for stream",
                    "content": "this is some content. This is some more contnet. This is more content",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
                {
                    "title": "This is the 2nd title for stream",
                    "content": "this is some content. This is some more contnet. This is more content",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
                {
                    "title": "This is the 3rd title for stream",
                    "content": "this is some content. This is some more contnet. This is more content",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
                {
                    "title": "This is the 4th title for stream",
                    "content": "this is some more content. Lorem ipsum something dolor blah",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
            ]
        };

        this.oceanData = {
            "prompts": [{
                    "title": "This is the first title for ocean",
                    "content": "this is some content. This is some more contnet. This is more content",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
                {
                    "title": "This is the 2nd title for ocean",
                    "content": "this is some content. This is some more contnet. This is more content",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
                {
                    "title": "This is the 3rd title for ocean",
                    "content": "this is some content. This is some more contnet. This is more content",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
                {
                    "title": "This is the 4th title for ocean",
                    "content": "this is some more content. Lorem ipsum something dolor blah",
                    "date": "Jan 1, 1111",
                    "avatar": "stingray"
                },
            ]
        };

        this.state = {
            username: '',
            avatar: '',
            color: '',
            id: -1,
            archivePosts: [],
            streamPosts: [],
            stream: false,
            archive: true,
            friend:false,
            ocean: false,
            prompt: false,
            prompts: [],
            myprofile: [],
            leftSide: <SideBar 
                userData={this.userData}
                addStream={this.addStream.bind(this)} 
                addarchive={this.addarchive.bind(this)}
                addOcean={this.addOcean.bind(this)}
                addPrompt={this.addPrompt.bind(this)}
                addFriend={this.addFriends.bind(this)}
            />,
            myposts: [],
            oceanPosts: [],
            friendPosts: [],
            friends: [],
            closeFriends: [],
            pendingFriends: [],



        };
        this.handleAdd = this.handleAdd.bind(this);
        this.addStream = this.addStream.bind(this);
        this.addOcean = this.addOcean.bind(this);
        this.addarchive = this.addarchive.bind(this);
        this.addFriends = this.addFriends.bind(this);
    }

    handleAdd(i) {}
    addFriends(i) {
        this.setState({ archive: false, stream: false, ocean: false, prompt: false, friend: true });
    }
    addStream(i) {
        this.setState({ archive: false, stream: true, ocean: false, prompt: false, friend: false });
    }

    addOcean(i) {
        this.setState({ archive: false, stream: false, ocean: true, prompt: false, friend: false});

    }

    addarchive(i) {
        this.setState({ archive: true, stream: false, ocean: false, prompt: false,friend: false });
        console.log(this.addarchive)
    }

    addPrompt(i) {
        this.setState({ archive: false, stream: false, ocean: false, prompt: true,friend: false });
        
    }

    getMyPosts(){
        document.body.style.margin = "0";
        //document.body.style.overflow = "hidden";
        let token = this.props.token;
        console.log("TOKEN:", token);
        let headers = {
            "Content-Type": "application/json",
            'Accept': 'application/json',
          //  'Access-Control-Allow-Origin': '*'
        };
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
                ///////Get post information
                setTimeout(() => {
                    fetch('https://pondi.herokuapp.com/api/auth/myposts/',  {headers, method: "GET"})
                    .then(res => {
                        console.log('PROFILE_RESPONSE:', res);
                        if (res.status < 500) {
                            return res.json().then(data => {
                                console.log('POSTS:', data);
                                this.setState({
                                    myposts: data
                                })
        
                            })
        
                            
                        } else {
                            console.log("Server Error!");
                            throw res;
                        }
                    })
                }, 500);

    }

    componentDidMount() {
        document.body.style.margin = "0";
        //document.body.style.overflow = "hidden";
        let token = this.props.token;
      //  console.log("TOKEN:", token);
        let headers = {
            "Content-Type": "application/json",
            'Accept': 'application/json',
          //  'Access-Control-Allow-Origin': '*'
        };
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        setTimeout(() => {
            fetch('https://pondi.herokuapp.com/api/auth/profile/',  {headers, method: "GET"})
            .then(res => {
             //   console.log('PROFILE_RESPONSE:', res);
                if (res.status < 500) {
                    return res.json().then(data => {
                 //       console.log('DATA:', data);
                        this.setState({
                            leftSide: <SideBar 
                            username={data.user.username}
                            avatar={data.animal}
                            addStream={this.addStream.bind(this)} 
                            addarchive={this.addarchive.bind(this)}
                            addOcean={this.addOcean.bind(this)}
                            addPrompt={this.addPrompt.bind(this)}
                            addFriends={this.addFriends.bind(this)}
                        />,
                            username : data.user.username,
                            avatar : data.animal,
                            color : data.color,
                            id: data.user.id, 
                            
                            
                         });

                    })
                    
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
        }, 500);

        ///////Get post information
        setTimeout(() => {
            fetch('https://pondi.herokuapp.com/api/auth/myposts/',  {headers, method: "GET"})
            .then(res => {
                console.log('PROFILE_RESPONSE:', res);
                if (res.status < 500) {
                    return res.json().then(data => {
                        console.log('MY POSTS:', data);
                        this.setState({
                            myposts: data
                        })

                    })

                    
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
        }, 500);

        //////Get Profile
                setTimeout(() => {
            fetch('https://pondi.herokuapp.com/api/auth/profile/',  {headers, method: "GET"})
            .then(res => {
                console.log('PROFILE_RESPONSE:', res);
                if (res.status < 500) {
                    return res.json().then(data => {
                        console.log('MY PROFILE:', data);
                        this.setState({
                            myprofile: data
                        })

                    })

                    
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
        }, 500);
        /////////////////Get prompts
        setTimeout(() => {
            fetch('https://pondi.herokuapp.com/api/allprompts/',  {headers, method: "GET"})
            .then(res => {
                console.log('PROFILE_RESPONSE:', res);
                if (res.status < 500) {
                    return res.json().then(data => {
                        console.log('POSTS:', data);
                        this.setState({
                            prompts: data
                        })

                    })

                    
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
        }, 500);
                ///////Get post information
        /////////////////Get friends
        setTimeout(() => {
            fetch('https://pondi.herokuapp.com/api/auth/allfriends',  {headers, method: "GET"})
            .then(res => {
                console.log('PROFILE_RESPONSE:', res);
                if (res.status < 500) {
                    return res.json().then(data => {
                        var allFriends = JSON.parse(data)
                        console.log(allFriends)
                        console.log("FRIENDS", allFriends["friends"])
                        console.log("CLOSE FRIENDS", allFriends["closefriends"])
                        console.log("PENDING FRIENDS", allFriends["pendingfriends"])
                        this.setState({
                            friends: allFriends["friends"],
                            closeFriends: allFriends["closefriends"],
                            pendingFriends: allFriends["pendingfriends"]
                        })
                    })

                    
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
        }, 500);
        /////////////////Get ocean posts
        setTimeout(() => {
            fetch('https://pondi.herokuapp.com/api/auth/oceanposts/',  {headers, method: "GET"})
            .then(res => {
              
                if (res.status < 500) {
                    return res.json().then(data => {
                     
                        this.setState({
                            oceanPosts: data
                        })
                      
                    })

                    
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
        }, 500);
        
        /////////////////Get friend posts
        setTimeout(() => {
            fetch('https://pondi.herokuapp.com/api/auth/friendposts/',  {headers, method: "GET"})
            .then(res => {
            //    console.log('FRIEND RESPONSE:', res);
                if (res.status < 500) {
                    return res.json().then(data => {
                        console.log('FRIENDPOSTS:', data);
                        this.setState({
                            friendPosts: data
                        })
                   //     console.log(this.state.friendPosts)
                    })

                    
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
        }, 500);
        //fetch('https://pondi.herokuapp.com/api/auth/profile/',  {headers, method: "GET"})

    }

    componentWillUnmount() {
        //document.body.style.overflow = "hidden";
        
    }


    render() {
        // if (!this.props.isAuthenticated) {
        //   return <Redirect to="/" />
        // }

        const { ...props } = this.props;
        console.log("FRIEND PAGE STATUS " + this.state.friend)
        return (
            //this.state.loading ? this.props.loadUser() :
            <div>

            <Motion 
            defaultStyle={{opacity: 0}}
            style={{opacity: spring(1 , {stiffness: 50, damping: 20})}}
        >
            {(style) => (
                <div  style={{opacity: style.opacity}}>
                {this.state.leftSide}
               </div>
                )}
        </Motion>


        <Motion 
            defaultStyle={{opacity: 0}}
            style={{opacity: spring(this.state.stream ? 1 : 0, {stiffness: 50, damping: 20})}}
        >
            {(style) => (
                <div  style={{opacity: style.opacity}}>
            {this.state.stream && <Stream  key={1} prompts={this.state.prompts} friendPosts={this.state.friendPosts}/>}
               </div>
                )}
        </Motion>

         <Motion 
            defaultStyle={{opacity: 0}}
            style={{opacity: spring(this.state.ocean ? 1 : 0, {stiffness: 50, damping: 20})}}
        >
            {(style) => (
                <div  style={{opacity: style.opacity}}>
            {this.state.ocean && <Ocean key={2} prompts={this.state.prompts} oceanPosts={this.state.oceanPosts}/>}
                          </div>

                )}
        </Motion>

         <Motion 
            defaultStyle={{opacity: 0}}
            style={{opacity: spring(this.state.archive ? 1 : 0, {stiffness: 50, damping: 20})}}
        >
            {(style) => (
                <div  style={{opacity: style.opacity}}>
            {this.state.archive &&  <Archive key={3} prompts={this.state.prompts} myposts={this.state.myposts} avatar={this.state.avatar} />}          
                             </div>

               )}
        </Motion>

        <Motion 
            defaultStyle={{opacity: 0}}
            style={{opacity: spring(this.state.prompt ? 1 : 0, {stiffness: 50, damping: 20})}}
        >
            {(style) => (
                <div  style={{opacity: style.opacity}}>
            {this.state.prompt && <Prompt key={4} prompts={this.state.prompts} myposts={this.state.myposts} id={this.state.id} getMyPosts={this.getMyPosts.bind(this)}/>}
                          </div>

                )}
        </Motion>
        
        <Motion 
            defaultStyle={{opacity: 0}}
            style={{opacity: spring(this.state.friend ? 1 : 0, {stiffness: 50, damping: 20})}}
        >
            {(style) => (
                <div  style={{opacity: style.opacity}}>
            {this.state.friend && <FriendPage key={5} prompts={this.state.prompts} friendPosts={this.state.friendPosts} friends={this.state.friends} closeFriends={this.state.closeFriends} pendingFriends={this.state.pendingFriends}/>}
                          </div>

                )}
        </Motion>

         
       



       < Logout className="Logout-button"/> 
      </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => dispatch(auth.loadUser()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamHolder);