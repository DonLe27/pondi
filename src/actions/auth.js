const BASE_URL = 'https://backpondi.herokuapp.com';


export const loadUser = () => {
  console.log('LOAD USER ACTUALLY CALLED');
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    //  'Access-Control-Allow-Origin': '*'
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(BASE_URL + '/api/auth/profile/', {headers, method: "GET"})
      .then(res => {
        console.log('PROFILE_RESPONSE:', res);
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'USER_LOADED', user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}


export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json",  'Accept': 'application/json' };
    let body = JSON.stringify({username, password});
    // let headers = {
    //   "Content-Type": "application/json",
    //   // 'Accept': 'application/json',
    //   'Access-Control-Allow-Origin': '*'
    // };
    console.log('BODY:', body);

    fetch(BASE_URL + "/api/auth/login/", {headers, body, method: "POST"})
      .then(function(res) {
        if (res.status < 500) {
          return res.json().then(data => {
            return {
              status: res.status,
              data
            }
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(function(res) {
        if (res.status === 200) {
          console.log("LOGIN SUCCESSFUL");
          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          console.log("AUTH ERROR");
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          console.log("LOGIN FAIL");
          dispatch({type: "LOGIN_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}


export const register = (username, password, first_name, last_name, email) => {
  return (dispatch, getState) => {
    let body = JSON.stringify({username, password, first_name, last_name, email});
    let headers = {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    //  'Access-Control-Allow-Origin': '*'
    };

    return fetch(BASE_URL + "/api/auth/register/", {headers, body, method: "POST"})
      .then(res => {
        console.log('registration response:', res);
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "REGISTRATION_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}

// TODO: Finish update request to update the color and the avatar for the newly-registered profile

export const updateAvatarColor = (first_name, last_name, animal, color) => {
  return (dispatch, getState) => {
    let tmpbody = {
      'first_name' : first_name,
      'last_name' : last_name,
      'animal' : animal, 
      'color': color
    }
    let body = JSON.stringify(tmpbody.first_name);
    console.log('UPDATE AVATAR BODY:', body);
    const token = getState().auth.token;
    let headers = {
      "Content-Type": "application/json",
      'Accept': 'application/json',
     // 'Access-Control-Allow-Origin': '*'
    };
    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(BASE_URL + "/api/auth/update/", {headers, tmpbody, method: "PATCH"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          console.log('Status 200:', res.data);
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          console.log('Status 403 or 401: auth error!');
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          console.log('Failed registration :(');
          dispatch({type: "REGISTRATION_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}



export const post = (prompt, body, profile, theme, privacy) => {
  return (dispatch, getState) => {
 // let postBody = JSON.parse(JSON.stringify({prompt, body, profile, theme, privacy}));
    let postTheme = theme;
    if (theme == null || theme.length == 0)
    {
      postTheme = "DefaultTheme"
    }
    let postBody = {
      "prompt": prompt,
      "body": body,
      "profile": profile,
      "theme": postTheme,
      "privacy": privacy,
    }
    console.log("PostBody: " + JSON.stringify(postBody));
    const token = getState().auth.token;
    let headers = {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    };
    if (true) {
      headers["Authorization"] = `Token ${token}`;
    }
    console.log("Header: " + headers.Authorization)
    return fetch(BASE_URL + "/api/auth/myposts/", {headers : headers, body : JSON.stringify(postBody), method: "POST"})
      .then(res => {
        console.log('Post Response:', res);
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
        }
      })  
  }
}
/////////////////////////POST UPDATE///////////////////////////
export const postUpdate = (post, body, profile, theme, privacy) => {
  return (dispatch, getState) => {
       let postBody = {
         "body": body,
         "profile": profile,
         "theme": theme,
         "privacy": privacy,
       }
       console.log("Body: " + JSON.stringify(postBody));
       const token = getState().auth.token;
       let headers = {
         "Content-Type": "application/json",
         'Accept': 'application/json',
       };
       if (true) {
         headers["Authorization"] = `Token ${token}`;
       }
       console.log("Header: " + headers.Authorization)
       return fetch(BASE_URL + "/api/pondi/" + post + "/", {headers : headers, body : JSON.stringify(postBody), method: "PATCH"})
         .then(res => {
           console.log('Patch Response:', res);
           if (res.status < 500) {
             return res.json().then(data => {
               return {status: res.status, data};
             })
           } else {
             console.log("Server Error!");
           }
         })  
     }
}

export const logout = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    localStorage.clear();
    sessionStorage.clear();
    dispatch({type: 'LOGOUT_SUCCESSFUL'});
  }
}

/////FRIENDS UPDATING
export const acceptFriend = (friendName) => {
  return (dispatch, getState) => {
       let postBody = {
         "friendname": friendName
       }
       console.log("Body: " + JSON.stringify(postBody));
       const token = getState().auth.token;
       let headers = {
         "Content-Type": "application/json",
         'Accept': 'application/json',
       };
       if (true) {
         headers["Authorization"] = `Token ${token}`;
       }
       console.log("Header: " + headers.Authorization)
       return fetch(BASE_URL + "/api/auth/acceptrequest/", {headers : headers, body : JSON.stringify(postBody), method: "PATCH"})
         .then(res => {
           console.log('Patch Response:', res);
           if (res.status < 500) {
             return res.json().then(data => {
               return {status: res.status, data};
             })
           } else {
             console.log("Server Error!");
           }
         })  
     }
}

export const deleteFriend = (friendName) => {
  return (dispatch, getState) => {
       let postBody = {
         "friendname": friendName
       }
       console.log("Body: " + JSON.stringify(postBody));
       const token = getState().auth.token;
       let headers = {
         "Content-Type": "application/json",
         'Accept': 'application/json',
       };
       if (true) {
         headers["Authorization"] = `Token ${token}`;
       }
       console.log("Header: " + headers.Authorization)
       return fetch(BASE_URL + "/api/auth/deletefriend/", {headers : headers, body : JSON.stringify(postBody), method: "PATCH"})
         .then(res => {
           console.log('Delete Friend Response:', res);
           if (res.status < 500) {
             return res.json().then(data => {
               return {status: res.status, data};
             })
           } else {
             console.log("Server Error!");
           }
         })  
     }
}

export const searchUser = (friendName) => {
  return (dispatch, getState) => {
       let postBody = {
         "friendname": friendName
       }
       console.log("Body: " + JSON.stringify(postBody));
       const token = getState().auth.token;
       let headers = {
         "Content-Type": "application/json",
         'Accept': 'application/json',
       };
       if (true) {
         headers["Authorization"] = `Token ${token}`;
       }
       console.log("Header: " + headers.Authorization)
       return fetch(BASE_URL + "/api/auth/searchfriend/?friendname=" + friendName, {headers : headers, method: "GET"})
         .then(res => {
           console.log('Search User Response:', res);
           if (res.status < 500) {
             return res.json().then(data => {
               console.log(data)
               console.log(res.status)
               return {status: res.status, data};
             })
           } else {
             console.log("User not found")
             return {status: res.status}
           }
         })  
     }
}

/////FRIENDS UPDATING
export const sendRequest = (friendName) => {
  return (dispatch, getState) => {
       let postBody = {
         "friendname": friendName
       }
       console.log("Body: " + JSON.stringify(postBody));
       const token = getState().auth.token;
       let headers = {
         "Content-Type": "application/json",
         'Accept': 'application/json',
       };
       if (true) {
         headers["Authorization"] = `Token ${token}`;
       }
       console.log("Header: " + headers.Authorization)
       return fetch(BASE_URL + "/api/auth/sendrequest/", {headers : headers, body : JSON.stringify(postBody), method: "POST"})
         .then(res => {
           console.log('Request Response:', res);
           if (res.status < 500) {
             return res.json().then(data => {
               return {status: res.status, data};
             })
           } else {
             console.log("Server Error!");
           }
         })  
     }
     
}

export const cancelRequest = (friendName) => {
  return (dispatch, getState) => {
       let postBody = {
         "friendname": friendName
       }
       console.log("Body: " + JSON.stringify(postBody));
       const token = getState().auth.token;
       let headers = {
         "Content-Type": "application/json",
         'Accept': 'application/json',
       };
       if (true) {
         headers["Authorization"] = `Token ${token}`;
       }
       console.log("Header: " + headers.Authorization)
       return fetch("http://backpondi.herokuapp.com/api/auth/following/", {headers : headers, body : JSON.stringify(postBody), method: "POST"})
         .then(res => {
           console.log('Cancel Friend Request Response:', res);
           if (res.status < 500) {
             return res.json().then(data => {
               return {status: res.status, data};
             })
           } else {
             console.log("Server Error!");
           }
         })  
     }
}