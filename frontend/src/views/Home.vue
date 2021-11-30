<template>
<div class="home">
    <Nav redirection="/home" :logged="true" />
    <Header :home="true" header="Accueil" />
    <button v-if="createPost" @click="toggleCreate" class="btn">Retour aux posts</button>
    <button v-else @click="toggleCreate" class="btn">Publier un nouveau post</button>    
    <CreatePost v-show="createPost" @toggle-Create="toggleCreate" @add-Post="addPostFrontend" />
    <div v-if="!createPost" id="query">
        <input type="text" placeholder="exemple : John Doe" v-model="search">
    </div>       
    <Posts :posts="filterPosts" @delete-Post="deletePostFrontend" :isAdmin="isAdmin" :userId="userId" />
</div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
import CreatePost from "../components/CreatePost.vue"
import Posts from "../components/Posts.vue"
export default {
    name: "Home",
    components: {
        Nav,
        Header,
        CreatePost,
        Posts
    },
    data() {
        return {
            posts: [],
            createPost: false,
            isAdmin: null,
            userId: null,
            search: ""
        }
    },
    methods: {
        toggleCreate() {
            this.createPost = !this.createPost
            this.search = ""
        },
        async addPostFrontend() {
            this.posts = await this.fetchPosts()    
        },
        deletePostFrontend(id) {
            this.posts = this.posts.filter((post) => post.id !== id)
        },
        async fetchPosts() {
            const resPosts = await fetch('http://localhost:3000/api/posts/all')
            const dataPosts = await resPosts.json()
            dataPosts.forEach(post => {
                post.createdAt = post.createdAt.split('T')[0]
                post.User.username = post.User.firstname + " " + post.User.lastname
            })
            dataPosts.reverse()
            return dataPosts
        }
    },
    async created() {
        this.posts = await this.fetchPosts()
        this.isAdmin = (localStorage.getItem("isAdmin") == "true")
        console.log (this.isAdmin)
        this.userId = Number(localStorage.getItem('userId'))
    },
    computed: {
        filterPosts: function() {
            return this.posts.filter((post) => {
                return post.User.username.toLowerCase().match(this.search.toLowerCase())
            })
        }
    }   
}
</script>
<style scoped>
.btn {
    display: block;
    margin : auto;
    background: rgb(221, 177, 177);
    border-radius: 5px;
    padding: 16px 30px;
    font-size: 20px;
    cursor: pointer;
    border: none;
    outline: none;
    color: #ffffff;
    text-decoration: none;
}
.btn:hover {
    box-shadow: 2px 2px 8px 5px  rgb(223, 184, 184);
}
.btn:active {
    transform: scale(0.98);
}
.btn-block {
    display: block;
    width: 100%;
}
#query {
    margin: 1rem 0 0 0;
}
input {
    display: block;
    margin: auto;
    font-size: 15px;
    padding: 6px ;
    border: 1px solid rgb(223, 184, 184);
    border-radius: 5px;
}
input:focus {
    outline: none;
}

</style>