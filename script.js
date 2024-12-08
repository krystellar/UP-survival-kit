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

// for the progs
const collegeHeaders = document.querySelectorAll('.college');
collegeHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const programsList = header.nextElementSibling; 
        
        if (programsList.style.display === 'block') {
            programsList.style.display = 'none';
        } else {
            programsList.style.display = 'block';
        }
    });
});


// for the org nav
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

document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const scrollContainer = document.querySelector('.club-scroll-container');

    const scrollAmount = 220;

    nextButton.addEventListener('click', function () {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', function () {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    scrollContainer.addEventListener('scroll', function () {
        if (scrollContainer.scrollLeft <= 0) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
    });
});

// for the interactive map
document.addEventListener('DOMContentLoaded', function () {
    const mapAreas = document.querySelectorAll('.map-area');
    const locationTitle = document.getElementById('location-title');
    const locationDescription = document.getElementById('location-description');
    const locationImage = document.getElementById('location-image');

    locationImage.style.display = 'none';
    locationImage.src = '';

    mapAreas.forEach(area => {
        area.addEventListener('mouseenter', function() {
            const title = area.getAttribute('data-title');
            const description = area.getAttribute('data-description');
            const image = area.getAttribute('data-image');
            locationTitle.textContent = title;
            locationDescription.textContent = description;
            locationImage.src = image;
            locationImage.style.display = 'block';
        });
    });
});

// for the calc

document.addEventListener("DOMContentLoaded", () => {
    const subjectsTable = document.getElementById("subjects-table");
    const gwaDisplay = document.getElementById("gwa-display");
    const addButton = document.getElementById("add-subject");
    const resetButton = document.getElementById("reset-field");
    const exportButton = document.getElementById("export-csv");
    const importButton = document.getElementById("import-csv");
    const fileInput = document.getElementById("file-input");

    let subjects = [];

    function updateGWA() {
        let totalUnits = 0;
        let weightedSum = 0;

        subjects.forEach(subject => {
            totalUnits += subject.units;
            weightedSum += subject.grade * subject.units;
        });

        const gwa = totalUnits > 0 ? (weightedSum / totalUnits).toFixed(2) : "N/A";
        gwaDisplay.textContent = gwa;
    }

    function refreshTable() {
        const tbody = subjectsTable.querySelector("tbody");
        tbody.innerHTML = ""; // Clear existing rows to avoid duplication

        subjects.forEach(({ name, units, grade }) => {
            const row = tbody.insertRow();
            const nameCell = row.insertCell(0);
            const unitsCell = row.insertCell(1);
            const gradeCell = row.insertCell(2);

            nameCell.textContent = name;
            unitsCell.textContent = units;
            gradeCell.textContent = grade;
        });

        updateGWA(); // Update GWA after refreshing the table
    }

    function downloadCSV(filename, data) {
        const blob = new Blob([data], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    function generateCSV() {
        let csvContent = "Subject Name,Units,Final Grade\n";
        subjects.forEach(({ name, units, grade }) => {
            csvContent += `${name},${units},${grade}\n`;
        });
        return csvContent;
    }

    function parseCSV(content) {
        const rows = content.split("\n").slice(1); // Skip header
        const parsedSubjects = rows.map(row => {
            const [name, units, grade] = row.split(",");
            return { name: name.trim(), units: parseFloat(units), grade: parseFloat(grade) };
        }).filter(subject => subject.name && !isNaN(subject.units) && !isNaN(subject.grade));
        return parsedSubjects;
    }

    addButton.addEventListener("click", () => {
        const nameInput = document.getElementById("subject-name");
        const unitsInput = document.getElementById("subject-units");
        const gradeInput = document.getElementById("subject-grade");

        const subjectName = nameInput.value.trim();
        const subjectUnits = parseFloat(unitsInput.value);
        const subjectGrade = parseFloat(gradeInput.value);

        if (!subjectName || isNaN(subjectUnits) || isNaN(subjectGrade)) {
            alert("Please fill out all fields correctly.");
            return;
        }

        subjects.push({ name: subjectName, units: subjectUnits, grade: subjectGrade });
        refreshTable(); // Refresh the table to reflect new data

        // Clear input fields
        nameInput.value = "";
        unitsInput.value = "";
        gradeInput.value = "";
    });

    resetButton.addEventListener("click", () => {

        subjects = [];

        const tbody = subjectsTable.querySelector("tbody");
        tbody.innerHTML = "";

        gwaDisplay.textContent = "N/A";
    });

    exportButton.addEventListener("click", () => {
        const csvContent = generateCSV();
        downloadCSV("subjects.csv", csvContent);
    });

    importButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", event => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const csvContent = reader.result;
                const importedSubjects = parseCSV(csvContent);
                subjects = [...subjects, ...importedSubjects];
                refreshTable();
                alert("File imported successfully.");
            } catch (error) {
                alert("Error importing file. Please ensure it is a valid CSV.");
            }
        };
        reader.readAsText(file);
    });
});