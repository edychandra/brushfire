angular.module('brushfire', ['ngRoute', 'toastr', 'compareTo', 'ngPatternRestrict'])
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '*://www.youtube.com/**'
    ]);
  }])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider

  // #/    (i.e. ng-view's "home" state)
    .when('/', {
    templateUrl: '/templates/home.html'
  })

  .when('/signup', {
    templateUrl: '/templates/signup.html',
    controller: 'signupPageController'
  })

    .when('/administration', {
    templateUrl: '/templates/adminUsers.html',
    controller: 'adminUsersPageController'
  })

  .when('/videos', {
    templateUrl: '/templates/videos.html',
    // If the current user is an admin, "redirect" (client-side) to `#/users`.
    // Otherwise redirect to `#/profile`
    controller: 'videosPageController'
  })

  .when('/profile/:id', {
    templateUrl: '/templates/profile.html',
    // If the current user is an admin, "redirect" (client-side) to `#/users`.
    // Otherwise redirect to `#/profile`
    controller: 'profilePageController'
  })

  .when('/profile/edit/:id', {
    templateUrl: '/templates/edit-profile.html',
    // If the current user is an admin, "redirect" (client-side) to `#/users`.
    // Otherwise redirect to `#/profile`
    controller: 'editProfilePageController'
  })

  .when('/restore', {
    templateUrl: '/templates/restore.html',
    // If the current user is an admin, "redirect" (client-side) to `#/users`.
    // Otherwise redirect to `#/profile`
    controller: 'restorePageController'
  });
}]);