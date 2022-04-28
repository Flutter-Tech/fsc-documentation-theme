---
---
(function (flt, undefined) {
  flt.addEvent = function (el, type, handler) {
    if (el.attachEvent) el.attachEvent('on' + type, handler); else el.addEventListener(type, handler);
  }
  flt.removeEvent = function (el, type, handler) {
    if (el.detachEvent) el.detachEvent('on' + type, handler); else el.removeEventListener(type, handler);
  }
  flt.onReady = function (ready) {
    // Rendered
    if (document.readyState != 'loading') ready();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function () {
      if (document.readyState == 'complete') ready();
    });
  }
})(window.flt = window.flt || {});

function initHierarchyTree() {
  // Open and close a single tree branch
  const hierarchyTree = document.querySelector("#hierarchy-tree");

  if (typeof (hierarchyTree) != 'undefined' && hierarchyTree != null) {
    let hierarchyBranches = hierarchyTree.querySelectorAll(".hierarchy-parent");

    hierarchyBranches.forEach(function (branch) {
      // Removes open symbol if there's no children
      if (branch.getElementsByTagName("ul").length == 0) {
        let childrenMarker = branch.querySelector("span");

        if (childrenMarker) {
          childrenMarker.classList.toggle("symbol");
        }
      }

      // Toggles open in branch
      branch.addEventListener(
        "click",
        (event) => {
          event.target.classList.toggle("open");
        },
        true
      );

      // Toggles open in icon
      const branchIcon = branch.querySelector("span");
      if (branchIcon) {
        branchIcon.addEventListener(
          "click",
          (event) => {
            event.target.parentNode.classList.toggle("open");
          },
          true
        );
      }
    });

    // Expand all tree branches
    const expandTreeBtn = document.querySelector("#expandTreeBtn");

    expandTreeBtn.addEventListener("click", (event) => {
      hierarchyBranches.forEach(function (branch) {
        if (!branch.classList.contains("open")) {
          branch.classList.add("open");
        }
      });
    });

    // Collapse all tree branches
    const collapseTreeBtn = document.querySelector("#collapseTreeBtn");

    collapseTreeBtn.addEventListener("click", (event) => {
      hierarchyBranches.forEach(function (branch) {
        if (branch.classList.contains("open")) {
          branch.classList.remove("open");
        }
      });
    });
  }
}

function initLazyLoadImages() {
  // Lazy load images
  var lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
}

function initSideMenuNavigation() {
  //Adds css class to open element
  const toggleVerticalMenu = (el) => {
    var parentEl = el.parentNode;
    parentEl.classList.toggle("block");
    parentEl.getElementsByTagName("UL")[0].classList.toggle("hidden");
    parentEl.getElementsByTagName("DIV")[0].classList.toggle("block");
  }

  //Marks the menu that points to the current URL
  const markMenu = (menuElements) => {
    for (let linkMenu of menuElements) {
      linkMenuHref = linkMenu.getAttribute("href");
      if (linkMenuHref === window.location.pathname) {
        linkMenuParent = linkMenu.parentNode;
      }
    }
  }

  //Checks if is child menu and opens parents
  const openMenus = (menuElements) => {
    for (var i = 0; i < menuElements.length; i++) {
      while (!menuElements[i].classList.contains("root-menu")) {
        menuElements[i] = menuElements[i].parentNode;
        // Check if the element has to be marked and mark it
        if (menuElements[i].classList.contains("nav-parent")) {
          menuElements[i].classList.add("nav-open");
          menuElements[i].getElementsByTagName("UL")[0].classList.toggle("hidden");
          menuElements[i].getElementsByTagName("DIV")[0].classList.toggle("block");
        }
      }
    }
  }

  // Finds element by class that match and URL
  const findElementByClassUrl = (cssclass, url) => {
    var elements = document.getElementsByClassName(cssclass);
    var found = [];
    for (var i = 0; i < elements.length; i++) {
      // Check if element is the one that points to the passed url
      if (elements[i].href === url && elements[i].classList.contains(cssclass)) {
        found.push(elements[i]);
      }
    }
    return found;
  }

  // Navigation control
  // Adds toggle to parent menus
  const menuIconToggleEls = document.getElementsByClassName("parent-icon");
  for (let toggleEl of menuIconToggleEls) {
    toggleEl.addEventListener("click", function () {
      toggleVerticalMenu(toggleEl);
    });
  }
  // Adds marking class to current page menu
  const linkMenusEl = document.getElementsByClassName("menu-link");
  markMenu(linkMenusEl);
  // Opens parent menus
  const menuElements = findElementByClassUrl("menu-link", window.location.href);
  openMenus(menuElements);
}

function initDisplayToggler(){
  const togglers = document.querySelectorAll('[data-toggler]')

  togglers.forEach(function(toggler){
    toggler.nextElementSibling.classList.toggle('hidden')
    toggler.addEventListener('click', function(){
      toggler.nextElementSibling.classList.toggle('hidden');
    })
  });
}

function initMobileNavigation() {
  const body = document.querySelector("body");
  const burgerMenu = document.querySelector('[data-burger-menu]');
  const mobileNavigation = document.querySelector('[data-mobile-nav]');
  const mobileNavClose = document.querySelector('[data-mobile-nav-close]');
  const mobileNavOverlay = document.querySelector('[data-mobile-nav-overlay]');

  burgerMenu.addEventListener('click', function(){
    body.classList.toggle('overflow-hidden');
    mobileNavOverlay.classList.toggle('-translate-x-full');
    mobileNavigation.classList.toggle('-translate-x-full');
  });
  mobileNavClose.addEventListener('click', function(){
    body.classList.toggle('overflow-hidden');
    mobileNavOverlay.classList.toggle('-translate-x-full');
    mobileNavigation.classList.toggle('-translate-x-full');
  });
}

flt.onReady(function () {
  initLazyLoadImages();
  initSideMenuNavigation();
  initMobileNavigation();
  initDisplayToggler();
  initHierarchyTree();
  {% if site.site_search %}
  initSearch();
  {% endif %}
})
