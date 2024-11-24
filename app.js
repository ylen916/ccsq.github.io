/* // script.js
document.addEventListener("DOMContentLoaded", function () {
  var floatingMenuContainer = document.getElementById(
    "floating-menu-container"
  );
  var menuToggle = document.getElementById("menu-toggle");
  var float_menu = document.getElementById("floating-menu-container");
  var menuItems = document.querySelectorAll(".menu-item");
  var popups = document.querySelectorAll(".popup");
  isMenuExpanded = false;
  menuToggle.addEventListener("click", function () {
    // 切换expanded类来显示或隐藏菜单内容
    floatingMenuContainer.classList.toggle("expanded");
    document.addEventListener("click", handleOutsideClick);
  });
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function (event) {
      event.preventDefault();

      // 关闭所有当前打开的弹出内容
      popups.forEach(function (popup) {
        popup.style.display = "none"; 
      });
      // 获取与点击的菜单项关联的弹出内容的ID
      var popupId = menuItem.getAttribute("data-popup");
      var popup = document.getElementById(popupId);
      // 设置弹出内容的位置（这里简单设置为菜单项的正下方）
      if (popup) {
        var menuItemRect = menuItem.getBoundingClientRect(); 
        popup.style.right = `${float_menu.offsetWidth + 10}px`;
        popup.style.top = `${menuItemRect.top}px`; // 加10px间距
        popup.style.display = "block"; 
      }
    });
  });
  // 点击弹出内容外部时关闭弹出内容（可选）
  window.addEventListener("click", function (event) {
    if (!event.target.closest("#menu-container, .popup")) {
      popups.forEach(function (popup) {
        popup.style.display = "none";
      });
    }
  });
  popups.forEach(function (popup) {
    popup.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
  // 获取改变颜色的菜单项
  var menuItems = document.querySelectorAll(".menu-item");
  // 初始body颜色（可选，如果您想在JavaScript中明确设置）
  var initialBodyColor = window.getComputedStyle(document.body).backgroundColor;

  // 为改变颜色的菜单项添加点击事件监听器
  menuItems[0].addEventListener("click", function (event) {
    event.preventDefault();
    // 改变body颜色
    document.body.style.backgroundColor = "lightblue"; // 您可以根据需要更改颜色
  });

  // 为恢复颜色的菜单项添加点击事件监听器
  menuItems[1].addEventListener("click", function (event) {
    event.preventDefault();
    // 恢复body颜色到初始状态（或者您可以选择另一个颜色）
    document.body.style.backgroundColor = initialBodyColor; // 或者直接使用您想要恢复的颜色，如'white'
  });

  function collapseMenu() {
    float_menu.classList.remove("expanded");
    if (isMenuExpanded) {
      floatingMenuContainer.classList.toggle("expanded");
    }

    isMenuExpanded = false;

    // 移除全局点击事件监听器
    document.removeEventListener("click", handleOutsideClick);
  }

  // 处理菜单外部点击的函数
  function handleOutsideClick(event) {
    // 检查点击是否发生在菜单或其子元素上
    if (!float_menu.contains(event.target)) {
      collapseMenu();
    }
  }
  // 由于我们已经在HTML中显示了悬浮菜单，所以不需要在JavaScript中再次显示它
  // 但如果你打算动态添加悬浮菜单，你可以在这里设置它的初始显示状态
  // floatingMenuContainer.style.display = 'block';
});
 */
var addbtu = document.getElementById("menu-container-wrapper");

