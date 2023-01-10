// 数据传递
const datas = {
  // 大小相同的图片
  // images: [
  //   './images/t1.png',
  //   './images/t2.png',
  //   './images/t3.png',
  //   './images/t4.png',
  //   './images/t5.png',
  //   // './images/t6.png',
  // ],
  // 大小不同的图片
  images: [
    './images/1.jpg',
    './images/2.gif',
    './images/3.jpg',
    './images/4.jpg',
    './images/7.jpg',
    './images/t6.png',
  ],
  size: 5, // 每页的数量展示
}

function f(id) {
  return document.getElementById(id)
}

function getStyle(obj, attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  }else{
    return getComputedStyle(obj, false)[attr];
  }
}

function Animate(obj, json){
  if(obj.timer){
    clearInterval(obj.timer);
  }
  obj.timer = setInterval(function(){
    for(var attr in json){
      var iCur = parseInt(getStyle(obj, attr));
      iCur = iCur ? iCur : 0;
      var iSpeed = (json[attr] - iCur) / 5;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      obj.style[attr] = iCur + iSpeed + 'px';
      if(iCur == json[attr]){
        clearInterval(obj.timer);
      }
    }
  }, 30);
}

$(document).ready(function() {
  const { images, size } = datas;
  const imageLen = images.length;
  const app = f('app'), 
    showImage = f('showImgBox'), 
    imgListBox = f('imgListBox'), 
    prevBtn = f('prevBtn'), 
    nextBtn = f('nextBtn');
  const showImageUl = showImage.getElementsByTagName('ul')[0];
  const showImageLi = showImage.getElementsByTagName('li');
  const imgListBoxContainer = imgListBox.getElementsByClassName('imgListBox')[0];
  const imgListBoxUl = imgListBox.getElementsByTagName('ul')[0];
  const imgListBoxLi = imgListBox.getElementsByTagName('li');
  /************************* 图片渲染 *************************/
  images.forEach(function(img, index) {
    const tag = index === 0 ? '<li class="active">' : '<li>'
    const image_show = tag + "<a><img alt='' src='"+ img +"'/></a></li>"
    $('#app .imgList').append(image_show)
  })

  function setImageCls(ulCls) {
    Array.prototype.slice.call(ulCls.getElementsByTagName('img')).forEach(function(img, i) {
      var currentCls = 'high'
      if (img.width >= img.height) { // 横向图片, 高100%
        currentCls = 'breadth'
      }
  
      img.classList.add(currentCls)
    })
  }

  // 图片列表部分宽高展示优化
  setImageCls(imgListBoxUl)
  // 图片展示部分宽高展示优化
  setImageCls(showImageUl)

  /************************* 宽度计算 *************************/
  // 设置图片列表下每一个li的宽度
  var imgListBoxLiWidth;
  if (imageLen <= size) {
    imgListBox.classList.add('lessfive')
    imgListBoxLiWidth = Math.floor(app.offsetWidth / imageLen);
  } else {
    // 如果图片大于5张，展示左右箭头图标
    imgListBox.classList.add('morefive');
    prevBtn.style.display = 'block'
    nextBtn.style.display = 'block'
    imgListBoxLiWidth = Math.floor((app.offsetWidth - 40) / size)
  }
  for (var i = 0; i < imageLen; i++) {
    imgListBoxLi[i].style.width = imgListBoxLiWidth + 'px'
  }
  // 获取展示图片的宽度
  const showImageLiWidth = showImageLi[0].offsetWidth;
  // 设置图片列表ul的宽度
  imgListBoxUl.style.width = imgListBoxLiWidth * imageLen + 'px';
  // 设置展示图片ul的宽度
  showImageUl.style.width = showImageLiWidth * imageLen + 'px';

  /************************* 自动轮播 *************************/
  var index = 0;
	var num2 = Math.ceil(size / 2);

  function imageChange() {
    Animate(showImageUl, {left: - index * showImageLiWidth});
		if(index < num2){
			Animate(imgListBoxUl, {left: 0});
		}else if(index + num2 <= imageLen){
			Animate(imgListBoxUl, {left: - (index - num2 + 1) * imgListBoxLiWidth});
		}else{
			Animate(imgListBoxUl, {left: - (imageLen - size) * imgListBoxLiWidth});
		}
    // 图片列表
    for (var i = 0; i < imageLen; i++) {
      imgListBoxLi[i].className = '';
      if (i === index) imgListBoxLi[i].className = 'active';
    }
  }
  function autoPlay() {
    index++;
    index = index === imageLen ? 0 : index;
    imageChange()
  }
  var timer = null, onPreview = false;
	timer = setInterval(autoPlay,4000);

  /************************* 点击列表图片轮播到指定位置 *************************/
  for (var i = 0; i < imageLen; i++) {
    imgListBoxLi[i].index = i;
    imgListBoxLi[i].onclick = function(){
			index = this.index;
			imageChange();
		}
  }

  /************************* 点击左右图标滑动显示图片列表 *************************/
  prevBtn.onclick = function() {
    Animate(imgListBoxUl, { left: 0 });
  }

  nextBtn.onclick = function() {
    Animate(imgListBoxUl, { left: - (imageLen - size) * imgListBoxLiWidth });
  }

  /************************* 鼠标移动事件轮播处理 *************************/
  prevBtn.onmouseover = nextBtn.onmouseover = showImage.onmouseover = function() {
    if (onPreview) return
    clearInterval(timer);
  }

  prevBtn.onmouseout = nextBtn.onmouseout = showImage.onmouseout = function() {
    if (onPreview) return
    timer = setInterval(autoPlay,4000);
  }

  /************************* 点击图片放大 *************************/
  for (var j = 0; j < imageLen; j++) {
    showImageLi[j].onclick = function() {
      showZoomImg(images, index, {
        onRemove: function() {
          onPreview = false
          timer = setInterval(autoPlay,4000);
        },
        onShow: function() {
          onPreview = true
          clearInterval(timer);
        }
      })
    };
  }
})