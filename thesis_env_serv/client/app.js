function getTSONHValue() {
    var uiTsonh = document.getElementsByName("uiTsonh");
    for(var i in uiTsonh) {
      if(uiTsonh[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getTAGTValue() {
    var uiTagt = document.getElementsByName("uiTagt");
    for(var i in uiTagt) {
      if(uiTagt[i].checked) {
          return parseInt(i);
      }
    }
    return -1; // Invalid Value
  }

  function getGRAJValue() {
    var uiGraj = document.getElementsByName("uiGraj");
    for(var i in uiGraj) {
      if(uiGraj[i].checked) {
          return parseInt(i);
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var talbai = document.getElementById("uiSqft");
    var tagt = getTAGTValue();
    var tsonh = getTSONHValue();
    var davhar = document.getElementById("uiDavhar");
    var davhart = document.getElementById("uiDavhart");
    var on = document.getElementById("uiOn");
    var graj = getGRAJValue();
    var location = document.getElementById("uiLocations");  
    var estPrice = document.getElementById("uiEstimatedPrice");
    var estP = document.getElementById("uiEstimatedP");
    var zarune = document.getElementById("uiZarune");
    //estPrice.innerHTML = "<h2>" + talbai.value.toString() + " Төгрөг</h2>";
    // estPrice.innerHTML = "<h2>" + talbai.toString()+ "-" + tagt.toString()+ "-" + tsonh.toString()+ "-" + davhar.toString()+ "-" + davhart.toString()+ "-"
    //  + on.toString()+ "-" + graj.toString()+ "-" + location.toString()+ "-" + "</h2>";
  
    // var url = "http://127.0.0.1:5000/predict_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    var url = "/api/predict_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        tagt: tagt,
        on: on.value,
        garaj: graj,
        davhar: davhar.value,
        talbai: parseFloat(talbai.value),
        davhart: davhart.value,
        tsonh: tsonh,
        duureg: location.value,
        zarune: parseFloat(zarune.value)
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " MNT</h2>";
        estP.innerHTML = "<h2>Магадлал: " + data.estimated_p.toString() + " %</h2>";
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    // var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx 
    var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e  and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;