// variable to know, if the soundscape is played or not
let isPlaying = false;

// create Audio Elements
// birds (every second file is same as first file; created to make a loop)
const birdsOne = new Audio();
const birdsTwo = new Audio();

// wind
const windOne = new Audio();
const windTwo = new Audio();

// water
const waterOne = new Audio();
const waterTwo = new Audio();

// weather
const weatherOne = new Audio();
const weatherTwo = new Audio();

// harbor
const harborOne = new Audio();
const harborTwo = new Audio();


// set Attributes (for Debugging):
/*
weatherOne.setAttribute('designator', 'rain1');
weatherTwo.setAttribute('designator', 'rain2');

windOne.setAttribute('designator', 'wind1');
windTwo.setAttribute('designator', 'wind2');

birdsOne.setAttribute('designator', 'birds1');
birdsTwo.setAttribute('designator','birds2');

harborOne.setAttribute('designator', 'trees1');
harborTwo.setAttribute('designator', 'trees2');

waterOne.setAttribute('designator', 'water1');
waterTwo.setAttribute('designator', 'water2');
*/


function createSea(){
    // console.log('Enter function create Sea() ...');
    // get all the user input values
    const birdsValue = document.getElementById('birdsInput').value;
    const windValue = document.getElementById('windInput').value;
    const waterValue = document.getElementById('waterInput').value;
    const weatherValue = document.getElementById('weatherInput').value;
    const harborValue = document.getElementById('harborInput').value;

    // and create a Sea based on the values:
    const sea = {
        birds: birdsValue,
        wind: windValue,
        water: waterValue,
        weather: weatherValue,
        harbor: harborValue
    };
    // return the sea object (will be saved in a variable)
    return sea;
}


function insertRandomInputValues(){
    // console.log('Enter function insertRandomInputValues() ...');
    // random values between 0 .. 100 insert in all input-fields
    const seaAttributes = document.getElementsByTagName('input');

    // loop thru all inputs and set the input value to a random number
    for(i = 0; i < seaAttributes.length; i++){
        seaAttributes[i].value = Math.floor(Math.random() * 101) // return random integer between 0 and 100 and insert as value
    }
}


// when the Random-Sea Button is clicked:
function randomButtonAction(){
    // console.log('Enter function randomButtonAction() ...');
    insertRandomInputValues();
    
    // if isPlaying is true then simply stop():
    // then start again
    if (isPlaying == true){
        stopSea();
    }
    startSea();
}


// play a loop, based on two files (they share the same audio file)
// the next file will start playing just a bit before the current file will end...
// the function will call itself, but with changed parameters
function playLoop(sound1, sound2){
    // console.log('Playing', sound1.getAttribute('designator'));
    sound1.play();
    sound1.ontimeupdate = function (){
        // console.log(sound1.getAttribute('designator'), ':', sound1.currentTime);
        // double check 'isPlaying' due to an occured error, when the stop button has been clicked,
        // in 1 of 99 cases, an audio element keeps on playing
        // to check this twice: if global variable isPlaying is false: stop playing...
        if (isPlaying == false){
            sound1.pause();
            // console.log('Enter isPlaying() == false.. in playLoop-function');
        } else {
            const buffer = 1.45; // 1.36
            if (sound1.currentTime > sound1.duration - buffer){
                sound1.ontimeupdate = null;
                if (isPlaying){ // prevent new call of playLoop when stop button is clicked and asynchron function call is executed shortly after stopping;
                    // console.log('Preparing : ', sound2.getAttribute('designator'));
                    playLoop(sound2, sound1);
                }
                
            }
        }
    }
}


/*---------------------------------- */
/* Functions to select audio files   */

function selectBirdsAudio(value){
    if(value > 90){
        return './audio/seagulls4.ogg';
    } else if (value > 65){
        return './audio/seagulls3.ogg';
    } else if (value > 35){
        return './audio/seagulls2.ogg';
    } else if (value > 15){
        return './audio/seagulls1.ogg';
    } else {
        return './audio/silence.ogg';
    }
}

function selectWindAudio(value){
    if(value > 90){
        return './audio/wind6.ogg';
    } else if (value > 75){
        return './audio/wind5.ogg';
    } else if (value > 60){
        return './audio/wind4.ogg';
    } else if (value > 50){
        return './audio/wind3.ogg';
    } else if (value > 30){
        return './audio/wind2.ogg';
    } else if (value > 5){
        return './audio/wind1.ogg';
    } else {
        return './audio/silence.ogg';
    }
}


