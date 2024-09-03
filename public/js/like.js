const likeBtn = document.querySelector('.fa-solid.fa-heart');

likeBtn?.addEventListener('click', function () {
    console.log('clicked')
    likeBtn.classList.toggle('liked');
})