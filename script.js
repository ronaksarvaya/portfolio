var tl = gsap.timeline()

tl.from(".logo", {
    opacity: 0,
    duration: 0.7,
    y: 20,
    
});


tl.from("ul li", {
    opacity: 0,
    duration: 0.3,
    y: 20,
    stagger: 0.5// This will stagger the animation for each nav item ;)
});

tl.from(".home-left",{
    opacity:0,
    duration: 0.7,   
    x:-200
});
tl.from(".home-right",{
    opacity:0,
    duration: 0.7,   
    x:200
});
tl.to(".skills,.about,.projects,.contact",{
    opacity: 1,
    duration: 0.5,

}

)