const categories = document.querySelectorAll('.article__categories .category');
let selectedCategory = document.querySelector('.article__categories .category.selected');;

categories.forEach(category => {
    category.addEventListener('click', function() {
        if (selectedCategory) {
            selectedCategory.classList.remove('selected');
        }

        category.classList.add('selected');

        selectedCategory = category;
    })
})