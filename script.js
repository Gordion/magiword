$(document).ready(function(){

  init();

  function init() {
    console.log('init');
    var isLoggedIn = !!localStorage.getItem('user');
    if (isLoggedIn) {
      var user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      $('body').addClass("logged-in");
      $('.sp-us').text(user.login);

    } else {
      $('.sp-us').text('Log in');

    }
  }

  $(".quit-link").on('click', function(e){
    var isLoggedIn = !!localStorage.getItem('user');
    if (isLoggedIn) {
      localStorage.removeItem('user');
      $('.sp-us').text('Log in');
    }
  });

  $("#reg-button").on('click', function(e) {
    e.preventDefault();

    var regData = $('#reg-form').serialize();
    console.log(regData);
    
    $.post( "https://hybro.in.ua/roma.php?method=Register", regData)
      .done(function(data) {
        var response = data;
        console.log(data, response);

        if (response.IsValid === "false") {
          alert(response.ERROR);
        }
        else {
          window.open("log in.html");
          // alert("Registred");
        }
      });

    return false;
  });

      // $.ajax({
      //   url: "http://transleet.somee.com/httpHndlr.ashx",
      //   type: "get",
      //   contentType: "application/json; charset=utf-8",
      //   dataType: "json",
      // });

    // var dataReg = JSON.stringify( $(this).serializeArray() );
    // console.log(dataReg);

    // $.get("http://transleet.somee.com/servicehelper/Register.ashx", function(data) {
    //   var user = JSON.parse(data);
    //
    //   console.log(user.name);
    //   console.log(user.surname);
    //
    //   $('.username').text(user.name + ' ' + user.surname);
    //
    //   // alert("Name: " + JSON.stringify(name) + "\n Surname: " + JSON.stringify(surname));
    //   // console.log(name)
    // })



  $("#log-button").on('click', function(e) {
    e.preventDefault();
    console.log('click');
    var regData = $('#log-form').serialize();


    $.post( "https://hybro.in.ua/roma.php?method=SignIn", regData)
      .done(function(response) {
        var response = data;
        console.log(data, response);

        if (response.IsValid === "false") {
          alert(response.ERROR);
        }
        else if (response.IsValid === "true") {
          var user = {
            login: $('.input-login').val(),
            guid: response.UserGuid
          };
          localStorage.setItem('user', JSON.stringify(user));
          window.location ='vocabulary.html';
        }
      });

    return false;
  });

});
