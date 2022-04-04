
//Update every 0.25 seconds
setInterval(countryUpdate, 250);

var defaultInputElement = `
<button data-inputid="!!UUID!!" onclick="countrySelectButton(this)">Select Country</button>
<label data-inputid="!!UUID!!">No Country Selected</label>
`;

var mapFrame = `
<iframe onload="countryFrameLoad(this)" class="countryMap !!CLASS!!" style="border: none; position: absolute; z-index: 9999; width: !!WIDTH!!; height: !!HEIGHT!!; !!MAPSTYLE!!" id="countrySelectMap" src="./map.html"></iframe>
`;

var openMap = null;

window.countrySelectButton = (el) => {
    var uuid = el.getAttribute("data-inputid");
    closeMap();
    openMap = uuid;

    var width = el.parentElement.getAttribute("width") || "800px"
    var height = el.parentElement.getAttribute("height") || "650px"
    var style = el.parentElement.getAttribute("mapstyle") || ""
    var mapclass = el.parentElement.getAttribute("mapclass") || ""

    document.body.innerHTML += mapFrame.replaceAll("!!WIDTH!!", width).replaceAll("!!HEIGHT!!", height).replaceAll("!!MAPSTYLE!!", style).replaceAll("!!CLASS!!", mapclass);




    document.body.setAttribute("mapOpen", "true");
    el.parentElement.dispatchEvent(new Event("open"));

    setTimeout(() => {
        document.getElementById("countrySelectMap").setAttribute("hasInit", "true");
    }, 50);
};

function closeMap() {
    if (openMap != null) {
        document.body.setAttribute("mapOpen", "false");
        document.getElementById("countrySelectMap").remove();
        openMap = null;
    }
}

function countryFrameLoad(frame) {

    var input = document.querySelector("countryinput[data-inputid=\"" + openMap + "\"]")

    //Add css
    if (input.getAttribute("mapbackground")){
        var s = input.getAttribute("mapbackground");
        frame.contentWindow.postMessage("--sea-color: " + s,"*");      
    }
    if (input.getAttribute("mapland")){
        var s = input.getAttribute("mapland");
        frame.contentWindow.postMessage("--land-color: " + s,"*");      
    }
    if (input.getAttribute("maphover")){
        var s = input.getAttribute("maphover");
        frame.contentWindow.postMessage("--accent-color: " + s,"*");      
    }
}

//Listen for country data
addEventListener('message', (event) => {

    var input = document.querySelector("countryinput[data-inputid=\"" + openMap + "\"]")

    if (event.data == "cancel"){
        input.dispatchEvent(new Event("close"));
        closeMap();
        return;
    }


    var text = document.querySelector("label[data-inputid=\"" + openMap + "\"]")
    input.value = event.data;
    text.innerText = event.data.Name;
    input.dispatchEvent(new Event("change"));
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new Event("close"));
    closeMap();
});

function countryUpdate() {
    //Search for countryinput elements
    var inputs = document.querySelectorAll("countryinput");
    inputs.forEach(input => {
        if (input.getAttribute("hasInit") != "true"){

            var uuid = crypto.randomUUID();

            input.setAttribute("data-inputid", uuid);
            input.innerHTML += defaultInputElement.replaceAll("!!UUID!!", uuid);
            input.setAttribute("hasInit", "true");
        }
    });
}