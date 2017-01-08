$(document).ready(function(){
  let from;
  let to;
  let subject;
  let text;

  $("#send_email").click(function(){
    to=$("#to").val();
    // subject=$("#subject").val();
    // text=$("#content").val();
    $("#message").text("Sending a shitty random apology to the person you wronged...Please wait...");

    $.get("/send",{to:to,subject:subject,text:text},function(data){
      if(data=="sent")
      {
        $("#message").empty().html("<p>Your shitty apology has been sent to " + to + " . Please check inbox!</p>");
      }
    });

  });
});