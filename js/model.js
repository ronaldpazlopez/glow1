var db;
var dataset;

function initDatabase() {
    console.debug('called initDatabase()');

    try {
        if (!window.openDatabase) {
            alert('not supported');
        } else {
            var shortName = 'NeutrogenaQuiz';
            var version = '1.0';
            var displayName = 'Neutrogena Quiz';
            var maxSizeInBytes = 65536;
            db = openDatabase(shortName, version, displayName, maxSizeInBytes);
			
            createTableIfNotExists();
            //AGREGAR TABLA DE CONFIGURACION VERSION 3.0
            //REVISADO NOV 2015
        }
    } catch(e) {
        if (e == 2) {
            alert('Invalid database version');
        } else {
            alert('Unknown error ' + e);
        }
        return;
    }
}

function createTableIfNotExists() {
    console.debug('called createTableIfNotExists()');
	
	_tb_registrados();
    _tb_quiz_neutrogena();
}


function _tb_registrados(){
	console.debug('called _tb_registrados()');

    var sql = "CREATE TABLE IF NOT EXISTS upl_registrados (id INTEGER PRIMARY KEY AUTOINCREMENT,fecha TEXT, nombre TEXT, apellido TEXT, email TEXT, dni TEXT);";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], _emptyFunction, handleErrors);
            console.debug('executeSql: ' + sql);
        }
    );
}

function _tb_quiz_neutrogena(){
	console.debug('called _tb_quiz_neutrogena()');

    var sql  = "CREATE TABLE IF NOT EXISTS upl_quiz_neutrogena (id INTEGER PRIMARY KEY AUTOINCREMENT,fecha TEXT, id_usuario TEXT, respondio TEXT, resultado TEXT);";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], _emptyFunction, handleErrors);
            console.debug('executeSql: ' + sql);
        }
    );
}

function _emptyFunction(){
	//Empty
}

function _strFecha(){

	now = new Date();
	year = "" + now.getFullYear();
	month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
	hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
	minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
	second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }

	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

function _getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function __arr_count(arr_values){
    var result_array = [];
    var current = null;
    var cnt = 0;
   
    for (var i = 0; i < arr_values.length; i++) {
        if (arr_values[i] != current) {
            if (cnt > 0) {
                result_array.push([current,cnt]);
            }
            current = arr_values[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        result_array.push([current,cnt]);
    }

    return result_array.sort(function(x,y) {return y[1] - x[1]})
}




function __switch_resultado(arr_sort){
   
    if (arr_sort.length >=2){
        if (arr_sort[0][1] == arr_sort[1][1]){
            return "igual";
        }else{
           
            //alert("opcion " + arr_sort[0][0]  + " de " + arr_sort[0][1]);
            return arr_sort[0][0];
        }
    }else{
   
        if (arr_sort.length ==1){
            //alert("unica opcion " + arr_sort[0][0]  + " de " + arr_sort[0][1]);
            return arr_sort[0][0];
        }
    }
   
}

function __view_resultado(respuesta){
    var _template = "";
   
    if (respuesta =="igual"){
        _template = "resultado_02";
    }else if(respuesta =="1"){
        _template = "resultado_01";//piel_normal
    }else if(respuesta =="2"){
        _template = "resultado_02";//piel_mixta
    }else if(respuesta =="3"){
        _template = "resultado_03";//piel_grasa
    }else if(respuesta =="4"){
        _template = "resultado_04";//piel_grasa_con_tendencia
    }else{
        _template = "resultado_02";
    }
   
    return _template;
}


function sortmyway(data_A, data_B)
{
    return (data_A - data_B);
}

var _template  = "";

function insertRecordQuiz() {
    console.debug('called insertRecordQuiz()');

    var fecha      = _strFecha();
	var respondio  = "";
	var id_usuario = _getUrlVars()["id"];
	
	id_usuario = id_usuario.replace("#pregunta_b5","");
	
	if (arr_values !=null) respondio = arr_values.join();
	//console.log(respondio);
	
    var arr_ordenado = arr_values.sort(sortmyway);
    var arr_filtrado = __arr_count(arr_ordenado);
	
    var _respuesta = __switch_resultado(arr_filtrado);
    _template  = __view_resultado(_respuesta);
   
    //console.log(_template);
    //return false;
	
    var sql = 'INSERT INTO upl_quiz_neutrogena(fecha, id_usuario, respondio) VALUES (?, ?, ?)';
	
    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [fecha, id_usuario, respondio], showRecordsAndResetForm_Quiz, handleErrors);
            console.debug('executeSql: ' + sql);
			
        }
    );
}


