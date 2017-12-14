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
  var isdesktop = device.default.desktop()
  if (isdesktop) {
    $('.img-tips').css('display', 'none')
  } else {
    $('.desktop_control').css('display', 'none')
  }
  handleWechatShare()
});

function handleWechatShare() {
  var url = window.location.href.split('#')[0]
  var apiurl = 'http://neo1128.toma.ltd/getsignpackage.php?url=' + url
  $.get(apiurl, function(res) {
    wx.config({
      debug: false,
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
    })
    wx.ready(function() {
      const imgUrl = './imgmini.jpg'
      const _localInfo = that.localInfo.substring(1, that.localInfo.length);
      var link = url
      wx.onMenuShareTimeline({
        desc: '别怪我没提醒你，内藏惊“玺”', //摘要,如果分享到朋友圈的话，不显示摘要。
        title: '没想到，他们是千玺的1128分之一', //分享卡片标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 自定义图标
        trigger: function(res) {
          // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
          //alert('click shared');
        },
        success: function(res) {
          //alert('shared success');
          //some thing you should do
        },
        cancel: function(res) {
          //alert('shared cancle');
        },
        fail: function(res) {
          //alert(JSON.stringify(res));
        }
      });
      wx.onMenuShareAppMessage({
        desc: '别怪我没提醒你，内藏惊“玺”', //摘要,如果分享到朋友圈的话，不显示摘要。
        title: '没想到，他们是千玺的1128分之一', //分享卡片标题
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 自定义图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          // 用户确认分享后执行的回调函数
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  });
}