function selectWaterAudio(value){
    if(value > 80){
        return './audio/waves6.ogg';
    } else if (value > 65){
        return './audio/waves5.ogg';
    } else if (value > 50){
        return './audio/waves4.ogg';
    } else if (value > 40){
        return './audio/waves3.ogg';
    } else if (value > 25){
        return './audio/waves2.ogg';
    } else if (value > 10){
        return './audio/waves1.ogg'
    } else {
        return './audio/silence.ogg';
    }
}

function selectWeatherAudio(value){
    if(value > 90){
        return './audio/rain5.ogg';
    } else if (value > 80){
        return './audio/rain4.ogg';
    } else if (value > 70){
        return './audio/rain3.ogg';
    } else if (value > 60){
        return './audio/rain2.ogg';
    } else if (value > 50){
        return './audio/rain1.ogg'
    } else {
        return './audio/silence.ogg';
    }
}


function selectHarborAudio(value){
    if(value > 90){
        return './audio/harbor3.ogg';
    } else if (value > 75){
        return './audio/harbor2.ogg';
    } else if (value > 40){
        return './audio/harbor1.ogg';
    } else {
        return './audio/silence.ogg';
    }
}

function stopSea(){
    // console.log('Enter function stopSea() to stop playback loop......');
    isPlaying = false;

    // halt the audio files => double check in the function playLoop() above to halt definitive the audio files
    birdsOne.pause();
    birdsTwo.pause();
    windOne.pause();
    windTwo.pause();
    harborOne.pause();
    harborTwo.pause();
    waterOne.pause();
    waterTwo.pause();
    weatherOne.pause();
    weatherTwo.pause();

    document.getElementById('startButton').innerText = 'PLAY'; // change inner Text of Button (functionality see below)
    // button is now a play-Button, where we can start the sea audio again....
    document.getElementById('startButton').removeEventListener('click', stopSea); // remove function stop
    document.getElementById('startButton').addEventListener('click', startSea);


}



function startSea(){
    // console.log('Enter startSea() ...');

    document.getElementById('startButton').innerText = 'STOP'; // change inner Text, to show new function of that button (see below)

    isPlaying = true;

    const sea = createSea();

    // bird settings
    birdsOne.src = selectBirdsAudio(sea.birds);
    birdsTwo.src = birdsOne.src;
    birdsOne.volume = sea.birds / 100;
    birdsTwo.volume = birdsOne.volume;


    // wind settings
    windOne.src = selectWindAudio(sea.wind);
    windTwo.src = windOne.src;
    windOne.volume = sea.wind / 100;
    windTwo.volume = windOne.volume;


    // water settings
    waterOne.src = selectWaterAudio(sea.water);
    waterTwo.src = waterOne.src;
    waterOne.volume = sea.water / 100;
    waterTwo.volume = waterOne.volume;


    // weather settings
    weatherOne.src = selectWeatherAudio(sea.weather);
    weatherTwo.src = weatherOne.src;
    weatherOne.volume = sea.weather / 100;  
    weatherTwo.volume = weatherOne.volume;


    // harbor settings
    harborOne.src = selectHarborAudio(sea.harbor);
    harborTwo.src = harborOne.src;
    harborOne.volume = sea.harbor / 100;
    harborTwo.volume = harborOne.volume;


    // Initialize functions / start play Loops:
    playLoop(birdsOne, birdsTwo);
    playLoop(windOne, windTwo);
    playLoop(harborOne, harborTwo);
    playLoop(weatherOne, weatherTwo);
    playLoop(waterOne, waterTwo);


    // change Start-Button to a Stop-Button with function to stop all audio
    document.getElementById('startButton').removeEventListener('click', startSea);
    document.getElementById('startButton').addEventListener('click',  stopSea);

}

function openModal(){
    document.getElementById('infoModal').style.display='block'
}

function closeModal(){
    document.getElementById('infoModal').style.display='none';
}


// add event-listeners to elements
function addHandlers(){
    // console.log('Enter function addHandlers()...');
    document.getElementById('startButton').addEventListener('click', startSea);
    document.getElementById('randomButton').addEventListener('click', randomButtonAction);
    
    // add event listeners to the inputs; if user changes input, then a function will be called
    const inputFields = document.getElementsByTagName('input');
    for (i = 0; i < inputFields.length; i++){
        inputFields[i].addEventListener('input', () => {
            // console.log('User Input received');
            // if isPlaying is false then simply run startSea() by automatically clicking on button:
            // else if files are playing, then stop (stopSeas) and startSea with new inputs (2 clicks on start button)
            if (isPlaying == false){
                document.getElementById('startButton').click();
            } else {
                document.getElementById('startButton').click();
                document.getElementById('startButton').click();
            }
        })
    }

    // add Modal open and close handler:
    document.getElementById('openModalButton').addEventListener('click', openModal);
    document.getElementById('closeModalButton').addEventListener('click', closeModal);;
}


// add primary eventListener:
addEventListener('load', addHandlers);
