$(document).ready(function() {
  $('.relative-post').each(function() {
    var $post = $(this);
    var colorVariet = $post.find('span[style*="color:#"]').css('color');

    if (colorUsuario) {
      $post.get(0).style.setProperty('--varicolor', colorVariet);
    }
  });
});
