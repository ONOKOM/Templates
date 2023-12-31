



# Как установить шаблон в контроллер Wiren Board

## Краткая инструкия

Начиная с версии wb-2310 шаблоны предустановлены в Wirenboard и находятся в директории **/usr/share/wb-mqtt-serial/templates** </br>
Если вы загружаете шаблон самостоятельно и хотите, чтобы он не перезаписался при обновлении - кладите в директорию **/mnt /data/etc/wb-mqtt-serial.conf.d/templates** . </br>
Чтобы новый шаблон применился, нужно перезагрузить сервис командой **service wb-mqtt-serial restart** </br>
Версию шаблона можно посмотреть в файле шаблона (файл с расширением json) параметр templateVersion. </br>

Самые свежие общедоступные версии шаблонов находятся в этом репозитории </br>


## Видео инструкция </br></br>
Нажмите на картинку и откроется видео!

[![Видео инструкция](https://i.ytimg.com/vi_webp/hxfqnAGWiSA/maxresdefault.webp)](https://youtu.be/hxfqnAGWiSA)


## Текстовая инструкция </br></br>

<img src="https://onokom.ru/img/index/posti-novosti/podklyuchaem-kondicioner-haier-flexis-super-match-as25s2sf1fa-g-v-umnyj-dom-wirenboard-cherez-shlyuz-onokom-hr-1-mb-b-b-apple-home-yandex-alisa-spruthub-i-spruthome/100-otkryvaem-programmu-forklift-i-nazhimaem-na-knopku-podklyucheniya-znachok-molnii.webp"  alt="logo"/>

  

Открываем программу ForkLift и нажимаем на кнопку подключения (значок молнии)<br><br>

  

1. Вводим IP адрес контроллера в локальной сети. В нашем случае: **192.168.150.189**<br>

  

2. Вводим имя пользователя. По умолчанию, это **root**<br>

  

3. Вводим пароль. Пароль - **wirenboard**<br>

  

4. Нажимаем кнопку **«Подключение»**<br>

  

<img  src="https://onokom.ru/img/index/posti-novosti/podklyuchaem-kondicioner-haier-flexis-super-match-as25s2sf1fa-g-v-umnyj-dom-wirenboard-cherez-shlyuz-onokom-hr-1-mb-b-b-apple-home-yandex-alisa-spruthub-i-spruthome/101-sejchas-my-nahodimsya-v-direktorii-192-168-150-189mntdataroot.webp"  alt="logo"/>

  

Сейчас мы находимся в директории **192.168.150.189 /mnt /data /root**

Нам нужно попасть на одну директорию назад<br><br>

Переходим и попадаем в **192.168.150.189 /mnt /data**

  

<img  src="https://onokom.ru/img/index/posti-novosti/podklyuchaem-kondicioner-haier-flexis-super-match-as25s2sf1fa-g-v-umnyj-dom-wirenboard-cherez-shlyuz-onokom-hr-1-mb-b-b-apple-home-yandex-alisa-spruthub-i-spruthome/102-perekhodim-v-direktoriyu-etc.webp"  alt="logo"/>

  

Переходим в директорию **etc**

  
  

<img  src="https://onokom.ru/img/index/posti-novosti/podklyuchaem-kondicioner-haier-flexis-super-match-as25s2sf1fa-g-v-umnyj-dom-wirenboard-cherez-shlyuz-onokom-hr-1-mb-b-b-apple-home-yandex-alisa-spruthub-i-spruthome/103-perekhodim-v-direktoriyu-wb-mqtt-serial-conf-d.webp"  alt="logo"/>

  

Переходим в директорию **wb-mqtt-serial.conf.d**

  

<img  src="https://onokom.ru/img/index/posti-novosti/podklyuchaem-kondicioner-haier-flexis-super-match-as25s2sf1fa-g-v-umnyj-dom-wirenboard-cherez-shlyuz-onokom-hr-1-mb-b-b-apple-home-yandex-alisa-spruthub-i-spruthome/104-perekhodim-v-direktoriyu-templates.webp"  alt="logo"/>

  
  

<img  src="https://onokom.ru/img/index/posti-novosti/podklyuchaem-kondicioner-haier-flexis-super-match-as25s2sf1fa-g-v-umnyj-dom-wirenboard-cherez-shlyuz-onokom-hr-1-mb-b-b-apple-home-yandex-alisa-spruthub-i-spruthome/105-dobavlyaem-shablon-onokom-air-me-1-mb-b-prosto-peretashchiv-ego-v-nuzhnoe-okno.webp"  alt="logo"/>

  Переходим в директорию **templates**

Добавляем шаблон который нам потребуется, просто перетащив его в нужное окно

  

### После этого потребуется сделать:

#### Перезагрузить сервис wb-mqtt-serial через консоль следующей командой:

**service wb-mqtt-serial restart**