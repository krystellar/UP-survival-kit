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

document.addEventListener('DOMContentLoaded', function () {
    const mapAreas = document.querySelectorAll('.map-area');
    const locationDescription = document.getElementById('location-description');
    
    mapAreas.forEach(area => {
        area.addEventListener('mouseenter', function() {
            const description = area.getAttribute('data-description');
            locationDescription.textContent = description;  // Update the description
        });
    });
});