addbtu.onclick = function (e) {
  // 检查是否已经存在浮动菜单容器，如果不存在则创建它
    var floatingMenuContainer = document.getElementById(
      "floating-menu-container"
    );
    if (!floatingMenuContainer) {
      // 创建浮动菜单容器
      floatingMenuContainer = document.createElement("div");
      floatingMenuContainer.id = "floating-menu-container";
      floatingMenuContainer.classList.add("floating-menu-container");
      document.body.appendChild(floatingMenuContainer);

      // 创建展开/收起按钮
      var menuCloseButton = document.createElement("button");
      menuCloseButton.type = "button";
      menuCloseButton.id = "menu-close";
      menuCloseButton.classList.add("menu-close");
      menuCloseButton.textContent = "×";
      floatingMenuContainer.appendChild(menuCloseButton);

      var menuToggleButton = document.createElement("button");
      menuToggleButton.type = "button";
      menuToggleButton.id = "menu-toggle";
      menuToggleButton.classList.add("menu-toggle");
      menuToggleButton.textContent = "☰ Menu";
      floatingMenuContainer.appendChild(menuToggleButton);

      // 创建菜单内容的容器
      var menuContentBody = document.createElement("div");
      menuContentBody.classList.add("menu-content-body");

      var menuContainer = document.createElement("div");
      menuContainer.id = "menu-container";
      menuContentBody.appendChild(menuContainer);

      // 创建菜单项
      var menuItemsHtml = [
        '<div class="menu-item" data-popup="popup-1"></div>',
        '<div class="menu-item" data-popup="popup-2">信息查错</div>',
        '<div class="menu-item" data-popup="popup-3">Item 3</div>',
        '<div class="menu-item" data-popup="popup-4">Item 4</div>',
        '<div class="menu-item" data-popup="popup-5">Item 5</div>',
        '<div class="menu-item" data-popup="popup-6">Item 6</div>',
        '<div class="menu-item" data-popup="popup-7">Item 7</div>',
        '<div class="menu-item" data-popup="popup-8">Item 8</div>',
        '<div class="menu-item" data-popup="popup-9">Item 9</div>',
      ];
      menuContainer.innerHTML = menuItemsHtml.join("");

      floatingMenuContainer.appendChild(menuContentBody);

      // 创建弹出内容容器
      var popupContainer = document.createElement("div");
      popupContainer.id = "popup-container";

      // 示例：创建一个弹出内容（其他弹出内容可以按需添加）
      var popup1 = document.createElement("div");
      popup1.id = "popup-1";
      popup1.classList.add("popup");
      popup1.innerHTML = `
        <h2>Settings for Item 1</h2>
        <label for="setting-1-1">Option 1:</label>
        <input type="text" id="setting-1-1" name="setting-1-1">
      `;
      popupContainer.appendChild(popup1);

      floatingMenuContainer.appendChild(popupContainer);
    }

    // 接下来的代码与之前提供的相同，用于处理菜单的显示、隐藏和弹出内容的逻辑
    var menuToggle = document.getElementById("menu-toggle");
    var float_menu = document.getElementById("floating-menu-container");
    var menuItems = document.querySelectorAll(".menu-item");
    var popups = document.querySelectorAll(".popup");
    var isMenuExpanded = false;

    menuToggle.addEventListener("click", function () {
      floatingMenuContainer.classList.toggle("expanded");
      document.addEventListener("click", handleOutsideClick);
    });

    menuItems.forEach(function (menuItem) {
      menuItem.addEventListener("click", function (event) {
        event.preventDefault();
        popups.forEach(function (popup) {
          popup.style.display = "none";
        });
        var popupId = menuItem.getAttribute("data-popup");
        var popup = document.getElementById(popupId);
        if (popup) {
          var menuItemRect = menuItem.getBoundingClientRect();
          popup.style.right = `${float_menu.offsetWidth + 10}px`;
          popup.style.top = `${menuItemRect.top + menuItemRect.height + 10}px`; // 修正位置，确保在菜单项下方
          popup.style.display = "block";
        }
      });
    });

    window.addEventListener("click", function (event) {
      if (!event.target.closest("#menu-container, .popup")) {
        popups.forEach(function (popup) {
          popup.style.display = "none";
        });
      }
    });

    popups.forEach(function (popup) {
      popup.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });

    var initialBodyColor = window.getComputedStyle(
      document.body
    ).backgroundColor;

    menuItems[0].addEventListener("click", function (event) {
      event.preventDefault();
      document.body.style.backgroundColor = "lightblue";
    });

    menuItems[1].addEventListener("click", function (event) {
      event.preventDefault();
      document.body.style.backgroundColor = initialBodyColor;
    });

    function collapseMenu() {
      float_menu.classList.remove("expanded");
      isMenuExpanded = false;
      document.removeEventListener("click", handleOutsideClick);
    }

    function handleOutsideClick(event) {
      if (!float_menu.contains(event.target)) {
        collapseMenu();
      }
    } 
};
