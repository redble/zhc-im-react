import React from "react";
import "./index.css";
/**
 * options:
 * {
 *  menus:[{
 *    name: string,
 *    onClick: Function
 *  }],
 * }
 */
const adjustPos = (x, y, w, h) => {
  const PADDING_RIGHT = 6; // 右边留点空位，防止直接贴边了，不好看
  const PADDING_BOTTOM = 16 * 2; // 下面也一样
  let _x = x - PADDING_RIGHT,
    _y = y - PADDING_BOTTOM;
  let vw = document.documentElement.clientWidth;
  let vh = document.documentElement.clientHeight;
  if (x + w >= vw) _x = x - w - PADDING_RIGHT;
  if (y + h >= vh) _y = vh - h - PADDING_BOTTOM;
  // console.log("adjust", x + w >= vw, y + h >= vh, _x, _y);
  return { x: _x, y: _y };
};
const getUuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
const getStyle = (k, v, q) => {
  let p = document.createElement("p");
  p.style[k] = v;
  document.body.appendChild(p);
  let _ = getComputedStyle(p)[q];
  document.body.removeChild(p);
  return _;
};
function createMenu(op) {
  const ul = document.createElement("ul");
  ul.className = "custom-context-menu";

  let { menus } = op;
  if (menus && menus.length > 0) {
    menus = menus.filter((e) => e != undefined);
    for (let i = 0; i < menus.length; i++) {
      let menu = menus[i];
      const li = document.createElement("li");
      li.textContent = menu.name ?? "undefined menu";
      li.onclick = menu.click
        ? () => menu.click({ x: ul.x, y: ul.y })
        : () => {};

      menu.attr &&
        menu.attr.forEach((e) => {
          li[e.name] = e.val;
        });
      ul.appendChild(li);
      if (i < menus.length - 1) ul.appendChild(document.createElement("hr"));
    }
  }
  return ul;
}
const ContextMenu = function (options) {
  return createMenu(options);
};

// const contextMenu = ContextMenu({
//   menus: [
//     {
//       name: "custom menu 1",
//       onClick: function (e) {
//         console.log("menu1 clicked");
//       },
//     },
//     {
//       name: "custom menu 2",
//       onClick: function (e) {
//         console.log("menu2 clicked");
//       },
//     },
//     {
//       name: "custom menu 3",
//       onClick: function (e) {
//         console.log("menu3 clicked");
//       },
//     },
//   ],
// });

// function showMenu(o, p) {
//   if (o != false) o.preventDefault();
//   if (o.targetTouches) {
//     o.clientX = o.targetTouches[0].clientX;
//     o.clientY = o.targetTouches[0].clientY;
//   }
//   // 移除之前的菜单
//   [...document.querySelectorAll(".custom-context-menu")].forEach((e) => {
//     try {
//       document.body.removeChild(e);
//     } catch (e) {}
//   });
//   // 将菜单添加到body中
//   document.body.appendChild(p);
//   // 获取菜单的尺寸

//   const menuWidth = p.offsetWidth;
//   const menuHeight = p.offsetHeight;

//   // 计算菜单的左侧和顶部位置

//   let reserve = 0; //parseInt(getStyle("margin", "4em", "margin").replace("px", ""));
//   let x = o.clientX;
//   let y = o.clientY;
//   let winWidth = window.innerWidth; //窗口的内部宽度（包括滚动条）
//   let winHeight = window.innerHeight;
//   let pageWidth = document.documentElement.clientWidth;
//   let pageHeight = document.documentElement.clientHeight;
//   console.log(pageWidth - menuWidth >= x, Math.random());
//   x = pageWidth - menuWidth >= x ? x : pageWidth - menuWidth - reserve;
//   y = pageHeight - menuHeight >= y ? y : pageHeight - menuHeight - reserve;
//   // 设置菜单的位置
//   p.style.top = `${y}px`;
//   p.style.left = `${x}px`;
// }
function fuckALLMenu() {
  for (let e of [...document.querySelectorAll(".custom-context-menu")]) {
    try {
      document.body.removeChild(e);
    } catch (e) {}
  }
  // console.log("fuck all menu ", [
  //   ...document.querySelectorAll(".custom-context-menu"),
  // ]);
}
function showMenuAnyWhere({ x, y, obj }) {
  obj.x = x;
  obj.y = y;
  const _ = obj.getBoundingClientRect();
  const menuWidth = _.width;
  const menuHeight = _.height;
  let style = MoveMenu({ x, y, menuWidth, menuHeight });
  for (let s in style) {
    obj.style[s] = style[s];
  }
}
function MoveMenu({ menuWidth, menuHeight, x, y }) {
  let style = {};

  // if (pageWidth - menuWidth <= x || x <= 0) {
  //   console.log("右侧超了", x);
  //   // 如果右侧超出边界，使用right定位
  //   style.right = `${Math.max(0, pageWidth - x)}px`;
  // } else {
  //   // 否则使用left定位
  //   style.left = `${Math.max(0, x)}px`;
  // }
  // if (menuHeight + y > pageHeight) {
  //   console.log("底部超了", y);
  //   y = pageHeight - menuHeight;
  // }
  let _ = adjustPos(x, y, menuWidth, menuHeight);
  style.left = `${_.x}px`;
  style.top = `${_.y}px`;

  return style;
}
function showMenu(o, p) {
  if (o != false) o.preventDefault();

  fuckALLMenu();
  // 移除之前的菜单
  document.body.appendChild(p);
  if (o.targetTouches) {
    o.clientX = o.targetTouches[0].clientX;
    o.clientY = o.targetTouches[0].clientY;
  }

  // 计算菜单的左侧和顶部位置
  let x = Math.round(o.clientX);
  let y = Math.round(o.clientY);

  showMenuAnyWhere({ x, y, obj: p });
}
function showMenuEx({ x, y, obj }) {
  let m = createMenu(obj);
  // 将菜单添加到body中
  document.body.appendChild(m);
  showMenuAnyWhere({ x, y, obj: m });
  //设置100ms后再添加事件 防止前一个菜单对后一个菜单关联导致后一个菜单无法显示
  setTimeout(() => {
    document.addEventListener("click", () => {
      hideMenu(m);
    });
  }, 100);
}
function hideMenu(p) {
  try {
    document.body.removeChild(p);
  } catch (e) {}
}
function longPressWithSwipe(element, callback, duration) {
  let pressTimer;
  let startX, startY;

  element.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    pressTimer = setTimeout(function () {
      callback(e);
    }, duration);
  });

  element.addEventListener("touchmove", function (e) {
    let deltaX = Math.abs(e.touches[0].clientX - startX);
    let deltaY = Math.abs(e.touches[0].clientY - startY);
    if (deltaX > 10 || deltaY > 10) {
      clearTimeout(pressTimer);
    }
  });

  element.addEventListener("touchend", function () {
    clearTimeout(pressTimer);
  });
}
function longPress(element, callback) {
  const longPressDuration = 750; // 长按的持续时间，单位毫秒
  // console.log(
  //   new AlloyFinger(element, {
  //     longTap: (e) => !e.preventDefault() && callback(e),
  //   })
  // );
  longPressWithSwipe(element, callback, longPressDuration);
}

export {
  ContextMenu,
  showMenu,
  hideMenu,
  longPress,
  createMenu,
  showMenuAnyWhere,
  showMenuEx,
  fuckALLMenu,
};
