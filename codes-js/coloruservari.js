$(function() {
  function aplicarVariColor() {
    $('.relative-post').each(function() {
      var $post = $(this);
      var colorUsuario = $post.find('span[style*="color:#"]').css('color');

      if (colorUsuario) {
        $post.get(0).style.setProperty('--varicolor', colorUsuario);
      }
    });
  }

  aplicarVariColor();
  setTimeout(aplicarVariColor, 300);
});
