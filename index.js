$(document).ready(function(){

    var client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')
  
  client.on('connect', function () {
      
      
      //console.log('connected')

      var connect_button = $('#connect')
      connect_button.on('click', () => {
        $('#status').val("Successfully Connected")

      })
   

      var sub_button = $('#subscribe-btn')
      sub_button.on('click', () => {
  
          client.subscribe($('#sub-topic').val() , function (err) {
                  
              if (!err) {
                      client.publish(pub_input.val(), payload_input.val())
              }
          })
          subscribe()
      })

  })
  
  //receive message and topic
  client.on('message', function (topic, message) {

    var time_stamp = new Date();
      var top = $("<td></td>").html(topic);
  
      var msg = $("<td></td>").text(message);
      var time = $("<td></td>").text(time_stamp.getMonth()+ 1 + "/" + time_stamp.getDate() +  "/" + time_stamp.getFullYear() + " " + time_stamp.getHours() + ":" + time_stamp.getMinutes() + ":" + time_stamp.getSeconds());
      var tr = $("<tr></tr>")
      
      tr.append(top);
      tr.append(msg);
      tr.append(time);
  
      $("#add-tbl1").append(tr);
      console.log(topic)
      console.log(message)
  
  })

  function publish(){

    // Date.now()
  
    var pub_input = $('#pub-topic').val();
    var payload_input = $('#pub-payload').val();
    var time_stamp = new Date();

    var pubIn = $("<td></td>").html(pub_input);
  
    var payIn = $("<td></td>").text(payload_input);
    var time = $("<td></td>").text(time_stamp.getMonth()+ 1 + "/" + time_stamp.getDate() +  "/" + time_stamp.getFullYear() + " " + time_stamp.getHours() + ":" + time_stamp.getMinutes() + ":" + time_stamp.getSeconds());
    var tr = $("<tr></tr>")

    
    tr.append(pubIn);
    tr.append(payIn);
    tr.append(time);

    $("#add-tbl2").append(tr);

   
  }

  function subscribe(){
    var sub_input = $('#sub-topic').val();
    var time_stamp = new Date();

    var subIn = $("<td></td>").html(sub_input);
  
    
    var time = $("<td></td>").text(time_stamp.getMonth()+ 1 + "/" + time_stamp.getDate() +  "/" + time_stamp.getFullYear() + " " + time_stamp.getHours() + ":" + time_stamp.getMinutes() + ":" + time_stamp.getSeconds());
    var tr = $("<tr></tr>")

    
    tr.append(subIn);

    tr.append(time);

    $("#add-tbl3").append(tr);

  }

  function unsubscribe(){
    var pub_input = $('#pub-topic').val();

    pub_input.remove()
  }
  
  var pub_button = $('#publish_button');
  var pub_input = $('#pub-topic');
  var payload_input = $('#pub-payload');
  

  //For publish
  pub_button.on('click', () => {
      
  client.publish(pub_input.val(), payload_input.val())
  publish()
 // console.log("Published succesfully!");
  })
  
  
  })
