/* 
  =========================================
  MEESALA SAI KIRAN - BIM ENGINEER PORTFOLIO
  INTERACTION ENGINE (VANILLA JAVASCRIPT)
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  
  /* =========================================
     1. Header Effects & Scroll Indicator
     ========================================= */
  const header = document.getElementById('header');
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  window.addEventListener('scroll', () => {
    // Header styling on scroll
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    
    // Page scroll percentage indicator
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    scrollIndicator.style.width = scrolled + '%';
  });

  /* =========================================
     2. Smooth Scroll Active Nav Link Highlight
     ========================================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Triggers when section occupies middle screen
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));

  /* =========================================
     3. Revit Viewport Simulator Logic
     ========================================= */
  const layerBtns = document.querySelectorAll('.layer-btn');
  const viewportImages = document.querySelectorAll('.viewport-image');
  const overlayTitle = document.getElementById('viewport-overlay-title');
  const overlayDesc = document.getElementById('viewport-overlay-desc');
  const overlayScale = document.getElementById('viewport-overlay-scale');

  const viewportData = {
    all: {
      title: "Coordinated LOD 350 Data Center Model",
      desc: "Complete 3D integration of architectural wall envelopes, structural frames, firefighting sprinklers, electrical busducts, cable trays, and HVAC chillers loops. Verified clash-free.",
      scale: "LOD: 350 | SCALE: 1:50",
      targetId: "img-all"
    },
    arch: {
      title: "Architectural Skeleton & Enclosure Plan",
      desc: "Architectural wall layout, concrete partitions, door families, stairwells, and workspace layouts. Optimized for operational flow and aesthetic spatial design.",
      scale: "LOD: 300 | SCALE: 1:100",
      targetId: "img-arch"
    },
    struct: {
      title: "Structural Steel Frame Coordination",
      desc: "Detailed steel load-bearing column grids, roof trusses, antenna platforms, high-tension electrical tower platforms, and machinery concrete skids.",
      scale: "LOD: 350 | SCALE: 1:50",
      targetId: "img-struct"
    },
    mep: {
      title: "MEPF Services & Process Skids (LOD 400)",
      desc: "Advanced routing for high-pressure process pipelines, custom family pump skids, detailed valve flanges, HVAC double-wall ducting, drainage, and safety firefighting pipes.",
      scale: "LOD: 400 | SCALE: 1:20",
      targetId: "img-mep"
    }
  };

  layerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const layer = btn.getAttribute('data-layer');
      const data = viewportData[layer];

      if (!data) return;

      // Toggle active button
      layerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Cross-fade images
      viewportImages.forEach(img => {
        if (img.id === data.targetId) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });

      // Update overlays with slick smooth transition
      overlayTitle.style.opacity = '0';
      overlayDesc.style.opacity = '0';
      overlayScale.style.opacity = '0';

      setTimeout(() => {
        overlayTitle.textContent = data.title;
        overlayDesc.textContent = data.desc;
        overlayScale.textContent = data.scale;

        overlayTitle.style.opacity = '1';
        overlayDesc.style.opacity = '1';
        overlayScale.style.opacity = '1';
      }, 200);
    });
  });

  // Adding quick style transitions in JS for the viewport text changes
  overlayTitle.style.transition = 'opacity 0.25s ease';
  overlayDesc.style.transition = 'opacity 0.25s ease';
  overlayScale.style.transition = 'opacity 0.25s ease';

  /* =========================================
     4. Filterable Project Catalog Logic
     ========================================= */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectContainer = document.getElementById('project-container');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Toggle active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Animate and filter cards
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Adding simple transition styles to cards dynamically
  projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  });

  /* =========================================
     5. Skill Progress Fill on Scroll Trigger
     ========================================= */
  const skillsGrid = document.querySelector('.skills-grid');
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillBars.forEach(bar => {
          const progress = bar.getAttribute('data-progress');
          bar.style.width = progress;
        });
        skillsAnimated = true;
      }
    });
  }, { threshold: 0.15 });

  if (skillsGrid) {
    skillsObserver.observe(skillsGrid);
  }

  /* =========================================
     6. Scroll Reveal Animation Engine
     ========================================= */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Once revealed, no need to track again
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Reveals slightly before entry
    threshold: 0.05
  });

  reveals.forEach(el => revealObserver.observe(el));

  /* =========================================
     7. Contact Form Handling & Success Screen
     ========================================= */
  const contactForm = document.getElementById('portfolio-contact-form');
  const formSuccess = document.getElementById('form-success');
  const formResetBtn = document.getElementById('form-reset-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form field values
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (name && email && subject && message) {
        // Trigger visual success overlay
        formSuccess.classList.add('active');
      }
    });
  }

  if (formResetBtn) {
    formResetBtn.addEventListener('click', () => {
      // Clear form and remove success overlay
      contactForm.reset();
      formSuccess.classList.remove('active');
    });
  }

});
