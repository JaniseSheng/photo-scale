var scalenum = 1
var scaleTop = 0
var scaleLeft = 0
function scale1() {
  scalenum++
  if (scalenum > 6) {
    scalenum = 6
  }
  var img = document.getElementById('scaleimg')
  img.style.transform = 'scale(' + scalenum + ')'
}
function scale0() {
  scalenum--
  if (scalenum < 1) {
    scalenum = 1
  }
  var img = document.getElementById('scaleimg')
  img.style.transform = 'scale(' + scalenum + ')'
}
function img_left() {
  scaleLeft = scaleLeft - 20
  var img = document.getElementById('scaleimg')
  img.style.left = scaleLeft + '%'
}
function img_right() {
  scaleLeft = scaleLeft + 20
  var img = document.getElementById('scaleimg')
  img.style.left = scaleLeft + '%'
}
function img_up() {
  scaleTop = scaleTop - 20
  var img = document.getElementById('scaleimg')
  img.style.top = scaleTop + '%'
}
function img_down() {
  scaleTop = scaleTop + 20
  var img = document.getElementById('scaleimg')
  img.style.top = scaleTop + '%'
}
function img_return() {
  scaleTop = 0
  scaleLeft = 0
  scalenum = 1
  var img = document.getElementById('scaleimg')
  img.style.left = 0
  img.style.top = 0
  img.style.transform = 'scale(1)'
}

$(document).ready(function() {
  var _localUrl = window.location.href.split('#')[0];
  if (_localUrl.indexOf('&') > -1) {
    window.location.href = 'http://neo1128.toma.ltd/'
    return
  }
  var isdesktop = device.default.desktop()
  if (isdesktop) {
    $('.desktop_control').css('display', 'block')
  } else {
    $('.img-tips').css('display', 'block')
  }
  handleWechatShare()
});


function handleWechatShare() {
  var url = window.location.href.split('#')[0]; //'http://neo1128.toma.ltd/' //window.location.href.split('#')[0];
  var ajaxurl = 'http://neo1128.toma.ltd/getsignpackage.php?url=' + url
  $.get(ajaxurl, function(res) {
    wx.config({
      debug: false,
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']
    });
    wx.ready(function() {
      var share_config = {
        imgUrl: 'http://neo1128.toma.ltd/imgmini.jpg', //分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
        desc: '别怪我没提醒你，内藏惊“玺”', //摘要,如果分享到朋友圈的话，不显示摘要。
        title: '没想到，他们是千玺的1128分之一', //分享卡片标题
        link: url,
        success: function() { //分享成功后的回调函数
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      }
      wx.onMenuShareAppMessage(share_config);
      wx.onMenuShareTimeline(share_config);
      wx.onMenuShareQQ(share_config);
    })
  });
}
