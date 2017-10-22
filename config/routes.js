module.exports.routes = {
  /*************************************************************
   * JSON API                                                  *
   *************************************************************/
   'PUT /login': 'UserController.login',


  /*************************************************************
   * Server-rendered HTML Pages                                *
   *************************************************************/

  'GET /': {
    view: 'homepage',
    locals:{
      me:{
        id: null,
        gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
        email: 'sailsinaction@gmail.com'
      }
    }
  },
  'GET /videos': {
    view: 'videos',
    locals: {
      me: null
    }
  },
  'GET /profile': {
    view: 'profile',
    locals: {
      me: {
        id: 1,
        gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
        email: 'sailsinaction@gmail.com',
        username: 'sails-in-action'
      }
    }
  },
  'GET /edit-profile': {
    view: 'edit-profile',
    locals: {
      me: {
        id: 1,
        gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
        email: 'sailsinaction@gmail.com',
        username: 'sails-in-action'
      }
    }
  },
  'GET /signup': {
    view: 'signup',
    locals: {
      me: {
        id: null,
        gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
        email: 'sailsinaction@gmail.com'
      }
    }
  },
  'GET /restore-profile': {
    view: 'restore-profile',
    locals: {
      me: {
        id: null,
        gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
        email: 'sailsinaction@gmail.com'
      }
    }
  },
  'GET /administration': {
    view: 'adminUsers',
    locals: {
      me: {
        id: 1,
        gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
        email: 'sailsinaction@gmail.com',
      }
    }
  }
};