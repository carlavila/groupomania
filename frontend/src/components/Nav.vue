<template>
    <div id="nav">        
        <div id="logo">
            <router-link :to="redirection">
                <div id="logoContainer">
                    <img src="../assets/logos/icon-left-font.svg" alt="logo">    
                </div>                
            </router-link>
        </div>
        <!-- l'user n'est pas connecté -> signup/login -->
        <div id="routes" v-if="!logged">
            <router-link to="/signup" class="link">Inscription</router-link>
            <router-link to="/login" class="link">Connexion</router-link>    
        </div>  
        <!-- l'user est connecté et dans ce cas -> team/profile/logout -->
        <div id="options" v-else>
            <router-link to="/team" class="link">Membres</router-link>
            <router-link to="/profile" class="link">Profil</router-link>
            <router-link to="/" @click="logout" class="link">Déconnexion</router-link>
        </div>    
    </div>
</template>

<script>
import store from '../store/index.js'
import router from '../router'
export default {
    name: 'Nav',
    props: {
        redirection: String,
        logged: Boolean,
    },
    methods: {
        /* déconnexion de l'user */
        logout() {
            store.state.isLogged = false
            /* maintenant que isLogged (dans le store) est false on va renvoyer le user vers la page /login */
            router.push({ path: 'login' }) 
            /* pour déconnecter l'user on appelle la méthode clear() pour effacer tous les items dans localStorage */
            localStorage.clear() 
            console.log("user déconnecté")
        }
    }
}
</script>

<style scoped>
#nav {
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 100px;
    border-bottom: 1px solid red;
}
#routes, #options {
    display: flex;
    justify-content: flex-end;  
    width: 100%;  
}
.link {
    text-align: center;
    padding: 1rem;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.75);
}
.link:hover{
    color: black;
    box-sizing: content-box;
}
i {
    margin-right: 2px;
}
@media screen and (max-width: 992px) {
    #nav {
        flex-direction: column;
        height: 100%;
        text-align: center;
    }
    #logo {
        margin-top: 1rem;
    }
    #options, #routes {
        justify-content: space-between;
        margin: 1rem;
    }
    .link {
        margin: 0 1rem 0 1rem;
    }
}
</style>