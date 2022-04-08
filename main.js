var prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera")

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TlLDL9KPj/model.json',modelLoaded);
function modelLoaded()
{
    console.log('Model Loaded!');
    speak();
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "The prediction is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult()
{
    if (error)
{
    console.error(error);
}
else 
{
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    prediction = results[0].label;
    speak();
    if(results[0].label == "Peace!")
    {
        document.getElementById("result_emoji").innerHTML = "&#9996;";
        document.getElementById("quote").innerHTML = "Peace!";
    }
    else if(results[0].label == "Perfect!")
    {
        document.getElementById("result_emoji").innerHTML = "&#128076;";
        document.getElementById("quote").innerHTML = "Perfect!";
    }
    else if(results[0].label == "Good Job!")
    {
        document.getElementById("result_emoji").innerHTML = "&#128077;";
        document.getElementById("quote").innerHTML = "Good Job!";
    }
  }
}