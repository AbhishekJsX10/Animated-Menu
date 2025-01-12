document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const closeBtn = document.querySelector(".close-btn");
    const menuContainer = document.querySelector(".menu-container");
    const menuItems = document.querySelectorAll(".menu-item");
    const links = document.querySelectorAll(".menu-item");
    let isInitialLoadComplete = false;
  
    menuToggle.addEventListener("click", () => {
      menuContainer.style.left = "0%";
      if (!isInitialLoadComplete) {
        cleanupAllEffects();
      }
      shuffleAll();
      animateMenuItems(menuItems, "in");
    });
  
    closeBtn.addEventListener("click", () => {
      menuContainer.style.left = "-50%";
      animateMenuItems(menuItems, "out");
      cleanupAllEffects();
    });

    function cleanupAllEffects() {
        links.forEach(link => {
            const targetElement = link.querySelector(
                ".menu-item-link a, .menu-title p, .menu-content p"
            );
            if (targetElement && targetElement.cleanupShuffleEffect) {
                targetElement.cleanupShuffleEffect();
            }
        });
    }

    function animateMenuItems(items, direction) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.left = direction === "in" ? "0px" : "-100px";
          }, index * 50);
        });
    }

    const link = new SplitType(".menu-item a", { types: "words, chars" });
    const span = new SplitType(".menu-item span", { types: "words, chars" });
    const menuTitle = new SplitType(".menu-title p", { types: "words, chars" });
    const menuContent = new SplitType(".menu-content p", { types: "words, chars" });

    document.querySelectorAll(".menu-item").forEach((item) => {
        const linkElement = item.querySelector(".menu-item-link a");
        const bgHover = item.querySelector(".bg-hover");
        const spanElement = item.querySelector("span");
      
        if (linkElement) {
          const width = linkElement.offsetWidth;
          if (bgHover) {
            bgHover.style.width = width + 30 + "px";
          }
      
          if (spanElement) {
            spanElement.style.left = width + 40 + "px";
          }

          function addShuffleEffect(element) {
              if (element.cleanupShuffleEffect) {
                  element.cleanupShuffleEffect();
              }

              const chars = element.querySelectorAll(".char");
              const originalText = [...chars].map((char) => char.textContent);
              let intervals = [];

              chars.forEach((char, index) => {
                  const interval = setInterval(() => {
                      char.textContent = String.fromCharCode(
                          65 + Math.floor(Math.random() * 26)
                      );
                  }, 50);
                  intervals.push(interval);

                  setTimeout(() => {
                      clearInterval(interval);
                      char.textContent = originalText[index];
                  }, 500 + index * 50);
              });

              element.cleanupShuffleEffect = () => {
                  intervals.forEach(interval => clearInterval(interval));
                  chars.forEach((char, index) => {
                      char.textContent = originalText[index];
                  });
              };
          }

          if (!item.id || item.id !== 'active') {
              item.addEventListener("mouseenter", () => {
                  if (bgHover && !item.id) {
                      bgHover.style.opacity = "1";
                  }
                  addShuffleEffect(linkElement);
              });

              item.addEventListener("mouseleave", () => {
                  if (bgHover && !item.id) {
                      bgHover.style.opacity = "0";
                  }
                  if (linkElement.cleanupShuffleEffect) {
                      linkElement.cleanupShuffleEffect();
                  }
              });
          } else {
              // For active item, only do text shuffle on hover
              item.addEventListener("mouseenter", () => {
                  addShuffleEffect(linkElement);
              });
              item.addEventListener("mouseleave", () => {
                  if (linkElement.cleanupShuffleEffect) {
                      linkElement.cleanupShuffleEffect();
                  }
              });
          }
        }
    });

    function shuffleAll() {
        cleanupAllEffects();
        links.forEach((link) => {
            const targetElement = link.querySelector(
                ".menu-item-link a, .menu-title p, .menu-content p"
            );
            if (targetElement) {
                addShuffleEffect(targetElement);
            }
        });
        setTimeout(() => {
            isInitialLoadComplete = true;
        }, 1000);
    }

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cleanupAllEffects();
        }
    });
});