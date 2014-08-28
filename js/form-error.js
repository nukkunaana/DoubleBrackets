$(function() {
  $(".error").hide();

  // при изменении содержания input, в форме обратной связи, запускает валидацию
  $(".name_container input").change(validate.controls.name);
  $(".email_container input").change(validate.controls.email);
  $(".comment_container input").change(validate.controls.comment);
  // при клике на кнопку "Send" если все верно заполнено, то имитирует отправку форм.
  $("#addPersonButton").click(function(event){
    event.preventDefault();
    if(validate.all()){
      alert( "Отлично! Ваше сообщенице нам отправилось.");
    }
  });
}); 
   
// объект выполняющий валидацию
var validate = (function(){
  // объект выполняющий валидацию email
  var _regex = {
    // метод выполняющий валидацию email
    // получает email и проверяет его валидность
    // @param emailAddress [String] email для проверки
    // @return [Boolean]
    emailAddressIsValid: function(emailAddress){
      // регулярное выражение валидного email
      // http://stackoverflow.com/questions/2855865/jquery-validate-e-mail-address-regex
      var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);

      return pattern.test(emailAddress);
    }
  };

  // объект выпоняющий валидацию всех input
  // вызывается при клике на кнопку "Send"
  var all = function(){
    var invalidControls = [];
    // Запускает каждый метод валидации
    for(var controlValidationMethod in validate.controls){
      var $currentInput = $("#" + controlValidationMethod);
      var currentMethod = validate.controls[controlValidationMethod];
      // Если валидация не прошла, то записываем в массив название метода валидации
      if(!currentMethod.call($currentInput)){
        invalidControls.push(controlValidationMethod);
      }
    }

    if(invalidControls.length > 0){
      // Set focus on the first erroneous control
      $("#" + invalidControls[0]).focus();
    }
    return invalidControls.length == 0;
  };

  // Объект выполняющий валидацию инпутов
  var controls = {
    // Метод валидирующий имя
    name: function(){
      var $input = $(this);
      var isValid = true;
      var $errorNameText = $('.name_container span');

      // Если поле с именем пустое
      if($input.val() == ""){
        $errorNameText.text('Ай ай! Кто-то не написал свое имя.');
        $errorNameText.show();
        console.log($errorNameText);
        isValid = false;
      }
      else if($input.val().length > 25){
        $errorNameText.text('Компьютер не понимает, когда имя больше 25 букв.');
        $errorNameText.show();
        isValid = false;
      }
      else {
        // Valid, remove any existing form error message for this input
        $errorNameText.hide();
      }

      return isValid;
    },

    // Метод валидирующий имейл
    email: function(){
      var $input = $(this);
      var isValid = true;
      var $errorEmailText = $('.email_container span');

      if($input.val() == ""){
        $errorEmailText.text('Чтобы написали ответ, укажи почту :-)');
        $errorEmailText.show();
        isValid = false;
      }
      else if(!_regex.emailAddressIsValid($input.val())){
        $errorEmailText.text('Пиши почту правильно, например: name@example.com');
        $errorEmailText.show();
        isValid = false;
      }
      else{
        // Valid, remove any existing form error message for this input
        $errorEmailText.hide();
      }
        
      return isValid;
    },
     
    // Метод валидирующий коммент
    comment: function(){
      var $input = $(this);
      var isValid = true;
      var $errorCommentText = $('.comment_container span');

      if($input.val() == ""){
        $errorCommentText.text('Комментарий, пожалуйста!');
        $errorCommentText.show();
        isValid = false;
      }
      else{
        $errorCommentText.hide();
      }
          
      return isValid;
    },
  };
  return {
    // Позволяет обращаться к этим объектам 
     "all": all,
     "controls": controls};
})();