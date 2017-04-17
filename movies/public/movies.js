//movies.js

document.addEventListener('DOMContentLoaded', init);

function init() {

  var filterButton = document.getElementById('filterBtn');
  var addButton = document.getElementById('addBtn');
  filterButton.addEventListener('click', function(event) {

  	//prevent the regular form button from clicking
  	event.preventDefault();

  	var req = new XMLHttpRequest();

  	//instead, the value in the filter form is retrieved and used
  	//to construct a url --> used from XML request 
  	var url = 'http://localhost:3000/api/movies?director=' + 
  		document.getElementById('director').value;
  	//a background request is made to that url formed^^^
  	req.open('GET', url, true);

  	//when json is returned, it should be parsed into movie objects
  	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			var movies = JSON.parse(req.responseText);

			var table = document.getElementById('movie-list');

			//because we are filtering we need to clear what is in that table
			while (table.firstChild) {
				table.removeChild(table.firstChild);
			}

			//use those movie objects to replace the list of movies on the page 
			movies.forEach(function(obj) {
				
				var row = table.insertRow(-1);
			    var cell1 = row.insertCell(0);
			    var cell2 = row.insertCell(1);
			    var cell3 = row.insertCell(2);
			    cell1.textContent = obj.title;
			    cell2.textContent = obj.director;
			    cell3.textContent = obj.year;

			});
		}
	});

	req.addEventListener('error', function(e) {
		document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
	});

	req.send();

  }); //end event listener for filterButton

	
	addButton.addEventListener('click', function(event) {

		//prevent the regular form button from clicking
  		event.preventDefault();

  		//clear the filter 
		var filter = document.getElementById('director');
		//console.log("filter before post:", filter.value);
		filter.value = "";
		//console.log("filter after:",filter.value);


  		var title = document.getElementById('movieTitle').value;
  		var director = document.getElementById('movieDirector').value;
   		var year = document.getElementById('movieYear').value;
   		
   		var req = new XMLHttpRequest();

   		var url = 'http://localhost:3000/api/movies/create';

   		req.open('POST', url, true);
   		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   		req.send('title=' + title + '&director=' + director + '&year=' + year );

   		
   		req.addEventListener('load', function() {
   			if (req.status >= 200 && req.status < 400) {
					var movie = JSON.parse(req.responseText);

					var table = document.getElementById('movie-list');

					//now add one more row to the table  
					var row = table.insertRow(-1);
				    var cell1 = row.insertCell(0);
				    var cell2 = row.insertCell(1);
				    var cell3 = row.insertCell(2);
				    cell1.textContent = movie.title;
				    cell2.textContent = movie.director;
				    cell3.textContent = movie.year;

				}
   		}); //end req.addeventlistener 

   		req.addEventListener('error', function() {
    			console.log('uh-oh... network error or cross domain request');
  		});

   		//req.send();
		
	});
	

}