// DOM Ready =============================================================
$(document).ready(function() {
  // Create User
  $("#usernew").on('click', '.btn-post', createUser);
  // Read User
  $("#userupdate").on('click', '.read', readUser);
  // Edit Check
  $("#userupdate").on('click', '.update', editPassChecker);
   //start edit
  $("#userupdate").on('click', '#editbtn',updateUser);
  // Update User Submit
  $("#editpost").on('click', ".btn-update", submitUser);
  
  // Delete Check
  $("#userupdate").on('click', '.delete', delPassChecker);
  //Delete User
  $("#userupdate").on('click', '#delbtn',deleteUser);
  // Read User
  $("#sidebar").on('click', '#about',readAbout);
  
  // Read User
  $("").ready(readPost);
   
});

// Create User
function createUser(event) {
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#usernew input textarea').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      var newUser = {
        'firstname': $('input#firstname').val(),
        'occupation': $('textarea#occupation').val(),
        'time': new Date(),
        'myId': $('input#mypass').val()
      };
      newPass =  $('input#mypass').val();
      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'POST',
        data: newUser,
        url: '/person',
        dataType: 'JSON'
      }).done(function( res ) {     
        $("input").val('');
        $("textarea").val('');
        alert('這是您的文章完整辨識碼：'+ newPass +'\n如果日後需要修改文章或刪除文章就必須再輸入這個辨識碼！') ;
        $.ajax({
          type: 'GET',
          url:'/logo'
        }).done(function( res ) {
          var html = new EJS({url: 'views/readall.ejs'}).render(res);
          $("#userupdate").html(html);
        });
          
      });   
    }
    else {
      // If errorCount is more than 0, error out
      alert('Please fill in all fields');
      return false;
    }
};

// Read User
function readUser(event) {
    event.preventDefault();
    // Use AJAX to post the object to our getuser service
    $.ajax({
      type: 'GET',
      url: '/person/' + $(this).attr('rel')
    }).done(function( res ) {
      var html = new EJS({url: 'views/read.ejs'}).render(res);
      $("#userupdate").html(html);
    });
};

// Upadate Pass Check
function editPassChecker(event) {
    event.preventDefault();
            $.ajax({
              type: 'GET',
              url: '/person/' + $(this).attr('rel').substr(0,24)
             }).done(function( res ) {
              var html = new EJS({url: 'views/editpass.ejs'}).render(res);
              $("#checkpass1").html(html);          
            });  

};
// Update User
function updateUser(event) {
    event.preventDefault();

     inputpass = $('input#inputeditpass').val();
    if(inputpass === $(this).attr('rel').substr(24)){
        $.ajax({
        type: 'GET',
        url: '/person/' + $(this).attr('rel').substr(0,24)
        }).done(function( res ) {
        var html = new EJS({url: 'views/update.ejs'}).render(res);
        $("#main").html(html);
        });
    }
    else alert('輸入錯誤!');
    // Use AJAX to post the object to our getuser service
 
};

// Update User Submit
function submitUser(event) {
  var newUser = {
    //'firstname': $('#firstname0').val(),
    //'lastname': $('#lastname0').val(),
    //'age': $('#age0').val(),
    'occupation': $('#occupation0').val()
  };

  // Use AJAX to put the object to our updateuser service
      if(confirm('確定編輯完成了嗎?')){
           $.ajax({
              type: 'PUT',
              data: newUser,
              url: '/person/' + $(this).attr('rel')
             }).done(function( res ) {
                  $.ajax({
                  type: 'GET',
                  url:'/update'
                }).done(function( res ) {
                  history.go(0);
                });
            });  
      }
      else return false;
};

// Delete User
function delPassChecker(event) {
    event.preventDefault();
            $.ajax({
              type: 'GET',
              url: '/person/' + $(this).attr('rel').substr(0,24)
             }).done(function( res ) {
              var html = new EJS({url: 'views/delpass.ejs'}).render(res);
              $("#checkpass").html(html);          
            });  
};

function deleteUser(event) {
    event.preventDefault();
    inputpass = $('input#inputpass').val();
    if(inputpass === $(this).attr('rel').substr(24)){
      if(confirm('文章刪除後就無法復原，真的要刪除嗎？')){
           $.ajax({
              type: 'DELETE',
              url: '/person/' + $(this).attr('rel').substr(0,24)
             }).done(function( res ) {
              readPost();
            });  
      }
      else readPost();
    }
    else alert('輸入錯誤!');
};

// Read About Page
function readAbout(event) {
    event.preventDefault();
    // Use AJAX to post the object to our getuser service
    $.ajax({
      type: 'GET',
      url:'/about'
    }).done(function( res ) {
      var html = new EJS({url: 'views/about.ejs'}).render(res);
      $("#main").html(html);
     
    });
     $(window).scrollTop("0");
};


// Read Posts
 function readPost(event) {
        
        // Use AJAX to post the object to our getuser service
        $.ajax({
          type: 'GET',
          url:'/logo'
        }).done(function( res ) {
          var html = new EJS({url: 'views/readall.ejs'}).render(res);
          $("#userupdate").html(html);      
        });

    };
