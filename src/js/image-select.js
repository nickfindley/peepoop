function selectRandomImage() {
    const imageFolder = '/img/';
    const imageArray = [0, 1, 2, 3, 4, 5, 6, 7];
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    const image = imageArray[randomIndex] + '.png';
    const imageSrc = imageFolder + image;
    return imageSrc;
}

document.addEventListener('DOMContentLoaded', function() {
    const body = document.getElementById('documentBody');
    const imageSrc = selectRandomImage();
    body.dataset.backgroundImage = imageSrc;
    body.style.backgroundImage = 'url("' + imageSrc + '")';
});