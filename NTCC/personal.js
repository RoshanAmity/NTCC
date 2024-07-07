const photoInput = document.getElementById('photoInput');
const addImage = document.getElementById('addButton');
const container = document.getElementById('imageContainer');

// Function to handle errors during image selection
function handleImageError(message) {
  alert(message);
}

// Load images from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', function() {

  const body = document.body;
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const checkbox = document.getElementById('check');
  const dark = document.getElementById('sun');
  const light = document.getElementById('moon');
  const hamburger = document.querySelector('.item .hamburger');
  const navList = document.querySelector('.item .list ul');
  const root = document.documentElement;

  const storedImages = JSON.parse(localStorage.getItem('images')) || [];
  storedImages.forEach(function(imageObject) {
    addImageToContainer(imageObject);
  });

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

// Event listener for the "Add Image" button
addImage.addEventListener('click', function() {
  photoInput.click();
});

// Event listener for file input change (image selection)
photoInput.addEventListener('change', function(event) {
  const files = event.target.files;
  Array.from(files).forEach(file => {
    if (!file.type.match('image/.*')) {
      handleImageError('Please select an image file.');
      return; // Skip processing this file if not an image
    }
    const reader = new FileReader();

    reader.onload = function(event) {
      const imageData = event.target.result;
      const imageObject = {
        id: Date.now(), // Use timestamp as unique identifier
        data: imageData
      };
      addImageToContainer(imageObject);
      saveImageToLocalStorage(imageObject);
    };

    reader.readAsDataURL(file);
  });
});

// Function to add an image to the container
function addImageToContainer(imageObject) {
  const list = document.createElement('ul');
  list.classList.add('list');

  const photolist = document.createElement('li');
  photolist.classList.add('photolist');
  photolist.style.listStyle = 'none';
  photolist.style.position = 'relative'; // Ensure photolist is relative

  const img = document.createElement('img');
  img.classList.add('img');
  img.src = imageObject.data;
  img.style.width = "250px";
  img.style.height = "250px";

  const deleteicon = document.createElement('img');
  deleteicon.classList.add('delete');
  deleteicon.style.width = '30px';
  deleteicon.style.height = '30px';
  deleteicon.src = 'dustbin.png'; // Replace with your delete icon path
  deleteicon.style.position = 'absolute';
  deleteicon.style.top = "10px";
  deleteicon.style.right = "10px"; // Ensure delete icon is at the top right

  deleteicon.addEventListener('click', function() {
    // Remove the parent ul (list) element
    container.removeChild(list);
    removeImageFromLocalStorage(imageObject.id);
  });

  photolist.appendChild(img);
  photolist.appendChild(deleteicon);
  list.appendChild(photolist);
  container.appendChild(list);
}

// Function to save an image object to localStorage
function saveImageToLocalStorage(imageObject) {
  const storedImages = JSON.parse(localStorage.getItem('images')) || [];
  storedImages.push(imageObject);
  localStorage.setItem('images', JSON.stringify(storedImages));
}

// Function to remove an image object from localStorage
function removeImageFromLocalStorage(imageId) {
  let storedImages = JSON.parse(localStorage.getItem('images')) || [];
  storedImages = storedImages.filter(image => image.id !== imageId);
  localStorage.setItem('images', JSON.stringify(storedImages));
}
