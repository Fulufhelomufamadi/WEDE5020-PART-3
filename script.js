
"use strict";

console.log("Tshiawelo Primary School website loaded");

// Gallery Lightbox - Images Only

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const closeLightboxButton = document.getElementById("close-lightbox");
const prevImageButton = document.getElementById("prev-image");
const nextImageButton = document.getElementById("next-image");

let currentImageIndex = 0;
let lastFocusedElement = null;

if (
    galleryImages.length > 0 &&
    lightbox &&
    lightboxImage &&
    closeLightboxButton &&
    prevImageButton &&
    nextImageButton
) {
    function showImage(index) {
        currentImageIndex = index;

        const selectedImage = galleryImages[currentImageIndex];

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;
    }

    galleryImages.forEach((image, index) => {
        image.setAttribute("tabindex", "0");

        image.addEventListener("click", function () {
            lastFocusedElement = image;

            showImage(index);

            lightbox.inert = false;
            lightbox.setAttribute("aria-hidden", "false");
            lightbox.classList.add("show");

            closeLightboxButton.focus();
        });
    });

    prevImageButton.addEventListener("click", function () {
        let previousIndex = currentImageIndex - 1;

        if (previousIndex < 0) {
            previousIndex = galleryImages.length - 1;
        }

        showImage(previousIndex);
    });

    nextImageButton.addEventListener("click", function () {
        let nextIndex = currentImageIndex + 1;

        if (nextIndex >= galleryImages.length) {
            nextIndex = 0;
        }

        showImage(nextIndex);
    });

    function closeLightbox() {

        // Return focus to the image that opened the lightbox
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

        lightbox.classList.remove("show");
        lightboxImage.src = "";

        // Prevent interaction with the hidden lightbox
        lightbox.inert = true;
        lightbox.setAttribute("aria-hidden", "true");
    }

    closeLightboxButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox.classList.contains("show")) {
            closeLightbox();
        }
    });
}

// About Us Accordion

const aboutAccordionButtons = document.querySelectorAll(
    ".accordion-section .accordion-button"
);

aboutAccordionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const content = button.nextElementSibling;
        const icon = button.querySelector("span");
        const isOpen = content.classList.contains("show");

        // Close all About Us accordion sections
        document.querySelectorAll(
            ".accordion-section .accordion-content"
        ).forEach(function (item) {
            item.classList.remove("show");
        });

        document.querySelectorAll(
            ".accordion-section .accordion-button span"
        ).forEach(function (item) {
            item.textContent = "+";
        });

        // Open the selected section
        if (!isOpen) {
            content.classList.add("show");
            icon.textContent = "-";
        }

    });

});

// Enquiry Form Validation
const enquiryForm = document.getElementById("enquiry-form");
const enquiryResponse = document.getElementById("enquiry-response");

if (enquiryForm && enquiryResponse) {

    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const enquiryType = document.getElementById("enquiry").value;
        const message = document.getElementById("message").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (name === "" || email === "" || enquiryType === "" || message === "") {
            enquiryResponse.textContent = "Please complete all required fields.";
            return;
        }

        if (phone !== "" && !/^\d{10}$/.test(phone)) {
            enquiryResponse.textContent = "Please enter a valid 10-digit phone number.";
            enquiryResponse.style.color = "red";
            return;
        }

        enquiryResponse.textContent =
            "Thank you, " + name + "! Your enquiry about " +
            enquiryType + " has been received.";

            let responseMessage = "";

            switch (enquiryType) {
                case "admission":
                    responseMessage = "We will contact you shortly regarding admission.";
                    break;


                case "registration":
                    responseMessage = "We will contact you shortly regarding registration.";
                    break;

                    case "academics":
                    responseMessage = "We will contact you shortly regarding academics.";
                    break;
                case "sponsorship":
                    responseMessage = "We will contact you shortly regarding sponsorship.";
                    break;

                    case "volunteering":
                    responseMessage = "We will contact you shortly regarding volunteering.";
                    break;
                    
                    case "general":
                    responseMessage = "We will contact you shortly regarding your general enquiry.";
                    break;

                    enquiryResponse.textContent =
            "Thank you, " + name + "! Your enquiry about " +
            enquiryType + " has been received.";
            }
            enquiryResponse.textContent += " " + responseMessage;
            enquiryForm.reset();
        });
    }

    // Contact Form Validation and AJAX Submission

const contactForm = document.getElementById("contact-form");
const contactResponse = document.getElementById("contact-response");

if (contactForm && contactResponse) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const messageType = document.getElementById("message-type").value;
        const message = document.getElementById("contact-message").value.trim();

        // Validate form fields
        if (name === "" || email === "" || messageType === "" || message === "") {
            contactResponse.textContent = "Please complete all required fields.";
            return;
        }

        // Prepare form information
        const contactData = {
            name: name,
            email: email,
            messageType: messageType,
            message: message
        };

        try {

            // Send information to the backend
            const response = await fetch("http://localhost:3000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contactData)
            });

            const result = await response.json();

            if (response.ok && result.success) {

                contactResponse.textContent = result.message;
                contactForm.reset();

            } else {

                contactResponse.textContent = "Something went wrong. Please try again.";

            }

        } catch (error) {

            console.error("Contact form error:", error);

            contactResponse.textContent =
                "Unable to connect to the server. Please try again later.";

        }

    });

}

// Academic Subject Search

const subjectSearch = document.getElementById("subject-search");
const subjectList = document.getElementById("subject-list");
const searchMessage = document.getElementById("search-message");

if (subjectSearch && subjectList && searchMessage) {

    const subjects = subjectList.querySelectorAll("li");

    subjectSearch.addEventListener("input", function() {

        const searchValue = subjectSearch.value.toLowerCase().trim();
        let visibleSubjects = 0;

        subjects.forEach(function(subject) {

            const subjectName = subject.textContent.toLowerCase();

            if (subjectName.includes(searchValue)) {
                subject.style.display = "";
                visibleSubjects++;
            } else {
                subject.style.display = "none";
            }

        });

        if (visibleSubjects === 0) {
            searchMessage.textContent = "No subjects found. Please try another search.";
        } else {
            searchMessage.textContent = "";
        }

    });
}


// Grade Subjects Accordion

const gradeButtons = document.querySelectorAll(".grade-button");

gradeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const subjects = button.nextElementSibling;
        const icon = button.querySelector("span");
        const isOpen = subjects.classList.contains("show");

        // Close all grade cards
        document.querySelectorAll(".grade-subjects").forEach(function (item) {
            item.classList.remove("show");
        });

        document.querySelectorAll(".grade-button span").forEach(function (item) {
            item.textContent = "+";
        });

        // Open only the selected grade
        if (!isOpen) {
            subjects.classList.add("show");
            icon.textContent = "-";
        }

    });

});
