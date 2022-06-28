//script para captura de geolocalização do visitante da página web.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    alert("O seu navegador não suporta Geolocalização.");
    }
   
    function showPosition(position) {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCvcUSVOuT_IJeVP3wq6mVZVT93IamimPI`;
        fetch(url).then(response => response.json()).then(data => {
            console.log(data)
            const addresses = []
            for(let i=0; i < Object.keys(data.results).length; i++){
                if (data.results[i].formatted_address.indexOf("R.") !== -1){
                    addresses.push(data.results[i].formatted_address)
                }
            }
            document.getElementById('EnderecoOrigem').value = addresses.at(-1)
        }).catch(err => {
            console.warn(err.message)
        });
    }
    
    
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }