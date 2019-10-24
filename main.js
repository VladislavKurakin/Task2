let dogs = {
    name: 'Djek',
    age: 10,
    color: 'grey',
  };
  let json = JSON.stringify(dogs);
 
$('button').click(function(event ){
    event.stopPropagation(); // Остановка происходящего
    event.preventDefault();  // Полная остановка происходящего
    // Отправляем запрос 
    $.ajax({
        url: './submit.php?uploadfiles',
        type: 'POST',
        data: json,
        cache: false,
        dataType: 'json',
        processData: false, // Не обрабатываем файлы (Don't process the files)
        contentType: false, // Так jQuery скажет серверу что это строковой запрос
        success: function( respond, textStatus, jqXHR ){
 
            // Если все ОК
 
            if( typeof respond.error === 'undefined' ){
                // Файлы успешно загружены
                    alert("Файлы успешно загружены");
                    console.log(textStatus);
                // выведем пути к загруженным файлам в блок '.ajax-respond'
 
                var files_path = respond.files;
                var html = '';
                $.each( files_path, function( key, val ){ html += val +'<br>'; } )
                $('.ajax-respond').html( html );
            }
            else{
                console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
            }
        },
        error: function( jqXHR, textStatus, errorThrown ){
            console.log('ОШИБКИ AJAX запроса: ' + textStatus );
        }
    });
});