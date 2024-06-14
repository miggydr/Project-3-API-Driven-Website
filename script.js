const submitBtn = document.getElementById("submit-btn");

const generateGif = () => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";

    let q = document.getElementById("search-box").value;
    //Number of gifs to be displayed
    let gifCount = 15;

    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";

    //make call to API
    fetch(finalURL)
        .then((resp) => resp.json())
        .then((info) => {
            console.log(info.data);
            //gifs
            let gifsData = info.data;
            gifsData.forEach((gif) => {
                //make cards per gif
                let container = document.createElement("div");
                container.classList.add("container");
                let iframe = document.createElement("img");
                console.log(gif);
                iframe.setAttribute("src", gif.images.downsized_medium.url);
                iframe.onload = () => {
                    gifCount--;
                    if (gifCount == 0) {
                        loader.style.display = "none";
                        document.querySelector(".wrapper").style.display = "grid";
                    }
                };
                container.append(iframe);
                document.querySelector(".wrapper").append(container);
            });
        });

};

submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);