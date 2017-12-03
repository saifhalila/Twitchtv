const users=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
//get information about the channels of the users
function getchannels (user){
	var dataChannel={};
	$.ajax({
		url:'https://wind-bow.gomix.me/twitch-api/channels/'+user+'?callback=?',
		data:dataChannel,
		dataType:'jsonp',
		success: function(dataChannel){
		 	if (dataChannel['status']===null) {
		 		dataChannel['status']=user

		 	}
		 	var html=""
			html='<div class="container" id="'+user+'">'+
	 		 " <a href='"+dataChannel['url']+"'> <img src='"+dataChannel['logo']+"' alt='Avatar' style='width:90px'></a>"+
	 		 "<p><span >"+dataChannel['display_name']+"</span><span>followers: "+dataChannel['followers']+"</span></p>"+
	 		 "<p>Status: "+dataChannel['status']+"</p>"
	 		 +"</div>";
			$(".listOfUsers").append(html);
 			var line= document.getElementById(user);
 			 line.style.cssText="background: linear-gradient(rgba(67, 74, 84, 0.5),rgba(5, 14, 28, 0.8)) ,url("+dataChannel['profile_banner']+") no-repeat center/cover" ;
			}
	})
	}
users.forEach(getchannels);
//get information about user' live streaming on Twitch.tv
var connectedUser=[];
var disconnectedUser=[];
function getStream(user){
	var dataStream={};
	$.ajax({
		url:'https://wind-bow.gomix.me/twitch-api/streams/'+user+'?callback=?',
		data:dataStream,
		dataType:"jsonp",
		success: function (dataStream) {
		
		if (dataStream['stream']) {
			connectedUser.push(user);
			
		}else{
			disconnectedUser.push(user);
		}
	}
	});	
	}
users.forEach(getStream);
//after Ajax requests complete 
$( document ).ajaxComplete(function() {
	filterSelection("all");
	connectedUser.forEach(function(user){
	$(".listOfUsers  #"+user+" a img").css("border-color", "#2ECC71");
	$(".listOfUsers  #"+user).addClass("filterDiv Connect");
	});

	disconnectedUser.forEach(function(user){
		$(".listOfUsers  #"+user).addClass("filterDiv Disconnect");
	});
	});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

	function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
   	 } else {
        document.getElementById("myBtn").style.display = "none";
   	 }
	}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 
// When the user clicks on the button, scroll to the top of the document

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
	}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
	}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
	}