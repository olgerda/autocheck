var apiKey = "34074032"; // Replace with your API key. See https://dashboard.tokbox.com/projects
		var sessionId = "1_MX4zNDA3NDAzMn5-TW9uIE5vdiAxMSAwMzo0Mjo1NiBQU1QgMjAxM34wLjYxMTg5NDl-"; // Replace with your own session ID. See https://dashboard.tokbox.com/projects 
		var token = "T1==cGFydG5lcl9pZD0zNDA3NDAzMiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz02M2U1MWQyM2E1OWE3YjM2MTk0YzQ3YThhNWFmNGI2MjBhNTVkZWEyOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9MV9NWDR6TkRBM05EQXpNbjUtVFc5dUlFNXZkaUF4TVNBd016bzBNam8xTmlCUVUxUWdNakF4TTM0d0xqWXhNVGc1TkRsLSZjcmVhdGVfdGltZT0xMzg0MTcwMjEzJm5vbmNlPTAuMjQ2MDA3MzgyNjUzNDgxNjUmZXhwaXJlX3RpbWU9MTM4Njc2MjIxMyZjb25uZWN0aW9uX2RhdGE9"; // Replace with a generated token. See https://dashboard.tokbox.com/projects

		var session;
		var publisher;
		var microphones = [];
		var cameras = [];
		var microphoneGain = 50; // Inital gain: 50%

		// Un-comment either of the following to set automatic logging and exception handling.
		// See the exceptionHandler() method below.
		// TB.setLogLevel(TB.DEBUG);
		// TB.addEventListener("exception", exceptionHandler);

		function init() {
			if (TB.checkSystemRequirements() != TB.HAS_REQUIREMENTS) {
				alert("You don't have the minimum requirements to run this application."
					  + "Please upgrade to the latest version of Flash.");
			} else {
				//var parentDiv = document.getElementById("publisherContainer");
				//var replacementDiv = document.getElementById("videoPlaceHolder"); // Create a div for the publisher to replace
				//replacementDiv.id = "opentok_publisher";
				//parentDiv.appendChild(replacementDiv);

				publisher = TB.initPublisher(apiKey,"opentok_publisher");
				publisher.addEventListener("devicesDetected", devicesDetectedHandler);
				publisher.addEventListener("microphoneActivityLevel", microphoneActivityLevelHandler);
				<!--publisher.addEventListener("microphoneGainChanged", microphoneGainChangedHandler);-->
				<!--publisher.addEventListener("echoCancellationModeChanged", echoCancellationModeChangedHandler);-->

				//publisher.detectDevices();
			}
		}

		//--------------------------------------
		//  OPENTOK EVENT HANDLERS
		//--------------------------------------

		function devicesDetectedHandler(event) {
			var microphones = event.microphones;
			var cameras = event.cameras;
			var camsSelect = document.getElementById("cams");
			camsSelect.innerHTML = "";
			for (var i = 0; i < cameras.length; i++) {
				var camOption = document.createElement("option");
				camName =  cameras[i].name;
				camOption.setAttribute("value", camName);
				camOption.innerHTML = camName;
				camsSelect.appendChild(camOption);
				if (camName == event.selectedCamera.name) {
					camsSelect.selectedIndex = i;
				}
			}
			var micSelect = document.getElementById("mics");
			micSelect.innerHTML = "";
			for (i = 0; i < microphones.length; i++) {
				var micOption = document.createElement("option");
				var micName = microphones[i].name;
				micOption.setAttribute("value", micName);
				micOption.innerHTML = micName;
				micSelect.appendChild(micOption);
				if (micName == event.selectedMicrophone.name) {
					micSelect.selectedIndex = i;
				}
			}
			document.getElementById("call-status").innerHTML = "Devices detected.";
			show("cams");
			show("mics");
			show("manageDevicesBtn");
		}
		
		function microphoneGainChangedHandler(event) {
			microphoneGain = event.value;
			var gainControl = document.getElementById("gainControl");
			gainControl.value = microphoneGain;
		}
		
		function microphoneActivityLevelHandler(event) {
			var volumeIndictatorMask = document.getElementById("volumeIndicatorMask");
			volumeIndictatorMask.style.width = (100 - event.value * microphoneGain / 100) + "%";
		}

		function echoCancellationModeChangedHandler(event) {
			if (publisher.getEchoCancellationMode() == "fullDuplex") {
				document.getElementById("call-status").innerHTML = "Echo cancellation active.";
			} else {
				document.getElementById("call-status").innerHTML = "Echo cancellation mode inactive.";
			}
		}

		/*
		If you un-comment the call to TB.addEventListener("exception", exceptionHandler) above, OpenTok calls the
		exceptionHandler() method when exception events occur. You can modify this method to further process exception events.
		If you un-comment the call to TB.setLogLevel(), above, OpenTok automatically displays exception event messages.
		*/
		function exceptionHandler(event) {
			alert("Exception: " + event.code + "::" + event.message);
		}

		//--------------------------------------
		//  USER EVENT HANDLERS
		//--------------------------------------

		function detectDevices() {
			hide("cams");
			hide("mics");
            publisher.detectDevices();
		}

		// Called when the user clicks the manageDevicesBtn button
		function manageDevices() {
			show("manageDevicesDiv");
			publisher.detectMicActivity(true);
		}

		// Called when the user clicks the manageDevicesBtn button
		function closeManageDevices() {
			publisher.detectMicActivity(false);
			hide("manageDevicesDiv");
		}

		function setCamera() {
			var camsSelect = document.getElementById("cams");
			var cameraName = camsSelect.options[camsSelect.selectedIndex].value;
			publisher.setCamera(cameraName);
		}

		function setMicrophone() {
			var micsSelect = document.getElementById("mics");
			var micName = micsSelect.options[micsSelect.selectedIndex].value;
			publisher.setMicrophone(micName);
		}
		
		function setMicrophoneGain() {
			var gainControl = document.getElementById("gainControl");
			publisher.setMicrophoneGain(gainControl.value);
		}

		//--------------------------------------
		//  HELPER METHODS
		//--------------------------------------

		function show(id) {
			document.getElementById(id).style.display = 'block';
		}

		function hide(id) {
			document.getElementById(id).style.display = 'none';
		}
