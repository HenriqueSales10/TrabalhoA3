//set map options
var myLatLng = { lat: -26.7023781, lng: -49.2608648 };
var mapOptions = {
    center: myLatLng,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("EnderecoOrigem").value,
        destination: document.getElementById("EnderecoDestino").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');

           let distanciaMilhas = parseFloat(result.routes[0].legs[0].distance.text);
           let distanciaKm = distanciaMilhas * 1.80;
           
           // Função para arredondar a kilometragem
           const distanciaKmArredondado = (distanciaKm, places) => {
            if (!("" + distanciaKm).includes("e")) {
                return +(Math.round(distanciaKm + "e+" + places)  + "e-" + places);
            } else {
                let arr = ("" + distanciaKm).split("e");
                let sig = ""
                if (+arr[1] + places > 0) {
                    sig = "+";
                }
        
                return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
            }
            }
        
           let tempo = result.routes[0].legs[0].duration.text;

            output.innerHTML = "<div class='alert-dark' id='alertaDestino'>De: " + document.getElementById("EnderecoOrigem").value + ".<br />Para: " + document.getElementById("EnderecoDestino").value + ".<br /> Distância <i class='fas fa-road'></i> : " + distanciaKmArredondado(distanciaKm, 2) + " KM "  + ".<br />Tempo <i class='fas fa-hourglass-start'></i> : " + tempo + ".</div>";
           
            //display route
            directionsDisplay.setDirections(result);
        } else {

            if(document.getElementById("EnderecoOrigem").value.length < 10){
                swal("Endereço de origem inválido", 'Digite o endereço de origem corretamente!','error');
            }

            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map
            map.setCenter(myLatLng);
            swal("Endereço de origem inválido", 'Digite o endereço de origem corretamente!','error');
            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não foi possível traçar a rota. Por favor seja mais específico na definição de origem e do destino.</div>";
        }
    });

    alert(result.routes[0].legs[0].distance.text)

}

function calcularRotaPostoSaude(){
        //create request
        var request = {
            origin: document.getElementById("EnderecoOrigem").value,
            destination: document.getElementById("EnderecoOrigem").value + ", Posto de Saúde " +  document.getElementById("TipoPosto").value,
            travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }
    
        //pass the request to the route method
        directionsService.route(request, function (resultado, status) {
            if (status == google.maps.DirectionsStatus.OK) {
    
                //Get distance and time
                const output = document.querySelector('#output');
    
               let distanciaMilhas = parseFloat(resultado.routes[0].legs[0].distance.text);
               let distanciaKm = distanciaMilhas * 1.80;
               
               // Função para arredondar a kilometragem
               const distanciaKmArredondado = (distanciaKm, places) => {
                if (!("" + distanciaKm).includes("e")) {
                    return +(Math.round(distanciaKm + "e+" + places)  + "e-" + places);
                } else {
                    let arr = ("" + distanciaKm).split("e");
                    let sig = ""
                    if (+arr[1] + places > 0) {
                        sig = "+";
                    }
            
                    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
                }
                }
            
               let tempo = resultado.routes[0].legs[0].duration.text;
    
                output.innerHTML = "<div class='alert-dark' id='alertaDestino'>De: " + document.getElementById("EnderecoOrigem").value + ".<br />Para: " + document.getElementById("EnderecoOrigem").value + ", Posto de saúde " + document.getElementById("TipoPosto").value + ".<br /> Distância <i class='fas fa-road'></i> : " + distanciaKmArredondado(distanciaKm, 2) + " KM "  + ".<br />Tempo <i class='fas fa-hourglass-start'></i> : " + tempo + ".</div>";
               
                //display route
                directionsDisplay.setDirections(resultado);
            } else {

                if(document.getElementById("EnderecoOrigem").value == "" || document.getElementById("EnderecoOrigem").value.length < 10){
                    swal("Endereço de origem inválido", 'Digite o endereço de origem corretamente!','error');
                }

                else{
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                //center map
                map.setCenter(myLatLng);
                swal("Endereço de origem inválido", 'Digite o endereço de origem corretamente!','error');
                //show error message
                output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não foi possível traçar a rota. Por favor seja mais específico na definição de origem e do destino.</div>";
                }

            }
        });
    
        alert(resultado.routes[0].legs[0].distance.text)
}


