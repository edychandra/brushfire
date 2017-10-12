$(function whenDomIsReady(){

	$('.the-list-of-videos .loading').show();

	setTimeout(function afterRetrievingVideos(){
		var videos = [{
			title: 'Funny Baby Videos',
			src: 'https://www.youtube.com/embed/_FvTVWjLiHM'
		}, {
			title: 'Justin Bieber - Baby ft. Lucadris',
			src: 'https://www.youtube.com/embed/kffacxfA7G4'
		}, {
			title: 'Charlie bit my finger',
			src: 'https://www.youtube.com/embed/_OBlgSz8sSM'
		}];

		$('.the-list-of-videos .loading').hide();

		var videosHtml = _.reduce(videos, function(html, video){
			html += '<li class="video">'+
			'<h2>' + video.title + '</h2>' +
			'<iframe width="640" height="390" src="' + video.src + '" frameborder="0" allowfullscreen></iframe>' +
			'</li>';
		return html;
		}, '');

		$('.the-list-of-videos ul').replaceWith(videosHtml);
	}, 750);

	$('.submit-video-form').submit(function(e){

		e.preventDefault();

		var newVideo = {
			title: $('.submit-video-form input[name="title"]').val(),
			src: $('.submit-video-form input[name="src"').val()
		};

		$('.submit-video-form input').val('');
		$('.submit-video-form button').text('Submitting...');
		$('.submit-video-form button').prop('disabled', true);

		var parser = document.createElement('a');

		parser.href = newVideo.src;

		var youtubeID = parser.search.substring(parser.search.indexOf("=")+1, parser.search.length);

		newVideo.src = 'https://www.youtube.com/embed/' + youtubeID;

		setTimeout(function(){
			var newVideoHtml = '<li class="video">' +
			'<h2>' + newVideo.title + '</h2>' +
			'<iframe width="640" height="390" src="' + newVideo.src + '" frameborder="0" allowfullscreen></iframe>'+'</li>';

			$('.the-list-of-videos').prepend(newVideoHtml);
			$('.submit-video-form button').text('Submit Video');
			$('.submit-video-form button').prop('disabled', false);
		}, 2750);
	});

});