document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const closeBtn = document.querySelector(".close-btn");
    const menuContainer = document.querySelector(".menu-container");
    const menuItems = document.querySelectorAll(".menu-item");
    const links = document.querySelectorAll(".menu-item");

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

    function cleanupAllEffects() {
        links.forEach(link => {
            const targetElement = link.querySelector(
                ".menu-item-link a"
            );
            if (targetElement && targetElement.cleanupShuffleEffect) {
                targetElement.cleanupShuffleEffect();
            }
            const spanElement = link.querySelector("span");
            if (spanElement && spanElement.cleanupShuffleEffect) {
                spanElement.cleanupShuffleEffect();
            }
        });

        // Clean up menu sub items
        document.querySelectorAll('.menu-sub-item').forEach(item => {
            const elements = item.querySelectorAll('p');
            elements.forEach(el => {
                if (el.cleanupShuffleEffect) {
                    el.cleanupShuffleEffect();
                }
            });
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

    // Add hover effects to menu sub items
    document.querySelectorAll('.menu-sub-item .menu-title p, .menu-sub-item .menu-content p').forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            if (element.cleanupShuffleEffect) {
                element.cleanupShuffleEffect();
            }
            addShuffleEffect(element);
        });

        element.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            if (element.cleanupShuffleEffect) {
                element.cleanupShuffleEffect();
            }
        });
    });

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

          item.addEventListener("mouseenter", () => {
              if (bgHover && !item.id) {
                  bgHover.style.opacity = "1";
              }
              addShuffleEffect(linkElement);
              if (spanElement) {
                  addShuffleEffect(spanElement);
              }
          });

          item.addEventListener("mouseleave", () => {
              if (bgHover && !item.id) {
                  bgHover.style.opacity = "0";
              }
              if (linkElement.cleanupShuffleEffect) {
                  linkElement.cleanupShuffleEffect();
              }
              if (spanElement && spanElement.cleanupShuffleEffect) {
                  spanElement.cleanupShuffleEffect();
              }
          });
        }
    });

    function shuffleAll() {
        cleanupAllEffects();
        links.forEach((link) => {
            const targetElement = link.querySelector(
                ".menu-item-link a"
            );
            const spanElement = link.querySelector("span");
            if (targetElement) {
                addShuffleEffect(targetElement);
            }
            if (spanElement) {
                addShuffleEffect(spanElement);
            }
        });

        // Also shuffle menu sub items on open
        document.querySelectorAll('.menu-sub-item').forEach(item => {
            const titleElement = item.querySelector('.menu-title p');
            const contentElement = item.querySelector('.menu-content p');
            if (titleElement) addShuffleEffect(titleElement);
            if (contentElement) addShuffleEffect(contentElement);
        });
    }

    menuToggle.addEventListener("click", () => {
        menuContainer.style.left = "0%";
        shuffleAll();
        animateMenuItems(menuItems, "in");
    });
  
    closeBtn.addEventListener("click", () => {
        menuContainer.style.left = "-50%";
        animateMenuItems(menuItems, "out");
        cleanupAllEffects();
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cleanupAllEffects();
        }
    });
});