<template>
    <button v-if="!liked" @click="likePost(postId)" class="btn">
        {{like.length}}
    </button>
</template>

<script>
export default {
    name: 'Likes',
    props: {
        postId: Number,
        userId: Number
    },
    data() {
        return {
            like: [],
            liked: null   
        }
    },
    methods: {
        /* fetch des Likes en fonction de l'id du post concerné */      
        async fetchLikes(postId) {
            const resLikes = await fetch(`http://localhost:3000/api/posts/${JSON.stringify(postId)}/likes`)
            const dataLikes = await resLikes.json()
            dataLikes.forEach(like => {
            like.userId == this.userId ? this.liked = true : this.like = false // <- ici on vérifie si notre user à déjà liker ce post
        })
            return dataLikes
        },
        /* fonction qui like le post (selon son id) */
        likePost(postId) {
            const data = {
                like: true,
                userId: this.userId,
                postId: postId
            }
            fetch(`http://localhost:3000/api/posts/${JSON.stringify(postId)}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => this.like.push(data))
                .catch(error => console.log(error))
            this.liked = true // <- on indiquer à notre template que le user à liker ce post
        },
        /* fonction pour unliker le post */
    },
    async created() {
        this.like = await this.fetchLikes(this.postId)
    }
}
</script>

<style scoped>
button {
    background: none;
    border-style: none;
    outline: none;
    width: 40%
}
p {
    margin: 1rem 0 1rem 0;
}
.liked {
    color: white;
    background-color: #3174e4;
    border: 1px solid #3174e4;
    border-radius: 50%;
    padding: 0.5rem;
}
.like {
    color: #3174e4;
    background-color: white;
    border: 1px solid #3174e4;
    border-radius: 50%;
    padding: 0.5rem;
}
i {
    margin-right: 4px;
}
</style>