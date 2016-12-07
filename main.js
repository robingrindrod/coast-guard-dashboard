document.addEventListener('DOMContentLoaded', function () {
    var timeout = 10000;
    loadData();
    window.setInterval(loadData, timeout);
});

function loadData() {
    // We load the data from the Commissioners of Irish Lights' Met Ocean Charts
    // site.
    var request = new XMLHttpRequest();
    var url = 'https://cilpublic.cil.ie/MetOcean/MetOcean.aspx';
    request.open('GET', url, true);
    request.responseType = 'document';

    request.onload = function () {
        if (request.status == 200) {
            // The page contains a hidden input element with the ID latestais
            // which has a value with the latest data in JSON format.
            var json = request.responseXML.getElementById('latestais').value 
            var aidToNavs = JSON.parse(json).LatestAISDataFeed;

            // We can find the data for the Finnis Buoy by searching for its ID.
            var finnis = aidToNavs.find(function(aidToNav) {
                return aidToNav.MMSI === '992501164';
            });

            var waveHeightElement = document.getElementById('wave-height');
            waveHeightElement.textContent = finnis.WaveHeight;
        } else {
            console.error("Unable to load data. The response code was: " + request.status);
        }
    }

    request.send();
}
