module.exports.routes = {
  /*************************************************************
   * JSON API                                                  *
   *************************************************************/
   'PUT /login': 'UserController.login',
   'GET /logout': 'UserController.logout',


  /*************************************************************
   * Server-rendered HTML Pages                                *
   *************************************************************/

  'GET /': 'PageController.showHomePage',
  'GET /videos': 'PageController.showVideosPage',
  'GET /profile': 'PageController.showProfilePage',
  'GET /edit-profile': 'PageController.showEditProfilePage',
  'GET /signup': 'PageController.showSignupPage',
  'GET /restore-profile': 'PageController.showRestorePage',
  'GET /administration': 'PageController.showAdminPage',
};