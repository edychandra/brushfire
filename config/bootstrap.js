/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

	Video.count().exec(function(err, numVideos){
		if(err){
			return cb(err);
		}

		if(numVideos > 0){
			console.log('Number of video records: ', numVideos);
			return cb();
		}

		var Youtube = require('machinepack-youtube');

		//List youtube videos which match the specified search query
		Youtube.searchVideos({
			query: 'grumpy cat',
			apiKey: sails.config.google.apiKey,
			limit: 15,
		}).exec({
			error: function(err){
				console.log('an error: ', err);
				return cb(err);
			},
			success: function(foundVideos){
				_.each(foundVideos, function(video){
					video.src = 'https://www.youtube.com/embed/' + video.id;

					delete video.description;
					delete video.publishedAt;
					delete video.id;
					delete video.url;
				});

				Video.create(foundVideos).exec(function(err, videoRecordsCreated){
					if(err){
						return cb(err);
					}

					console.log(videoRecordsCreated);
					return cb();
				})
			},
		});
	});
};