var close = document.querySelector('.em_close')
var menu;

document.addEventListener("DOMContentLoaded", function() {
    var bars = document.querySelector(".fa.fa-bars"); 
     menu = document.querySelector(".em_menu"); 

    if (bars && menu) {
        bars.addEventListener("click", () => {
            menu.classList.add("active");
            gsap.from(".em_menu", {
                opacity: 0,
                duration: .3
            });

            gsap.from('.em_menu ul', {
                opacity: 0,
                x:-300
            });
        });
    } else {
        console.error("bars or menu elements not found");
    }
});;

close.addEventListener("click", () => { 
    menu.classList.remove("active")
   
})

function animateContent(selector){
    selector.forEach((selector)=>{
        gsap.to(selector,{
            y: 30,
            duration: 0.1,
            opacity: 1,
            delay: 0.2,
            stagger: 0.2,
            ease: 'power2.out'
        })
    })
}

function scrollTriggerAnimation(triggerSelector, boxSelectors){
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: triggerSelector,
            start: 'top 50%',
            end: 'top 80%',
            scrub: 1
        },
    })
    boxSelectors.forEach((boxSelector)=>{
        timeline.to(boxSelector, {
            y: 0,
            duration: 1,
            opacity: 1,
            
        })
    })
}

animateContent([".em_homePage .em_homePageContent h5, .em_homePage .em_homePageContent h1, .em_homePage .em_homePageContent p, .em_homePage .em_homePageContent .em_homePageButtons"])
scrollTriggerAnimation(".em_explore", [".em_explore .box1", ".em_explore .box2", ".em_explore .box3"])
