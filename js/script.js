let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');
let hill6 = document.getElementById('hill6');
let header = document.getElementById('header');
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => 
{
    sections.forEach(sec => 
        {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height)
        {
            navLinks.forEach(links =>
                {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })
}


menuIcon.onclick = () => {
menuIcon.classList.toggle('bx-x');
navbar.classList.toggle('active');
}


window.addEventListener('scroll', () => {
    let value = window.scrollY;

    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill5.style.left = value * 1.5 + 'px';
    hill4.style.left = value * -1.5 + 'px';
    // hill1.style.top = value * 1 + 'px';
    hill1.style.top = value * 0.5 + 'px';
    hill6.style.top = value * -0.1 + 'px';

});
document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) { // Adjust this value as needed
        header.classList.add('minimized');
    } else {
        header.classList.remove('minimized');
    }
});



