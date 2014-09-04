(function($) {
  $(document).ready(function () {
    equalColumns('#content-middle-wrap .leftcol','#content-middle-wrap .rightcol', 640);
    bottomForm();
  });


  var bottomForm = function(){
    $('.message .btn').click(function(){
      $('#bottom-form').fadeToggle();
      $('html, body').animate({scrollTop:1000},'50');
    });
  };

  var equalColumns = function (block1, block2, minWidth) {
    var $b1 = $(block1);
    var $b2 = $(block2);
    var height = $b1.height() > $b2.height() ? $b1.height() : $b2.height();
    if ($('body').width() > minWidth) {
      $b1.height(height);
      $b2.height(height);
    }
  }

  var formLabel = function (selector) {
    $(selector).each(function(){
        if($(this).val() != '') $(this).prev().addClass('hide');
    });
 
    $(selector).blur(function() {
        if ($(this).val() == '') $(this).prev().removeClass('hide');
    });
 
    $(selector).focus(function() {
        $(this).prev().addClass('hide');
    });
  }



})(jQuery);
