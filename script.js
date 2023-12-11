function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}



let timeout;
let crs = document.querySelector(".cursor");

function cursorShapeChangeOnMovement() {
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;

    document.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout)
        xscale = gsap.utils.clamp(0.9, 1.2, dets.clientX - xprev)
        yscale = gsap.utils.clamp(0.9, 1.2, dets.clientY - yprev)

        xprev = dets.clientX
        yprev = dets.clientY

        cursorMove(xscale, yscale)

        timeout = setTimeout(() => {
            crs.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);

    })

}


function cursorMove(xscale, yscale) {

    document.addEventListener("mousemove", function (dets) {
        // console.log(dets)
        crs.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
        // crs.style.left = dets.clientX + "px"
        // crs.style.top = dets.clientY + "px"
    })

}

loco()
cursorMove()
cursorShapeChangeOnMovement()




// animaatiioin for changing website theme from white to black and ablack to white
let tl1 = gsap.timeline({
    duration: 0.1,
    scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        // markers: true,
        start: "top 30%",
        end: "top: 29%",
        scrub: 0,
    }
})

tl1.to(".main", {
    backgroundColor: "#0e0e0c",
    color: "white",
}, "black-white")

// tl1.to(".nav>img", {
//     opacity: 0,

// }, "black-white")

tl1.to(".nav", {
    backgroundColor: "#0e0e0c",
    color: "white",

}, "black-white")



tl1.to(".nav-links h3", {
    // backgroundColor: "#0e0e0c",
    color: "#ddddd5",

}, "black-white")

tl1.to(".nav-btn", {
    backgroundColor: "#d1d1c7",
    color: "#0e0e0c"

}, "black-white")


// navbar and page1 animation

let tl2 = gsap.timeline();

tl2.from(".page1 img", {
    scale: "1.5",
    duration: 1.2,
    delay: 0.5,
})

tl2.from(".nav", {
    opacity: 0,
    y: - 50
}, "tl2same")


tl2.from(".page1 h1", {
    opacity: 0,
    y: 60
}, "tl2same")