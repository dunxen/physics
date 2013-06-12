$(document).ready(function(){

    window.addEventListener('devicelight', function(event) {
        var indicator = $('#brightness');
        
        $('#brightValue').text(event.value);
        
        if (event.value < 200) {
            indicator.text("Too dim!");
        }
        else if (event.value < 400 && event.value > 200) {
            indicator.text("Just right!");
        }
        else {
            indicator.text("Too bright!");
        }
    });
   




  $('#calculate').click(function(){
    var angle = parseFloat($('#angle_calc').val());
    var order_min = parseFloat($('#min_calc').val());
    var wavelength = parseFloat($('#wave_calc').val());
    var width = parseFloat($('#width_calc').val());
    
    if (isNaN(width) === true){
    
        var calculation = String((order_min * wavelength) / Math.sin((Math.PI/180) * angle));
        $('#width_calc').val(calculation);
        
        
     }
     
    else if (isNaN(wavelength) === true){
    
        var calculation = String((width * Math.sin((Math.PI/ 180) * angle)) / order_min);
         $('#wave_calc').val(calculation);
    
    }
    
    else if (isNaN(order_min) === true){
        var calculation = String((width * Math.sin((Math.PI/ 180) * angle)) / wavelength);
         $('#min_calc').val(calculation);
    }
    
    else if (isNaN(angle) === true){
        var calculation = String((180/Math.PI) * (Math.asin((order_min * wavelength) / width)));
         $('#angle_calc').val(calculation);
    }
  
  });
    $('.text_input').click(function(){
      if ($('#angle_calc').val() !== '' && $('#min_calc').val() !== '' && $('#wave_calc').val() !== '' && $('#width_calc').val() !== ''){
        $('.text_input').val('')
        }
    });



});