function insertRecord() {
    console.debug('called insertRecord()');

    var nombre = $('#txt_nombre').val();
    var apellido = $('#txt_apellido').val();
	var email = $('#txt_email').val();
	var dni = $('#txt_dni').val();
	var fecha = _strFecha();
	
    var sql = 'INSERT INTO upl_registrados (fecha, nombre, apellido, email, dni) VALUES (?, ?, ?, ?, ?)';
	
    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [fecha, nombre, apellido, email, dni], showRecordsAndResetForm, handleErrors);
            console.debug('executeSql: ' + sql);
        }
    );
}


function dropTable() {
    console.debug('called dropTable()');

	if(confirm("\xBFEsta seguro que desea borrar la informaci\xF3n?")) { 
		alert("estamos..");
		_drop_tb_registrados();
		_drop_tb_quiz_neutrogena();
		
		location.href="listado.html";
		return false;
	}
}

function _drop_tb_registrados(){
	var sql = 'DROP TABLE upl_registrados';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], emptyFunction, handleErrors);
        }
    );
}

function _drop_tb_quiz_neutrogena(){
	var sql = 'DROP TABLE upl_quiz_neutrogena';

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], emptyFunction, handleErrors);
        }
    );
}


function resetForm() {
    console.debug('called resetForm()');

    $('#txt_nombre').val('');
    $('#txt_apellido').val('');
	$('#txt_email').val('');
	$('#txt_dni').val('');
    $('#id').val('');
}

function showRecordsAndResetForm(transaction, results) {
    console.debug('called showRecordsAndResetForm()');

    resetForm();
	
	//alert("Usuario registrado.");

	location.href="preguntas.html?id=" +  results.insertId;
}


function showRecordsAndResetForm_Quiz(transaction, results){
	console.debug('called showRecordsAndResetForm_Quiz()');
	//alert("Quiz registrado.");
	
	
	var intId = results.insertId;
	var str_resultado = _template;
	
	updateRecord(str_resultado,intId);
	
	
	return false;
}

function updateRecord(_template,id) {
    console.debug('called updateRecord()');
  	
    var sql = 'UPDATE upl_quiz_neutrogena set resultado=? WHERE id=?';
	
    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [_template.replace("resultado_0",""), id], _emptyFunction, handleErrors);
			
			setTimeout(function(){
				location.href="resultado.html#" + _template + "?id_r=" +  id + "&r=" + _template.replace("resultado_0","");
			},1000);
			
            //console.debug('executeSql: ' + sql);
        }
    );
}


function handleErrors(transaction, error) {
    console.debug('called handleErrors()');
    console.error('error ' + error.message);

    alert(error.message);
    return true;
}

function showRecords() {
    console.debug('called showRecords()');

    var sql = "SELECT * FROM upl_registrados order by id desc";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], renderRecords, handleErrors);
        }
    );
}

function showRecords_Quiz() {
    console.debug('called showRecords_Quiz()');

    var sql = "SELECT * FROM upl_quiz_neutrogena order by id desc";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], renderRecords_Quiz, handleErrors);
        }
    );
}


