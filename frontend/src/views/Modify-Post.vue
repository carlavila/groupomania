<template>
<div id="modify">
    <Nav redirection="/home" :logged="true" />
    <Header :home="false" header="Modification du post" />
    <ModifyPost />
</div>
</template>

<script>
import Nav from "../components/Nav.vue"
import Header from "../components/Header.vue"
import ModifyPost from "../components/ModifyPost.vue"
export default {
    name: 'Modify-Post',
    components: {
        Nav,
        Header,
        ModifyPost
    }
}
</script>