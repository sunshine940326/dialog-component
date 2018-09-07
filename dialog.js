/*
 * @Author: likang xie 
 * @Date: 2018-09-07 17:49:42 
 * @Purpose: Dialog组件脚本
 */

let dialog = (function () {

  // 节点类型
  let elem, dialog, cancelBtn, confirmBtn;

  // 动画函数数组
  let animaArr = new Array(['fadeIn', 'fadeOut'], ['slideDown', 'slideUp'], ['scaleIn', 'scaleOut']);

  // 当前动画类型
  let currAnimation = '';


  /**
   * @method getNeedElement 获取所需要的节点 
   */
  let getNeedElement = function () {
    // 一家人最重要是整整齐齐 
    elem = document.querySelector('.dialog-wrapper');
    dialog = elem.querySelector('.dialog');
    cancelBtn = elem.querySelector('.cancel-btn');
    confirmBtn = elem.querySelector('.confirm-btn');
  }


  /**
   * @method show 显示dialog组件
   * @param {Object} options 一系列参数
   * @returns {Object} 当前dialog节点 
   */
  let show = function (options = {}) {

    // 获取参数
    let {
      title = '', content = '兄弟，你好像忘记传content值了', skin = '', btns = ['确定'], confirm = null, cancel = null, shadeClose = true, animation = 1
    } = options;

    // 皮肤类名 
    let skinClass = skin ? ` ${skin}` : '';

    // 给当前动画类型赋值
    currAnimation = animation;

    // 生成按钮 
    let btnTemp = '';
    btns.forEach((item, index) => {
      if (index == 2) return;
      let btnClass = index == 0 ? 'confirm-btn' : 'cancel-btn';
      let temp = `<div class="btn ${btnClass}">${item}</div>`
      btnTemp += temp
    })

    // 最终生成的HTML 
    let html = `
      <div class="dialog-wrapper fadeIn">
        <div class="dialog${skinClass} ${animaArr[currAnimation][0]}">
          <div class="title">${title}</div> <div class="content">${content}</div>
          <div class="buttons">${btnTemp}</div>
        </div>
      </div> `;

    // 添加到Body 
    document.body.innerHTML += html;

    // 获取所需要的节点 
    getNeedElement();

    // 绑定事件 
    bindEvent(confirm, cancel, shadeClose);

    return elem;

  }


  /**
   * @method hide 关闭dialog组件
   */
  let hide = function (index) {

    // 最外层执行显示动画(固定) 
    elem.classList.add('fadeOut');

    // 内容层执行关闭动画
    dialog.classList.add(`${animaArr[currAnimation][1]}`);

    // 最终移除 
    setTimeout(() => {
      elem.remove();
    }, 200);

  }


  /**
   * @method bindEvent 给dialog绑定事件
   * @param {Object} confirm 确认回调
   * @param {Object} cancel 取消回调 
   */
  let bindEvent = function (confirm, cancel, shadeClose) {

    // confirm按钮的回调
    confirmBtn && confirmBtn.addEventListener('click', e => {
      hide();
      confirm && confirm();
    })

    // cancel按钮的回调 
    cancelBtn && cancelBtn.addEventListener('click', e => {
      hide();
      cancel && cancel();
    })

    // 是否开启点击遮罩关闭
    if (shadeClose) {
      elem.addEventListener('click', e => {
        let target = e.target || e.srcElement;
        if (/dialog-wrapper/.test(target.className)) {
          hide();
        }
      })
    }

  }

  // 对外暴露的方法
  return {
    show,
    hide
  }

})();