function renderRecords(transaction, results) {
    console.debug('called renderRecords()');

    html = '';
    
    dataset = results.rows;

	
    if (dataset.length > 0) {
        html = html + '';

        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);

            html = html + '    <tr>';
            html = html + '      <td>' + item['id'] + '</td>';
			html = html + '      <td>' + item['fecha'] + '</td>';
            html = html + '      <td>' + item['nombre'] + '</td>';
            html = html + '      <td>' + item['apellido'] + '</td>';
			html = html + '      <td>' + item['email'] + '</td>';
			html = html + '      <td>' + item['dni'] + '</td>';
            html = html + '    </tr>';
        }
	

       $('#grid2 tbody').append(html);
		
    }
}



function renderRecords_Quiz(transaction, results) {
    console.debug('called renderRecords_Quiz()');

    html = '';
    //$('#results_quiz').html('');

    dataset = results.rows;

	
    if (dataset.length > 0) {
        

      
		
        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);

            html = html + '<tr>';
            html = html + '<td style="width:150px">' + item['id'] + '</td>';
			html = html + '<td style="width:250px">' + item['fecha'] + '</td>';
            html = html + '<td style="width:150px">' + item['id_usuario'] + '</td>';
            html = html + '<td style="width:150px">' + item['respondio'] + '</td>';
			html = html + '<td style="width:150px">' + item['resultado'] + '</td>';

            html = html + '</tr>';
        }
	
        

        $('#grid tbody').append(html);
		
		
		
    }
}


function ajaxRecords(transaction, results) {
    console.debug('called ajaxRecords()');

    dataset = results.rows;
	
    if (dataset.length > 0) {

		var arr_data = [];
		
        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);
			arr_data.push(item);
        }
			
		$.ajax({
			type: "POST",
			url: "http://creacore.pe/quizneutrogena.com/quizneutrogena/phonegap_registrados",
			data: {"alias":"app_phonegap",uuid: uuid_device, data:arr_data},
			crossDomain : true,
			success: function(data){
				alert("Data de UsuariosQuiz enviada.");
				
			}, error: function(responseData, textStatus, errorThrown) { // 500 Status Header
			
				alert("Error al enviar UsuariosQuiz.");
	        }
		
		});
		
    }
}

function ajaxRecordsQuiz(transaction, results) {
    console.debug('called ajaxRecordsQuiz()');


    dataset = results.rows;
		
    if (dataset.length > 0) {

		var arr_data = [];
		
        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);
			arr_data.push(item);
        }
	
	
		$.ajax({
			type: "POST",
			url: "http://creacore.pe/quizneutrogena.com/quizneutrogena/phonegap_quiz",
			data: {"alias":"app_phonegap",uuid:uuid_device,data:arr_data},
			crossDomain : true,
			success: function(data){
				alert("Data de PreguntasQuiz enviada.");
				
			}, error: function(e) { // 500 Status Header
			   
				alert("Error al enviar PreguntasQuiz.");
	        }
		
		});
		
    }
}
function updateCacheContent(event) {
    console.debug('called updateCacheContent()');
    window.applicationCache.swapCache();
}

function iniciar_bd(){
    window.applicationCache.addEventListener('updateready', updateCacheContent, false);

    initDatabase();
};

function ctrlLogin(){
	var usuario = $("#tbUsuario").val();
	var password = $("#tbContrasena").val();
	
	if (usuario =="neutrogena" && password=="neutrogena987"){
		location.href = "listado.html";
	}else{
		alert("Acceso incorrecto.");
	}
	
	return false;
}



function ctrlSincronizar(){

	console.debug('called showRecords()');
	
	uuid_device = prompt("Por favor, ingrese nombre para identificar este dispositivo.", "");
    if (uuid_device !=""){
    	_ajax_tb_registrados();
    	_ajax_tb_quiz_neutrogena();
    }
}

function _ajax_tb_registrados(){
    var sql = "SELECT * FROM upl_registrados";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], ajaxRecords, handleErrors);
        }
    );
}

function _ajax_tb_quiz_neutrogena(){
    var sql = "SELECT * FROM upl_quiz_neutrogena";

    db.transaction(
        function (transaction) {
            transaction.executeSql(sql, [], ajaxRecordsQuiz, handleErrors);
        }
    );
}
