document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const checkbox = document.getElementById('check');
    const dark = document.getElementById('sun');
    const light = document.getElementById('moon');
    const hamburger = document.querySelector('.item .hamburger');
    const navList = document.querySelector('.item .list ul');
    const root = document.documentElement;

    light.addEventListener('click', function() {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        header.classList.remove('dark-mode');
        header.classList.add('light-mode');
      
        document.querySelector('#moon').style.display = 'none';
        document.querySelector('#sun').style.display = 'block';
        root.style.setProperty('--color', '#4ff8ed');
      
        checkbox.checked = false;
      
        localStorage.setItem('mode', 'light');
      })

    dark.addEventListener('click', function() {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        header.classList.remove('light-mode');
        header.classList.add('dark-mode');
      
        document.querySelector('#moon').style.display = 'block';
        document.querySelector('#sun').style.display = 'none';
        root.style.setProperty('--color', '#0B60B0');
      
        checkbox.checked = true;
      
        localStorage.setItem('mode', 'dark');
      })

    checkbox.addEventListener('click', function () {
        if (this.checked) {
            darkMode();
        } else {
            lightMode();
        }
    });

    hamburger.addEventListener('click', function () {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
        darkMode();
    } else {
        lightMode();
    }

});
