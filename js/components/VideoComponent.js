export default {
    name: "TheVideoComponent",

    template: `
    <section class="user-panel">
    <div class="col-12 col-sm-9 media-info">
                <ul class="media-genres">
                    <li><a href="action" @click.prevent="filterMedia('action')">Action</a></li> 
                    <li><a href="comedy" @click.prevent="filterMedia('comedy')">Comedy</a></li> 
                    <li><a href="drama" @click.prevent="filterMedia('drama')">Drama</a></li> 
                    <li><a href="" @click.prevent="retrieveVideoContent">All</a></li> 
                </ul>
            </div>
            <div class="row movie-set">
            <div class="col-12 media-wrapper">
                <div class="thumb-wrapper clearfix">
                    <img v-for="item in allRetrievedVideos" :src=" 'images/' + item.movies_cover " alt="media thumb" @click="loadNewMovie(item)" class="img-thumbnail rounded float-left media-thumb">
                </div>
            </div>
        </div>
        <div class="row video-set">
            <div class="col-12 order-2 order-md-1 col-md-3 media-container">
                <h4 class="media-title">{{ currentMediaDetails.movies_title }}</h4>
                <p class="media-details" v-html="currentMediaDetails.movies_storyline"></p>
                <span class="media-time">{{ currentMediaDetails.movies_runtime }}</span>
                <span class="media-year">{{ currentMediaDetails.movies_year }}</span>
            </div>

            <div class="col-12 order-1 order-md-2 col-md-9 media-container">
                <video autoplay controls muted :src=" 'video/' + currentMediaDetails.movies_trailer" class="fs-video"></video>
            </div>

            
        </div>
       
    </section>
    `,

    data: function () {
        return {
            currentMediaDetails: {},
            allRetrievedVideos: []
        }
    },

    created: function(){
        this.retrieveVideoContent();
    },

    methods: {
        filterMedia(genre) {
            let url = `./admin/index.php?media=movies&genre=${genre}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.allRetrievedVideos = data;
                    this.currentMediaDetails = data[0];
                })
        },
        retrieveVideoContent() {
            // fetch all the video content here (don't care about filtering, genre etc at this point)
            // debugger;

            if(localStorage.getItem("cachedVideo")) {
                this.allRetrievedVideos = JSON.parse(localStorage.getItem("cachedVideo"));
                this.currentMediaDetails = this.allRetrievedVideos[0];
            }else{

            let url = `./admin/index.php?media=movies&category=movie`;

            fetch(url)
            .then(res => res.json())
            .then(data =>{
                localStorage.setItem("cachedVideo", JSON.stringify(data));
                this.allRetrievedVideos = data;
                this.currentMediaDetails = data[0];
            })

        }
        },

        loadNewMovie(movie) {
            this.currentMediaDetails = movie;
        }
    }
}