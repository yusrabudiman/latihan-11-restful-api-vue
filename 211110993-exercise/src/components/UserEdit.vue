<template>
    <div>
        <div class="field">
            <label class="label">User Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Name" v-model="userName"/>
            </div>
        </div>
        <div class="field">
            <label class="label">User Email</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Email" v-model="userEmail"/>
            </div>
        </div>
        <div class="field">
            <label class="label">User Address</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Address" v-model="userAddress"/>
            </div>
        </div>
        <div class="field">
            <label class="label">User Phone</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Phone" v-model="userPhone"/>
            </div>
        </div>
        <div class="control">
            <button class="button is-warning" @click="updateUser">UPDATE</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "UserEdit",
    data() {
        return {
            userName : "",
            userEmail : "",
            userAddress : "",
            userPhone : "",
        };
    },
    created: function () {
        this.getUserById();
    },
    methods: {
        async getUserById() {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${this.$route.params.id}`);
                this.userName = response.data.response[0].user_name;
                this.userEmail = response.data.response[0].user_email;
                this.userAddress = response.data.response[0].user_address;
                this.userPhone = response.data.response[0].user_phone;
            } catch (err) {
                console.log(err);
            }
        },
        async updateUser() {
            try {
                await axios.put(`http://localhost:3000/api/users/${this.$route.params.id}`,{
                    user_name : this.userName,
                    user_email : this.userEmail,
                    user_address : this.userAddress,
                    user_phone : this.userPhone
                });
                this.userName = "";
                this.userEmail = "";
                this.userAddress = "";
                this.userPhone = "";
                this.$router.push("/");
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style>
</style>