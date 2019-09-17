import $ from 'jquery';

export class BusinessSearch {
  constructor(location, term) {
    this.location = location;
    this.term = term;
  }
  callBusinessInfo() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${this.location}&term=${this.term}`;
    
    $.ajax({
      url: url,
      headers: {
        'Authorization':`Bearer ${process.env.apiKey}`,
      },
      method: 'GET',
      dataType: 'json',
      context: this,
      success: function(response){
        // Grab the results from the API JSON return
        const totalResults = response.businesses;
        // If our results are greater than 0, continue
        if (totalResults.length > 0){
          this.renderInfo(totalResults);
        } else {
          // If our results are 0; display a no result message.
          $('#business-info').append('<h5>We discovered no results!</h5>');
        }
      },
      error: function(request, status, error){
        alert(`Error: ${request.status}`);
      }
    });
  }

  renderInfo(totalResults) {
    $.each(totalResults, function(i, item) {
      // Store each business's object in a variable
      const id = item.id;
      const link = item.url;
      const alias = item.categories[0].title;
      const phone = item.display_phone;
      const businessName = item.name;
      const rating = item.rating;
      const reviewCount = item.review_count;
      const address = item.location.address1;
      const city = item.location.city;
      const state = item.location.state;
      $('#business-info').append(
        `<div id="${id}">
          <a href="${link}"><p>${businessName}</p></a>
          Rate: ${rating}/5  with ${reviewCount} Reviews<br>Category: ${alias}<br>
          ${address}, ${city}, ${state}<br>
          ${phone}<hr>
        </div>`
      );
    });
  }
}