// for the whole page
document.addEventListener("DOMContentLoaded", function() {
    showPage(0);
});

function showPage(pageIndex) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');  

    const pageToShow = pages[pageIndex];
    if (pageToShow) {
        pageToShow.style.display = 'block';
    } else {
        console.log(`Page with index ${pageIndex} not found.`);
    }
}

// for the club and org nav
document.addEventListener('DOMContentLoaded', function () {
    const clubItems = document.querySelectorAll('.club-item');
    clubItems.forEach(item => {
        const club = item.querySelector('.club');
        const description = item.querySelector('.club-description');
        club.addEventListener('mouseenter', function () {
            description.style.visibility = 'visible';
            description.style.opacity = '1';
        });
        club.addEventListener('mouseleave', function () {
            description.style.visibility = 'hidden';
            description.style.opacity = '0';
        });
    });
});

// for the interactive map
document.addEventListener('DOMContentLoaded', function () {
    const mapAreas = document.querySelectorAll('.map-area');
    const locationTitle = document.getElementById('location-title');
    const locationDescription = document.getElementById('location-description');
    const locationImage = document.getElementById('location-image');
    mapAreas.forEach(area => {
        area.addEventListener('mouseenter', function() {
            const title = area.getAttribute('data-title');
            const description = area.getAttribute('data-description');
            const image = area.getAttribute('data-image');
            locationTitle.textContent = title;
            locationDescription.textContent = description;
            locationImage.src = image;
        });
    });
});
