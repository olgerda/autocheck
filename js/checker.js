var videoinstr = '';
var attempt = 0;
function result() {
	//document.getElementById("troubbut").disabled=true;
	document.getElementById('instr').innerHTML='<p>Настройка видео завершена. Для сохранения результата нажмите на видео правой кнопкой мыши и в меню выберите пункт "Параметры" ("Settings"). Затем выберите вкладку настроек конфиденциальности сайтов (вкладка, где изображен монитор с глазом) и отметьте опцию "Запомнить" ("Remember").</p><p>Проверьте, правильно ли отображается текст кейса: <a href="http://client.webassessment.ru/Account/LogOnTest/5ffdf1f9-28f0-4409-8d79-8e67b1174383" target="_blank"><u>Нажмите, чтобы проверить</u></a>.</p><p>После этого можете закрыть окно настроек и текущую вкладку в браузере</p>';
	document.getElementById('troubbut').style.display = 'none';
	document.getElementById('okbut').style.display = 'none';
}
function troub() {
	if (attempt == 0){
		document.getElementById('instr').innerHTML='<p>Проверьте, что камера подключена к компьютеру. <br>Проверьте, что вы вышли из skype и закрыли другие программы, использующие камеру. <br>Если Вы обнаружили и исправили проблемы, описанные выше, обновите страницу, если проблема не решена, обратитесь в техническую поддержку</p>';
		attempt += 1;
	}
	else if (attempt ==1){
		document.getElementById('instr').innerHTML='<p>Наведите курсор на черный квадрат и нажмите на пиктограмму с гаечным ключом. Проверьте, что выбранные камера и микрофон активны.</p><p>Если камера и микрофон выбраны и активны, но видео не загружается,  свяжитесь с нами.</p>';
		attempt += 1;
	}
	else {
		document.getElementById('instr').innerHTML='<p>Если видео не появилось после выполнения данной инструкции, сообщите нам, воспользовавшись кнопкой внизу страницы.</p><p>Мы свяжемся с Вами, чтобы помочь с решением возникших вопросов.</p>';
		document.getElementById('troubbut').style.display = 'none';
		document.getElementById('okbut').style.display = 'none';
	}
}
function CheckPorts(){
	document.check.PortAv.value="Подождите окончания проверки";
		
	window.TB.runTests(function(data) {
		if (data.cat_network.port_access["1935"].result == "Pass") {
            document.check.PortAv.value = "Порт 1935 открыт";
			document.check.Portstatus.src = "../img/tick.png";
			document.check.Portstatus.alt="OK";
		}
		else {
			document.check.PortAv.value = "Порт 1935 закрыт";
			document.check.Portstatus.src = "../img/cross.png";
			document.check.Portstatus.alt="Ошибка";
			document.getElementById('portsres').innerHTML = "Для передачи видео необходимо открыть порт 1935. Обратитесь к системному администратору."
		}
	})
}
function GetBrowser(){
	document.check.os.value = BrowserDetect.OS;
	document.check.Browser.value = BrowserDetect.browser + ', версия ' + BrowserDetect.version;
	if (BrowserDetect.OS == "iPhone/iPod" || BrowserDetect.OS == "Android") {
		document.check.OSstatus.src="../img/cross.png";
		document.check.OSstatus.alt="Ошибка";
		document.getElementById('osres').innerHTML = "К сожалению, видеосвязь с использванием технологии Flash не поддерживается Вашим устройством. Для корректной работы видеосвязи, используйте стационарный компьютер или ноутбук.";
	}
	else {
		document.check.OSstatus.src="../img/tick.png";
		document.check.OSstatus.alt="ОК";
	}
	if ((BrowserDetect.browser == 'Chrome' && BrowserDetect.version < 23) ||
		(BrowserDetect.browser == 'Firefox' && BrowserDetect.version < 18) || 
		(BrowserDetect.browser == 'Internet Explorer' && BrowserDetect.version < 8)) {
		document.check.Browstatus.src="../img/cross.png";
		document.check.Browstatus.alt="Ошибка";
		document.getElementById('browres').innerHTML = 'В Вашей версии браузера некоторые функции Web@ssessment&#8482 могут работать некорректно. <br>Мы рекомендуем использовать для работы с системой <u><a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">IE8</a></u>, <u><a href="http://www.mozilla.org/en-US/firefox/new/">Firefox 18</a></u>, <u><a href="https://www.google.com/intl/en/chrome/browser/">Chrome 23</a></u> или их более поздние версии <br>';
		
	}
	else if (BrowserDetect.browser != 'Chrome' && BrowserDetect.browser != 'Firefox' && BrowserDetect.browser != 'Internet Explorer') {
		document.check.Browstatus.src="../img/cross.png";
		document.check.Browstatus.alt="Ошибка";
		document.getElementById('browres').innerHTML = 'К сожалению, Ваш браузер не поддерживается системой Web@ssessment&#8482. Мы не можем гарантировать правильную работу системы. <br>Пожалуйста, используйте для работы с системой <u><a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">IE8</a></u>, <u><a href="http://www.mozilla.org/en-US/firefox/new/">Firefox 18</a></u>, <u><a href="https://www.google.com/intl/en/chrome/browser/">Chrome 23</a></u> или их более поздние версии <br>';
	}
    else {
        document.check.Browstatus.src="../img/tick.png";
        document.check.Browstatus.alt="ОК";
        if (BrowserDetect.browser == 'Chrome') {
        videoinstr = '<p>В окне Flash-видео (слева) нажмите "Разрешить" ("Allow").<br></p><p>Подтвердите разрешение на сообщении браузера в верхней части экрана («Разрешить»/“Allow”).</p><p>Если Вы видите себя, нажмите кнопку "Далее", если не видите - "Найти решение"</p>';
        }
        else {
        videoinstr = '<p><br></p><p>В окне Flash-видео (слева) нажмите "Разрешить" ("Allow").<br></p><p>Если Вы видите себя, нажмите кнопку "Далее", если не видите - "Найти решение"</p>';
        }
        //document.getElementById('browres').innerHTML = 'Поздравляем! Ваша версия браузера поддерживается.';
    }
}
function GetFPVersion(){
    var playerVersion = swfobject.getFlashPlayerVersion();
    if (playerVersion.major > 0) {
        <!--document.GetElementById("FPversion").innerHTML = playerVersion.major;-->
        document.check.FPversion.value = playerVersion.major + '.' + playerVersion.minor;
        if (playerVersion.major < 11) {
            document.getElementById('flashres').innerHTML = 'Эта версия FlashPlayer устарела и не поддерживается в системе Web@ssessment&#8482. Для работы в системе обновите <u><a href="http://get.adobe.com/flashplayer/">Flash Player</a></u>';
            document.check.FPstatus.src="../img/cross.png";
            document.check.FPstatus.alt="Ошибка";
        }
        else {
            //document.getElementById('flashres').innerHTML = 'Эта версия FlashPlayer подходит для работы в системе Web@ssessment&#8482.';
            document.check.FPstatus.src="../img/tick.png";
            document.check.FPstatus.alt="ОК";
        }
    }
    else {
        document.check.FPversion.value = 'FlashPlayer не установлен';
        document.check.FPstatus.src="../img/cross.png";
        document.check.FPstatus.alt="Ошибка";
        document.getElementById('flashres').innerHTML = 'Установите <u><a href="http://get.adobe.com/flashplayer/">Flash Player</a></u>, после этого Вы сможете использовать видеосвязь в системе Web@ssessment&#8482.';
    }
    
}

function CheckAll(){
    GetBrowser();
    GetFPVersion();
    //document.getElementById("ds").innerHTML = userNotify;
    CheckPorts();
    document.getElementById('instr').innerHTML=videoinstr;
}

function showIFrame(url)
{
    var container = document.getElementById('container');
    var iframebox = document.createElement('iframe');
    iframebox.src=url;
    iframebox.name="iframe";
    iframebox.width="100%";
    iframebox.height="450 px";
    container.appendChild(iframebox);
    container.style.display = 'block';
}