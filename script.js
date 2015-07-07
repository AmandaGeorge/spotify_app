$(document).ready(function() {
	console.log('js is working');

	var $form = $('#spotify-search');
	var $song = $('#track');
	var $resultsBox = $('#resultsBox');

	var _resultTemplate = _.template($('#resultsTemplate').html());

	$form.on('submit', function(event) {
		event.preventDefault();
		$.get('https://api.spotify.com/v1/search?type=track&q=' + $song.val(), function(data) {
			_.each(data.tracks.items, function(track) {
				console.log(track.name, track.artists[0].name, track.preview_url);
				if (track.album.images[0] != undefined) {
					var oneObject = {song: track.name, artist: track.artists[0].name, image: track.album.images[0].url, preview: track.preview_url};
					var $result = $(_resultTemplate(oneObject));
					$resultsBox.append($result);
				} else {
					var oneObject = {song: track.name, artist: track.artists[0].name, image: "https://app.therrd.com/www/default/images/no-image.png", preview: track.preview_url};
					var $result = $(_resultTemplate(oneObject));
					$resultsBox.append($result);
				};
				
			});
		});
	});
		


})

