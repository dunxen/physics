$(document).ready(function(){
            //Click event listeners...
            
                        
                //Login...
                
                    $('#signSubmit').click(function(){
                    
       
                                                
                        
                            var client = new Usergrid.Client({
                                orgName: 'duncandean',
                                appName: 'physics'
                            });
                            
                            var username = $('#signUsername').val();
                            var password = $('#signPassword').val();

                            
                            client.login(username, password, function(error, data, user){
                                if (error){
                                    alert('Username and Password do not match!');
                                   
                                }
                                
                                else {
                                     
                                     client.getLoggedInUser(function(error, data, user){
                                        if(error) {
                                            alert("There was an error with retrieving your user!");
                                        } else {
                                            
                                            var picture = user.get("picture");
                                            var name = user.get("name");
                                            var username = user.get("username");
                                            $('#greeting').html("Hello " + name + "!");
                                            $('#profilePicture').attr('src', picture);
                                            $('#profileName').html(name);
                                            $('#profileUsername').html(username);
                                            
                                            client.getFeedForUser(username, function(error, data, activities){
for(var i = 0; i < activities.length; i++) {
                                                    var activity = activities[i];
                                                    //Use the .content property on the object to get the content data!
                                                    var content = activity.content;
                                                    $("#profileFeed").append("<p style='color: white; background-color: gray; padding: 6px; text-shadow: 1px 1px 0.5px black; border-radius: 5%; opacity: 0.9;'>"+content+"</p>");
}
});
                                            
                                            
                                            
                                        }
                                       });
                                    
                                    
                                
                                    
                                    $('#signButton').css('display', 'none');
                                    $('#signOutButton').css('display', 'block');
                                    $('#profileLink').css('display', 'block');
                                    
                                    
                                    window.setTimeout(function(){
                                        $.mobile.changePage("#home",{allowSamePageTransition: true });
                                        $('#signUsername').val('');
                                        $('#signPassword').val('');
                                        }, 1000);
                                    
                                    
                                    
                                }
                            
                            });
                            
                        
                        
                        
                        
                    });
                    
                //Post activity...
                
                $("#postActivity").click(function(event){
                
                if ($("#postContent").val() === ""){alert("No message entered!");}
                
                else {
                
                 event.preventDefault();
                 
                 var client = new Usergrid.Client({
                                orgName: 'duncandean',
                                appName: 'physics'
                            });
                 
                 client.getLoggedInUser(function(error, data, user){
                 
                    if(error) {
                         alert("Cannot get user!");
                    } else {
                        //Set your content here!
                        var content = $("#postContent").val();
                        var username = user.get("username");
                        client.createUserActivityWithEntity(user, content, function(error, activity){
                            if(error) {
                                 alert("Failed!");
                            } else {
                                //Get the content of your activity here!
                                //var content = activity.get("content");
                                //$("#response").append();
                                
                                $("#profileFeed").prepend("<p style='color: white; background-color: gray; padding: 6px; text-shadow: 1px 1px 0.5px black; border-radius: 5%; opacity: 0.9;'>"+content+"</p>");
                                $("#postContent").val("");



                            }
                        });
                    }
                });
                
                }
                });
                    
                //Register...
                
                    $('#regSubmit').click(function(){
                        
                        function signUpUser(){
                            var client = new Usergrid.Client({
                                orgName: 'duncandean',
                                appName: 'physics'
                                
                            });
                        
                            var username = $('#regUsername').val();
                            var password = $('#regPassword').val();
                            var email = $('#regEmail').val();
                            var name = $('#regName').val();
                        
                            client.signup(username, password, email, name, function(error){
                            
                                if (error) {
                                    alert('An error occurred!');
                                } else {
                                    
                                    $('#regUsername').val('');
                                    $('#regPassword').val('');
                                    $('#regEmail').val('');
                                    $('#regName').val('');
                                    $.mobile.changePage("#home",{allowSamePageTransition: true });
                                    $('#greeting').html('User created! Sign in now');
                                }
                            
                            });
                        
                        }
                        
                        signUpUser();
                    });
                    
                //Sign Out...
                
                    $('#signOutButton').click(function(event){
                       
                            event.preventDefault();
                       
                            function signOutUser(){
                                    
                                    var client = new Usergrid.Client({
                                        orgName: 'duncandean',
                                        appName: 'physics'
                                    });
                                                      
                                    client.logout();

                                        if (client.isLoggedIn()) {
                                            alert("Error occurred!");
                                        } else {
                                            $('#signButton').css('display', 'block');
                                            $('#signOutButton').css('display', 'none');
                                            $('#profileLink').css('display', 'none');
                                            $('#greeting').html('');
                                            $("#profileFeed").html('');
                                        }
                            }
                       
                            signOutUser();
                            
                            
                            
                       
                        
                    });
            
            });
