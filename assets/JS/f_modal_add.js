function displayAddProjectPopUp (popupBackground) {
    const btnAddProject = document.querySelector(".popup button");
    const addProjectBackground = document.querySelector(".add_project_background");
    const closepopup = document.querySelector(".close_popup")
    const goBack = document.querySelector(".fa-arrow-left")
    btnAddProject.addEventListener("click", () => {
        popupBackground.classList.remove("active");
        addProjectBackground.classList.add("active");
    })
    closepopup.addEventListener("click", () => {
        addProjectBackground.classList.remove("active");
    });
    goBack.addEventListener("click", () => {
        addProjectBackground.classList.remove("active");
        popupBackground.classList.add("active");
    })
    addProjectBackground.addEventListener("click", (event) => {
        if (event.target === addProjectBackground) {
            addProjectBackground.classList.remove("active");
        };
    });
};

function formListCategory (categories) {
    const selectCategory = document.getElementById("category");
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", categories[i].name);
        option.textContent = categories[i].name;
        selectCategory.appendChild(option);
    };
};

function addImage (inputAddImage, DivPreviewImage) {
    inputAddImage.addEventListener("change", (event) => {
        const image = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const divAddPictureContent = document.querySelectorAll(".add_picture *");
            divAddPictureContent.forEach(element => {
                element.style.display = "none";
            });
            const previewImage = document.createElement("img");
            previewImage.src = event.target.result;
            DivPreviewImage.appendChild(previewImage);
        };
        reader.readAsDataURL(image);
    });
};

//fonction valider le contenu du formulaire
//le bouton devient alors clickable et passer au vert

async function addProject (addProjectForm, logs, responseWorks, projects) {
    addProjectForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const newProject = new FormData();
        newProject.append("image", event.target.querySelector("[name=image]").files[0]);
        newProject.append("title", event.target.querySelector("[name=title]").value);
        newProject.append("category", event.target.querySelector("[name=category]").value);
        const POSTrequest = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: newProject,
        headers: {"Authorization": `Bearer ${logs}`},
    });
    responseWorks = await fetch("http://localhost:5678/api/works");
    projects = await responseWorks.json();
    const divGallery = document.querySelector(".gallery");
    const projetElement = document.createElement("figure");
    projetElement.dataset.category = projects[projects.length - 1].category.id;
    const imgElement = document.createElement("img");
    imgElement.src = projects[projects.length - 1].imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.textContent = projects[projects.length - 1].title;
    divGallery.appendChild(projetElement);
    projetElement.appendChild(imgElement);
    projetElement.appendChild(titleElement);
});
};

export {
    displayAddProjectPopUp,
    formListCategory,
    addImage,
    addProject,
}