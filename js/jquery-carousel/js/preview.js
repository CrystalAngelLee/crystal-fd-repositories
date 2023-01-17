function showZoomImg(images, index, options) {
  var containerCls = 'imagePrevewLayout'
  var container = document.getElementsByClassName(containerCls)[0] || ''
  if (options && typeof options.onShow === 'function') options.onShow()

  if (!container) {
    const container = "<div class="+ containerCls +">" + 
      "<div class=\"mask-layer-black\"></div>" +
      "<div class=\"mask-layer-container\">" +
        "<div class=\"mask-layer-imgbox\"></div>" +
      "</div>" +
    "</div>" 
    $("body").append(container);
  }

  // 加载图片
  $(".mask-layer-imgbox").empty();
  var imgCont = '<div class="mask-layer-imgName">' + images[index] + '</div>' +
      '<div class="layer-img-box"><img src="' + images[index] + '" alt=""></div>';
  $(".mask-layer-imgbox").append(imgCont);

  // 点击layout关闭层
  $('.' + containerCls).click(function() {
    $('.' + containerCls).remove();
    if (options && typeof options.onRemove === 'function') options.onRemove()
  });
}