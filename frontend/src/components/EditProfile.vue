<template>
    <div id="editProfile">
               
        <form @submit.prevent="editProfile" enctype="multipart/form-data">

            <label for="file" class="profileLabel">
                <div>
                    Changer d'image de profil :
                </div>
                <div class="profileContainer">
                    <img id="preview" :src="'http://localhost:3000/images/'+ user.imageUrl" :alt="user.imageUrl" class="profile">   
                </div>                
            </label>
            <input type="file" ref="file" name="file" id="file" @change="selectFile">           

            <label for="firstname">Changer de prénom :</label>
            <input type="text" name="firstname" v-model="updateUser.firstname">

            <label for="lastname">Changer de nom :</label>
            <input type="text" name="lastname" v-model="updateUser.lastname">

            <label for="email">Changer email :</label>
            <input type="email" name="email" v-model="updateUser.email">

            <label for="password">Changer de mot de passe :</label>
            <input type="password" name="password" placeholder="entrez un nouveau mot de passe" v-model="updateUser.password">

            <button @click.prevent="deleteProfile" class="delete">Supprimer le compte</button> 

            <input type="submit" value="Modifier" class="btn" @click.prevent="modifyProfile">
        </form>
        <h4>{{ errMsg }}</h4>
    </div>
</template>

<script>
import router from '../router'
import axios from 'axios';
export default {
    name: 'Edit',
    props: {
        user: Object
    },
    data() {
        return {
            updateUser: {
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                email: this.user.email,
                password: null
            },
            file: '',
            errMsg: null
        }
    },
    methods: {
        /* fonction pour supprimer le compte */
        deleteProfile() {
            if (confirm("êtes vous sûr de vouloir supprimer votre compte ?")) {
                fetch(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })  
                    .then(localStorage.clear()) // <- on vide le localStorage(userId et token)
                    .then(router.push({ path: '/' }))
                    .catch(error => {error})
            }
        },
        /* avant d'envoyer le nouveau fichier on récupère les données */
        selectFile(event) {
            this.file = this.$refs.file.files[0]
            let input = event.target
            /* pour obtenir une prévisualisation du fichier */
            if(input.files) {
                let reader = new FileReader() 
                reader.onload = (e) => {
                    document.getElementById('preview').src = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
        },
        /* fonction modification du compte user */
        modifyProfile() {            
            let formData = new FormData()
            formData.append('firstname', this.updateUser.firstname)
            formData.append('lastname', this.updateUser.lastname)
            formData.append('email', this.updateUser.email)
            if (this.updateUser.password) {
                formData.append('password', this.updateUser.password)
            }
            if (this.file) {
                formData.append('file', this.file)
            }            
            /* nos regex */
            const regexName = /^[a-zéèçàêïü]{2,50}(-| )?([a-zéèçà]{2,50})?$/gmi;
            const regexEmail = /^[\w-.]{2,32}@([\w-]+\.)+[\w-]{2,4}$/g;
            const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/;
            /* nos véfifications */
            if (!(regexName.test(this.updateUser.firstname && this.updateUser.lastname))) {
                this.errMsg = "Name Err! => format nom et/ou prénom incorrect";
                return
            }
            if (!(regexEmail.test(this.updateUser.email))) {
                this.errMsg = "Email Err! => l'email inscrit n'a pas le bon format (exemple@mail.com)"
                return
            }
            if(this.updateUser.password && !(regexPassword.test(this.updateUser.password))) {
                this.errMsg = "Password Err! => entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial"
                return
            }
            /* on envoie notre requête */
            if (confirm("êtes vous sûr de vouloir modifier votre profil ?")) {
                axios.put(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(location.reload())
                    .catch(error => {error})
            } else {
                location.reload()
            }
        }
    }
}
</script>

<style scoped>
#editProfile {
    max-width: 60%;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
}
.showProfile {
    text-align: right;
}
form {
    display: flex;
    flex-direction: column;
}
label {
    margin-top: 1rem;
}
input {
    margin: 0.8rem;
    padding: 10px;
    box-shadow: 2px 2px 8px 5px rgb(0 0 0 / 10%);
    border-style: none;
    border-radius: 4px;
    outline: none;
}
.profileLabel {
    display: flex;
    align-items: center;
}
.profileContainer {
    margin-left: 1rem;
    width: 78px;
    height: 78px;
    min-width: 64px;
    min-height: 64px;
    border-radius: 50%;
    overflow: hidden;
}
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
#file {
    cursor: pointer;
}
i {
    padding-right: 0.5rem;
}
button {
    background: transparent;
    border: none;
    margin: 1rem;
    font-size: 0.94rem;
}
.btn {
    margin: 10px;
    background: rgb(221, 177, 177);
    border-radius: 5px;
    padding: 10px 10px;
    font-size: 15px;
    cursor: pointer;
    border: none;
    outline: none;
    color: #ffffff;
    text-decoration: none;
}
.btn:hover{
    box-shadow: 2px 2px 8px 5px  rgb(223, 184, 184);
}
.btn:active {
    transform: scale(0.98);
}
.delete:hover {
    color: red;
    font-weight: bold;
}
@media screen and (max-width: 992px) {
    #editProfile {
        max-width: 100%;
    }
}
</style>