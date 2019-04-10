$(document).ready(function() {
	var topics = ["Michael Jordan", "Lebron James", "Joel Embiid", "Ben Simmons", "Allen Iverson", "Stephen Curry", "Kevin Durant", "Giannis Antetokounmpo", "Anthony Davis", "Larry Bird", "Magic Johnson"]

	function renderButtons() {
		$("#buttons-view").empty();
		for (var i = 0; i < topics.length; i++) {
			var a = $("<button>");
			a.addClass("topic-btn btn btn-info");
			a.attr("data-topic", topics[i])
			a.text(topics[i])
			$("#buttons-view").append(a)
		}
	}

	function addButton() {
		$("#add-topic").on("click", function(event) {
			event.preventDefault();
			var topic = $("#topic-input").val().trim();
			topics.push(topic);
			renderButtons();
		})
	}

	function displayGifs() {
		var topic = $(this).attr("data-topic");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=qtYPB87VKldzE79SfDdDKQ7m2uSlIXAz&limit=10"
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response) {
			console.log(queryURL);
			console.log(response);
			var results = response.data
			for (i = 0; i < results.length; i++) {
				var topicDiv = $("<div class='float'>");
				var topicImage = $("<img>")
				var rated = $("<p>").text("Rating: " + results[i].rating)
				topicImage.attr("src", results[i].images.fixed_height_still.url);
				topicImage.attr("data-still", results[i].images.fixed_height_still.url)
				topicImage.attr("data-animate", results[i].images.fixed_height.url)
				topicImage.attr("data-state", "still")
				topicImage.attr("class", "gif")
				topicDiv.append(topicImage);
				topicDiv.append(rated)
				$("#gif-view").prepend(topicDiv)
			}
			$(".gif").on("click", function() {
				var state = $(this).attr("data-state");
				if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				} else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
			})
		})
	}
	renderButtons()
	addButton()
	$(document).on("click", ".topic-btn", displayGifs);
})