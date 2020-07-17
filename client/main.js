$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  function getQuote(){

    //YOUR CODE HERE, Add a GET request
    $.get("http://localhost:3000/quote",
      function (data, textStatus, jqXHR) {
        console.log(data);
      },
      "string"
    );

  }

  function addQuote(quote){

    //YOUR CODE HERE, Add a POST request
    $.post("http://localhost:3000/", quote,
      function (data, textStatus, jqXHR) {

      },
      "string"
    );
  }
});
